-- Tabulka pro ukládání denních statistik z Google Analytics
CREATE TABLE IF NOT EXISTS site_statistics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    page_views INTEGER DEFAULT 0,
    sessions INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    average_session_duration FLOAT DEFAULT 0,
    bounce_rate FLOAT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pro rychlejší řazení podle data
CREATE INDEX IF NOT EXISTS idx_site_statistics_date ON site_statistics(date);

-- Povolení RLS (Row Level Security)
ALTER TABLE site_statistics ENABLE ROW LEVEL SECURITY;

-- Politika pro čtení (veřejná nebo pro dashboard)
CREATE POLICY "Allow public read access to site_statistics" 
ON site_statistics FOR SELECT 
USING (true);
