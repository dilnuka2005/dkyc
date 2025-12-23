
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzlgnavevrvikaolxorg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bGduYXZldnJ2aWthb2x4b3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNjQyODEsImV4cCI6MjA4MTk0MDI4MX0.17BpZteoYnIYZsCs1f90VGMYnmYW6AHeXO4-1yYB7Ts';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getTableData = async <T,>(tableName: string, options?: { order?: string; ascending?: boolean; eq?: [string, any] }) => {
  let query = supabase.from(tableName).select('*');
  
  if (options?.eq) {
    query = query.eq(options.eq[0], options.eq[1]);
  }
  
  if (options?.order) {
    query = query.order(options.order, { ascending: options.ascending ?? true });
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as T[];
};

export const getCount = async (tableName: string) => {
  const { count, error } = await supabase.from(tableName).select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
};
