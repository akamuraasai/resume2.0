'use client';

import { supabase } from '@/lib/supabase';

export type ComponentTitle = {
  id: string;
  component_id: string;
  title: string;
  subtitle: string;
  language: 'all' | 'en-US' | 'pt-BR';
  created_at: string;
  updated_at: string;
};

export type TextData = {
  value: string;
};

export type InfoData = {
  label: string;
  values: string[];
};

export type ItemData = {
  text: string;
  link?: string;
};

export type HistoryData = {
  title: string;
  date: string;
  location: string;
  description: string;
};

export type ComponentData = {
  id: string;
  component_id: string;
  value: ItemData | InfoData | TextData | HistoryData;
  language: 'all' | 'en-US' | 'pt-BR';
  created_at: string;
  updated_at: string;
  sort?: number;
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

export type FullComponent = {
  id: string;
  type: 'banner' | 'info' | 'items' | 'history' | 'text';
  position: 'left' | 'center' | 'right';
  sort: number;
  created_at: string;
  updated_at: string;
  components_title: ComponentTitle[];
  components_data: ComponentData[];
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

// Client-side function to get full component data for editing
export const getFullComponent = async (id: string): Promise<FullComponent | null> => {
  const { data, error } = await supabase
    .from('components')
    .select(`
      id,
      type,
      position,
      sort,
      created_at,
      updated_at,
      components_title (*),
      components_data (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
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

// Helper function to get title/subtitle by language
export const getTitleByLanguage = (titles: ComponentTitle[], language: 'en-US' | 'pt-BR') => {
  return titles?.find(t => t.language === language) || { title: '', subtitle: '' };
};

// Helper function to get data by language  
export const getDataByLanguage = (data: ComponentData[], language: 'en-US' | 'pt-BR') => {
  return data?.filter(d => d.language === language) || [];
};

// Function to update component titles
export const updateComponentTitles = async (
  componentId: string,
  englishTitle: string,
  englishSubtitle: string,
  portugueseTitle: string,
  portugueseSubtitle: string
): Promise<void> => {
  // Prepare upsert data for both languages
  const upsertData = [
    {
      component_id: componentId,
      language: 'en-US',
      title: englishTitle,
      subtitle: englishSubtitle,
      updated_at: new Date().toISOString()
    },
    {
      component_id: componentId,
      language: 'pt-BR',
      title: portugueseTitle,
      subtitle: portugueseSubtitle,
      updated_at: new Date().toISOString()
    }
  ];

  const { error } = await supabase
    .from('components_title')
    .upsert(upsertData, {
      onConflict: 'component_id,language'
    });

  if (error) {
    throw new Error(`Failed to update titles: ${error.message}`);
  }
};

// Function to update component data with soft delete support
export const updateComponentData = async (
  componentId: string,
  englishData: any[],
  portugueseData: any[]
): Promise<void> => {
  // Process English data
  for (const item of englishData) {
    if (item.isNew) {
      // Insert new item
      console.log('Inserting new English item:', {
        component_id: componentId,
        language: 'en-US',
        value: item.value,
        sort: item.sort || 1
      });
      
      const { error } = await supabase
        .from('components_data')
        .insert({
          component_id: componentId,
          language: 'en-US',
          value: item.value,
          sort: item.sort || 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Insert error:', error);
        throw new Error(`Failed to insert English data: ${error.message}`);
      }
    } else if (item.id) {
      // Update existing item
      const updateData: any = {
        value: item.value,
        updated_at: new Date().toISOString()
      };
      
      // Always include deleted_at field, either as timestamp or null
      updateData.deleted_at = item.deleted_at || null;
      
      console.log('Updating English item:', item.id, updateData);
      
      const { error } = await supabase
        .from('components_data')
        .update(updateData)
        .eq('id', item.id);
      
      if (error) {
        console.error('Update error:', error);
        throw new Error(`Failed to update English data: ${error.message}`);
      }
    }
  }
  
  // Process Portuguese data
  for (const item of portugueseData) {
    if (item.isNew) {
      // Insert new item
      const { error } = await supabase
        .from('components_data')
        .insert({
          component_id: componentId,
          language: 'pt-BR',
          value: item.value,
          sort: item.sort || 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        throw new Error(`Failed to insert Portuguese data: ${error.message}`);
      }
    } else if (item.id) {
      // Update existing item
      const updateData: any = {
        value: item.value,
        updated_at: new Date().toISOString()
      };
      
      // Always include deleted_at field, either as timestamp or null
      updateData.deleted_at = item.deleted_at || null;
      
      console.log('Updating Portuguese item:', item.id, updateData);
      
      const { error } = await supabase
        .from('components_data')
        .update(updateData)
        .eq('id', item.id);
      
      if (error) {
        console.error('Update error:', error);
        throw new Error(`Failed to update Portuguese data: ${error.message}`);
      }
    }
  }
};