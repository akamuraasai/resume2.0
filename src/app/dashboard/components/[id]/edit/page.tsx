'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import TitleEditor from '@/components/TitleEditor';
import ComponentDataEditor from '@/components/ComponentDataEditor';
import { getFullComponent, getTitleByLanguage, getDataByLanguage, updateComponentTitles, updateComponentData, updateItemsComponentData, FullComponent } from '@/hooks/useComponentsAdmin';

type Language = 'en-US' | 'pt-BR';

export default function EditComponentPage() {
  const params = useParams();
  const router = useRouter();
  const componentId = params.id as string;

  const [component, setComponent] = useState<FullComponent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<Language>('en-US');
  
  // Form state
  const [formData, setFormData] = useState({
    englishTitle: '',
    englishSubtitle: '',
    portugueseTitle: '',
    portugueseSubtitle: '',
  });
  
  // Dynamic data state for editing (info components)
  const [dynamicData, setDynamicData] = useState<{
    english: any[];
    portuguese: any[];
  }>({
    english: [],
    portuguese: []
  });

  // Items data state for editing (items components)
  const [itemsData, setItemsData] = useState<any[]>([]);

  // Language-specific items data for non-info components (like hobbies)
  const [languageSpecificItemsData, setLanguageSpecificItemsData] = useState<{
    english: any[];
    portuguese: any[];
  }>({
    english: [],
    portuguese: []
  });

  // Load component data
  useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        const data = await getFullComponent(componentId);
        setComponent(data);
        
        // Populate form data
        if (data) {
          const englishTitle = getTitleByLanguage(data.components_title, 'en-US');
          const portugueseTitle = getTitleByLanguage(data.components_title, 'pt-BR');
          
          setFormData({
            englishTitle: englishTitle.title || '',
            englishSubtitle: englishTitle.subtitle || '',
            portugueseTitle: portugueseTitle.title || '',
            portugueseSubtitle: portugueseTitle.subtitle || '',
          });
          
          // Populate dynamic data
          const englishData = getDataByLanguage(data.components_data, 'en-US');
          const portugueseData = getDataByLanguage(data.components_data, 'pt-BR');
          
          setDynamicData({
            english: englishData.map((item, index) => ({
              ...item,
              tempId: `en-${index}`,
              isNew: false
            })),
            portuguese: portugueseData.map((item, index) => ({
              ...item,
              tempId: `pt-${index}`,
              isNew: false
            }))
          });

          // Populate items data (for items/text/history components)
          if (data.type !== 'info') {
            // Check if this component uses language-specific data or 'all' language data
            const hasLanguageSpecificData = data.components_data.some(d => d.language === 'en-US' || d.language === 'pt-BR');
            
            if (hasLanguageSpecificData) {
              // This component has separate data for each language (like hobbies)
              const englishData = getDataByLanguage(data.components_data, 'en-US');
              const portugueseData = getDataByLanguage(data.components_data, 'pt-BR');
              
              setLanguageSpecificItemsData({
                english: englishData.map((item, index) => ({
                  ...item,
                  isNew: false
                })),
                portuguese: portugueseData.map((item, index) => ({
                  ...item,
                  isNew: false
                }))
              });
            } else {
              // This component uses 'all' language data (like social links)
              const allLanguageData = data.components_data
                .filter(d => d.language === 'all')
                .sort((a, b) => (a.sort || 0) - (b.sort || 0))
                .map((item) => ({
                  ...item,
                  isNew: false
                }));
              setItemsData(allLanguageData);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load component');
      } finally {
        setLoading(false);
      }
    };

    if (componentId) {
      loadComponent();
    }
  }, [componentId]);

  const handleCancel = () => {
    router.push('/dashboard');
  };

  // Function to update language-specific items data (for hobbies, etc) - MUST be before memoized callbacks
  const updateLanguageSpecificItemsData = useCallback((language: 'english' | 'portuguese', newData: any[]) => {
    console.log('UPDATE CALLED:', language, newData.length);
    setLanguageSpecificItemsData(prev => ({
      ...prev,
      [language]: newData
    }));
  }, []);

  // Memoized values - MUST be before any conditional returns
  const hasLanguageSpecificData = useMemo(() => 
    component?.components_data?.some(d => d.language === 'en-US' || d.language === 'pt-BR') || false,
    [component?.components_data]
  );

  const englishData = useMemo(() => {
    if (!component) return [];
    if (component.type === 'info') {
      return getDataByLanguage(component.components_data, 'en-US');
    }
    return hasLanguageSpecificData 
      ? languageSpecificItemsData.english
      : itemsData;
  }, [component, hasLanguageSpecificData, languageSpecificItemsData.english, itemsData]);
    
  const portugueseData = useMemo(() => {
    if (!component) return [];
    if (component.type === 'info') {
      return getDataByLanguage(component.components_data, 'pt-BR');
    }
    return hasLanguageSpecificData
      ? languageSpecificItemsData.portuguese
      : itemsData;
  }, [component, hasLanguageSpecificData, languageSpecificItemsData.portuguese, itemsData]);

  // Determine callbacks for ItemsEditor  
  const englishItemsDataCallback = useMemo(() => {
    if (!component) return undefined;
    if (component.type !== 'info' && hasLanguageSpecificData) {
      return (newData: any[]) => updateLanguageSpecificItemsData('english', newData);
    }
    if (component.type !== 'info') {
      return setItemsData;
    }
    return undefined;
  }, [component, hasLanguageSpecificData, updateLanguageSpecificItemsData]);

  const portugueseItemsDataCallback = useMemo(() => {
    if (!component) return undefined;
    if (component.type !== 'info' && hasLanguageSpecificData) {
      return (newData: any[]) => updateLanguageSpecificItemsData('portuguese', newData);
    }
    if (component.type !== 'info') {
      return setItemsData;
    }
    return undefined;
  }, [component, hasLanguageSpecificData, updateLanguageSpecificItemsData]);

  // Function to add new info item (creates both EN and PT versions)
  const addNewInfoItem = () => {
    const tempId = Date.now().toString();
    
    const newEnglishItem = {
      tempId: `en-${tempId}`,
      isNew: true,
      value: { label: '', values: [] },
      language: 'en-US',
      sort: dynamicData.english.length + 1
    };
    
    const newPortugueseItem = {
      tempId: `pt-${tempId}`,
      isNew: true,
      value: { label: '', values: [] },
      language: 'pt-BR',
      sort: dynamicData.portuguese.length + 1
    };
    
    setDynamicData(prev => ({
      english: [...prev.english, newEnglishItem],
      portuguese: [...prev.portuguese, newPortugueseItem]
    }));
  };

  // Function to remove/toggle visibility of info item
  const handleInfoItemAction = (tempId: string, language: 'english' | 'portuguese') => {
    setDynamicData(prev => {
      const items = [...prev[language]];
      const itemIndex = items.findIndex(item => item.tempId === tempId);
      
      if (itemIndex === -1) return prev;
      
      const item = items[itemIndex];
      
      if (item.isNew) {
        // If it's new, remove it completely
        items.splice(itemIndex, 1);
        
        // Also remove the corresponding item in the other language
        const otherLanguage = language === 'english' ? 'portuguese' : 'english';
        const otherItems = [...prev[otherLanguage]];
        const correspondingId = tempId.replace(/^(en|pt)-/, language === 'english' ? 'pt-' : 'en-');
        const otherIndex = otherItems.findIndex(item => item.tempId === correspondingId);
        if (otherIndex !== -1) {
          otherItems.splice(otherIndex, 1);
        }
        
        return {
          ...prev,
          [language]: items,
          [otherLanguage]: otherItems
        };
      } else {
        // If it's existing, toggle deleted_at
        items[itemIndex] = {
          ...item,
          deleted_at: item.deleted_at ? null : new Date().toISOString()
        };
        
        return {
          ...prev,
          [language]: items
        };
      }
    });
  };


  // Function to update info item data
  const updateInfoItem = (tempId: string, language: 'english' | 'portuguese', field: 'label' | 'values', value: string | string[]) => {
    setDynamicData(prev => {
      const items = [...prev[language]];
      const itemIndex = items.findIndex(item => item.tempId === tempId);
      
      if (itemIndex === -1) return prev;
      
      items[itemIndex] = {
        ...items[itemIndex],
        value: {
          ...items[itemIndex].value,
          [field]: value
        }
      };
      
      return {
        ...prev,
        [language]: items
      };
    });
  };

  const handleSave = async () => {
    if (!component) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Save title and subtitle changes
      await updateComponentTitles(
        component.id,
        formData.englishTitle,
        formData.englishSubtitle,
        formData.portugueseTitle,
        formData.portugueseSubtitle
      );
      
      // Save component data changes
      if (component.type === 'info') {
        await updateComponentData(
          component.id,
          dynamicData.english,
          dynamicData.portuguese
        );
      } else if (hasLanguageSpecificData) {
        // For components with language-specific data (like hobbies)
        const englishDataForSave = languageSpecificItemsData.english.map((item, index) => ({
          ...item,
          tempId: item.tempId || `en-${index}`,
          isNew: item.isNew || false
        }));
        const portugueseDataForSave = languageSpecificItemsData.portuguese.map((item, index) => ({
          ...item,
          tempId: item.tempId || `pt-${index}`,
          isNew: item.isNew || false
        }));
        
        await updateComponentData(
          component.id,
          englishDataForSave,
          portugueseDataForSave
        );
      } else {
        // For items/text/history components with 'all' language data
        await updateItemsComponentData(component.id, itemsData);
      }
      
      // Show success message
      setSuccess('Component saved successfully!');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Failed to save component:', error);
      setError(error instanceof Error ? error.message : 'Failed to save component');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading component...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !component) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16">
                <Link 
                  href="/dashboard"
                  className="text-indigo-600 hover:text-indigo-700 mr-4"
                >
                  ← Back to Dashboard
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">Edit Component</h1>
              </div>
            </div>
          </nav>
          <main className="max-w-4xl mx-auto py-6 px-4">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Error Loading Component</h3>
              <p className="text-gray-600 mb-4">{error || 'Component not found'}</p>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="flex items-center">
                <Link 
                  href="/dashboard"
                  className="text-indigo-600 hover:text-indigo-700 mr-4 text-sm sm:text-base"
                >
                  ← Back
                </Link>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                  Edit Component
                </h1>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          {/* Success/Error Messages */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* General Section */}
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">General Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Type</label>
                  <div className="mt-1 text-sm text-gray-900 capitalize bg-gray-50 px-3 py-2 rounded">
                    {component.type}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Position</label>
                  <div className="mt-1 text-sm text-gray-900 capitalize bg-gray-50 px-3 py-2 rounded">
                    {component.position}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Sort Order</label>
                  <div className="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
                    {component.sort}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">ID</label>
                  <div className="mt-1 text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded font-mono">
                    {component.id}
                  </div>
                </div>
              </div>
            </div>

            {/* Language Tabs (Mobile/Tablet) or Side-by-Side (Desktop) */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              {/* Mobile/Tablet: Tabs */}
              <div className="lg:hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    <button
                      onClick={() => setActiveLanguage('en-US')}
                      className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
                        activeLanguage === 'en-US'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => setActiveLanguage('pt-BR')}
                      className={`flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 ${
                        activeLanguage === 'pt-BR'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      🇧🇷 Português
                    </button>
                  </nav>
                </div>

                <div className="p-4 sm:p-6">
                  {activeLanguage === 'en-US' && (
                    <div className="space-y-6">
                      <TitleEditor
                        language="english"
                        title={formData.englishTitle}
                        subtitle={formData.englishSubtitle}
                        onTitleChange={(value) => setFormData(prev => ({ ...prev, englishTitle: value }))}
                        onSubtitleChange={(value) => setFormData(prev => ({ ...prev, englishSubtitle: value }))}
                      />

                      <ComponentDataEditor
                        componentType={component.type}
                        language="english"
                        data={englishData}
                        dynamicData={component.type === 'info' ? dynamicData.english : undefined}
                        onAdd={component.type === 'info' ? addNewInfoItem : undefined}
                        onUpdate={component.type === 'info' ? (tempId, field, value) => updateInfoItem(tempId, 'english', field, value) : undefined}
                        onRemoveToggle={component.type === 'info' ? (tempId) => handleInfoItemAction(tempId, 'english') : undefined}
                        onItemsDataChange={englishItemsDataCallback}
                      />
                    </div>
                  )}

                  {activeLanguage === 'pt-BR' && (
                    <div className="space-y-6">
                      <TitleEditor
                        language="portuguese"
                        title={formData.portugueseTitle}
                        subtitle={formData.portugueseSubtitle}
                        onTitleChange={(value) => setFormData(prev => ({ ...prev, portugueseTitle: value }))}
                        onSubtitleChange={(value) => setFormData(prev => ({ ...prev, portugueseSubtitle: value }))}
                      />

                      <ComponentDataEditor
                        componentType={component.type}
                        language="portuguese"
                        data={portugueseData}
                        dynamicData={component.type === 'info' ? dynamicData.portuguese : undefined}
                        onAdd={component.type === 'info' ? addNewInfoItem : undefined}
                        onUpdate={component.type === 'info' ? (tempId: string, field: string, value: any) => updateInfoItem(tempId, 'portuguese', field as 'label' | 'values', value) : undefined}
                        onRemoveToggle={component.type === 'info' ? (tempId: string) => handleInfoItemAction(tempId, 'portuguese') : undefined}
                        onItemsDataChange={portugueseItemsDataCallback}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop: Side by Side */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 divide-x divide-gray-200">
                  {/* English Column */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                      🇺🇸 English
                    </h3>
                    
                    <div className="space-y-6">
                      <TitleEditor
                        language="english"
                        title={formData.englishTitle}
                        subtitle={formData.englishSubtitle}
                        onTitleChange={(value) => setFormData(prev => ({ ...prev, englishTitle: value }))}
                        onSubtitleChange={(value) => setFormData(prev => ({ ...prev, englishSubtitle: value }))}
                      />

                      <ComponentDataEditor
                        componentType={component.type}
                        language="english"
                        data={englishData}
                        dynamicData={component.type === 'info' ? dynamicData.english : undefined}
                        compact={true}
                        onAdd={component.type === 'info' ? addNewInfoItem : undefined}
                        onUpdate={component.type === 'info' ? (tempId: string, field: string, value: any) => updateInfoItem(tempId, 'english', field as 'label' | 'values', value) : undefined}
                        onRemoveToggle={component.type === 'info' ? (tempId: string) => handleInfoItemAction(tempId, 'english') : undefined}
                        onItemsDataChange={englishItemsDataCallback}
                      />
                    </div>
                  </div>

                  {/* Portuguese Column */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                      🇧🇷 Português
                    </h3>
                    
                    <div className="space-y-6">
                      <TitleEditor
                        language="portuguese"
                        title={formData.portugueseTitle}
                        subtitle={formData.portugueseSubtitle}
                        onTitleChange={(value) => setFormData(prev => ({ ...prev, portugueseTitle: value }))}
                        onSubtitleChange={(value) => setFormData(prev => ({ ...prev, portugueseSubtitle: value }))}
                      />

                      <ComponentDataEditor
                        componentType={component.type}
                        language="portuguese"
                        data={portugueseData}
                        dynamicData={component.type === 'info' ? dynamicData.portuguese : undefined}
                        compact={true}
                        onAdd={component.type === 'info' ? addNewInfoItem : undefined}
                        onUpdate={component.type === 'info' ? (tempId: string, field: string, value: any) => updateInfoItem(tempId, 'portuguese', field as 'label' | 'values', value) : undefined}
                        onRemoveToggle={component.type === 'info' ? (tempId: string) => handleInfoItemAction(tempId, 'portuguese') : undefined}
                        onItemsDataChange={portugueseItemsDataCallback}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
              
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}