-- Create a helper function to execute arbitrary SQL
-- This is needed because Supabase REST API doesn't have built-in SQL execution

CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  EXECUTE sql_query;
  RETURN json_build_object('success', true, 'message', 'SQL executed successfully');
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Grant execute permission to service_role
GRANT EXECUTE ON FUNCTION exec_sql(TEXT) TO service_role;

COMMENT ON FUNCTION exec_sql IS 'Helper function to execute SQL via Supabase REST API';
