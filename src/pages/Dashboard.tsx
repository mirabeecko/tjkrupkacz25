import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Eye, Clock, MousePointer2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['site-statistics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_statistics')
        .select('*')
        .order('date', { ascending: true })
        .limit(30);
      
      if (error) throw error;
      return data;
    }
  });

  const latestStats = stats?.[stats.length - 1] || {
    page_views: 0,
    active_users: 0,
    sessions: 0,
    bounce_rate: 0
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Návštěvnosti</h1>
          <p className="text-muted-foreground">Aktuální statistiky webu tjkrupka.cz za posledních 30 dní.</p>
        </div>

        {/* Metriky */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Uživatelé (Dnes)</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestStats.active_users}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Zobrazení stránek</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestStats.page_views}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Relace</CardTitle>
              <MousePointer2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestStats.sessions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Míra okamžitého opuštění</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestStats.bounce_rate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Grafy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Trend návštěvnosti</CardTitle>
              <CardDescription>Počet uživatelů a zobrazení v čase</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(str) => new Date(str).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => new Date(label).toLocaleDateString('cs-CZ')}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="page_views" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                    name="Zobrazení"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="active_users" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="none" 
                    name="Uživatelé"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
