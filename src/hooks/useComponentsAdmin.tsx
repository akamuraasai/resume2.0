'use client';

import { supabase } from '@/lib/supabase';

export type ComponentTitle = {
  title: string;
  language: 'all' | 'en-US' | 'pt-BR';
};

export type DashboardComponent = {
  id: string;
  type: 'banner' | 'info' | 'items' | 'history' | 'text';
  position: 'left' | 'center' | 'right';
  sort: number;
  created_at: string;
  updated_at: string;
  components_title: ComponentTitle[];
};

// Client-side function to get components for dashboard
export const getComponentsForDashboard = async (): Promise<DashboardComponent[]> => {
  const { data, error } = await supabase
    .from('components')
    .select(`
      id,
      type,
      position,
      sort,
      created_at,
      updated_at,
      components_title (
        title,
        language
      )
    `)
    .order('sort', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

// Helper function to get the main title from components_title array
export const getComponentMainTitle = (component: DashboardComponent): string => {
  // Try to get English title first, then any language, then fallback
  const englishTitle = component.components_title?.find(t => t.language === 'en-US');
  if (englishTitle?.title) return englishTitle.title;
  
  const anyTitle = component.components_title?.[0];
  if (anyTitle?.title) return anyTitle.title;
  
  return 'Untitled Component';
};