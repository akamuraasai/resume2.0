import { createClient } from '@supabase/supabase-js';
import { Database } from '@resume/types/database.types';

const supabase = createClient<Database>(
  'https://mcgzysijnkizkrtzvxjf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ3p5c2lqbmtpemtydHp2eGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NjM2MDIsImV4cCI6MjAwMDQzOTYwMn0.vkjmbkhEvaNnqtoFvhAtkZn4vQ-cr5_BpRule141bvE'
);

export const getComponents = async () => {
  const { data, error } = await supabase
    .from('components')
    .select(`*, components_data ( * )`)
    .order('sort', { ascending: true })
    .order('sort', { foreignTable: 'components_data', ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
