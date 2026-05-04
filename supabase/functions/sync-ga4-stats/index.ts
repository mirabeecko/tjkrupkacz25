import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const propertyId = Deno.env.get("GA4_PROPERTY_ID")!;
    
    const clientId = Deno.env.get("GA_CLIENT_ID")!;
    const clientSecret = Deno.env.get("GA_CLIENT_SECRET")!;
    const refreshToken = Deno.env.get("GA_REFRESH_TOKEN")!;

    // 1. Získání Access Tokenu pomocí Refresh Tokenu
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) throw new Error(`Token error: ${tokenData.error_description}`);
    
    const accessToken = tokenData.access_token;

    // 2. Volání GA4 Data API (REST)
    const gaResponse = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "activeUsers" },
          { name: "bounceRate" }
        ],
      }),
    });

    const gaData = await gaResponse.json();
    if (!gaResponse.ok) throw new Error(`GA API error: ${gaData.error?.message || "Unknown error"}`);

    // 3. Zpracování dat pro Supabase
    const rows = gaData.rows || [];
    const statsToUpsert = rows.map((row: any) => {
      const dateStr = row.dimensionValues[0].value; // YYYYMMDD
      const formattedDate = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;

      return {
        date: formattedDate,
        page_views: parseInt(row.metricValues[0].value),
        sessions: parseInt(row.metricValues[1].value),
        active_users: parseInt(row.metricValues[2].value),
        bounce_rate: Math.round(parseFloat(row.metricValues[3].value) * 100 * 10) / 10,
      };
    });

    // 4. Uložení do databáze
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("site_statistics")
      .upsert(statsToUpsert, { onConflict: "date" });

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Success", count: statsToUpsert.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
