import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = 'https://mcgzysijnkizkrtzvxjf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ3p5c2lqbmtpemtydHp2eGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NjM2MDIsImV4cCI6MjAwMDQzOTYwMn0.vkjmbkhEvaNnqtoFvhAtkZn4vQ-cr5_BpRule141bvE';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});