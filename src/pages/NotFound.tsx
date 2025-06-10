import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/supabaseClient";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log do konzole
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // Zápis do Supabase
    // Option 1: Use correct fields for contact_messages table
    supabase
      .from("contact_messages")
      .insert([
        {
          message: `404 Not Found: ${location.pathname} | UA: ${navigator.userAgent}`,
          created_at: new Date().toISOString(),
          // Add other required fields like email, name, etc., if needed
        },
      ])
      .then(({ error }) => {
        if (error) {
          console.error("Supabase insert error:", error);
        }
      });

    // Option 2: If you want to log to a dedicated table, create a "not_found_logs" table in Supabase
    // and update the table name and fields accordingly.
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
