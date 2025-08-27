'use client';

import React, { useState, useEffect } from 'react';
import ItemActionButton from './ItemActionButton';

type HistoryEditorProps = {
  items: any[];
  language: 'english' | 'portuguese';
  compact?: boolean;
  onDataChange?: (newData: any[]) => void;
};

export default function HistoryEditor({ items, language, compact = false, onDataChange }: HistoryEditorProps) {
  const [localItems, setLocalItems] = useState(items || []);
  const isPortuguese = language === 'portuguese';
  const editorId = React.useRef(Math.random().toString(36).substr(2, 9));
  
  console.log(`HistoryEditor [${editorId.current}] - language: ${language}, hasCallback: ${!!onDataChange}, compact: ${compact}`);

  useEffect(() => {
    setLocalItems(items || []);
  }, [items]);

  // Notify parent component of data changes (only when user actually changes something)
  const notifyDataChange = (newItems: any[]) => {
    console.log('NOTIFY CALLED:', language, !!onDataChange);
    if (onDataChange) {
      onDataChange(newItems);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      id: `history-${Date.now()}`,
      value: { title: '', date: '', location: '', description: '' },
      isNew: true
    };
    const newItems = [...localItems, newItem];
    setLocalItems(newItems);
    notifyDataChange(newItems);
  };

  const handleUpdateItem = (index: number, field: 'title' | 'date' | 'location' | 'description', value: string) => {
    console.log(`[${editorId.current}] handleUpdateItem - ${language}`);
    const updatedItems = [...localItems];
    updatedItems[index] = {
      ...updatedItems[index],
      value: {
        ...updatedItems[index].value,
        [field]: value
      }
    };
    setLocalItems(updatedItems);
    notifyDataChange(updatedItems);
  };

  const handleItemAction = (index: number) => {
    const updatedItems = [...localItems];
    const item = updatedItems[index];
    
    if (item.isNew) {
      // New items are permanently removed
      const newItems = localItems.filter((_, i) => i !== index);
      setLocalItems(newItems);
      notifyDataChange(newItems);
    } else {
      // Existing items are soft deleted/restored
      updatedItems[index] = {
        ...item,
        deleted_at: item.deleted_at ? null : new Date().toISOString()
      };
      setLocalItems(updatedItems);
      notifyDataChange(updatedItems);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {isPortuguese ? (compact ? 'Histórico' : 'Itens de Histórico') : (compact ? 'History' : 'History Items')}
        </label>
        <button
          type="button"
          onClick={handleAddItem}
          className={`inline-flex items-center ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} border border-transparent font-medium rounded text-indigo-600 hover:text-indigo-500`}
        >
          <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isPortuguese ? (compact ? 'Adicionar' : 'Adicionar Histórico') : (compact ? 'Add' : 'Add History')}
        </button>
      </div>
      
      {localItems.map((item, index) => (
        <div key={`${language}-history-${index}`} className={`border border-gray-200 rounded-md ${compact ? 'p-3' : 'p-4'} space-y-3 ${item.deleted_at ? 'opacity-50 bg-gray-50' : ''}`}>
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? `Histórico ${index + 1}` : `History ${index + 1}`}
            </span>
            <ItemActionButton
              isNew={!!item.isNew}
              isDeleted={!!item.deleted_at}
              language={language}
              compact={compact}
              onAction={() => handleItemAction(index)}
            />
          </div>
          <div className={compact ? 'space-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
            <div>
              <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
                {isPortuguese ? 'Título' : 'Title'}
              </label>
              <input
                type="text"
                placeholder={isPortuguese ? 'Digite o título...' : 'Enter title...'}
                value={(item.value as any)?.title || ''}
                onChange={(e) => handleUpdateItem(index, 'title', e.target.value)}
                className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
              />
            </div>
            <div>
              <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
                {isPortuguese ? 'Data' : 'Date'}
              </label>
              <input
                type="text"
                placeholder="2020-2024"
                value={(item.value as any)?.date || ''}
                onChange={(e) => handleUpdateItem(index, 'date', e.target.value)}
                className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
              />
            </div>
          </div>
          <div>
            <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Local' : 'Location'}
            </label>
            <input
              type="text"
              placeholder={isPortuguese ? 'Digite o local...' : 'Enter location...'}
              value={(item.value as any)?.location || ''}
              onChange={(e) => handleUpdateItem(index, 'location', e.target.value)}
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
          <div>
            <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Descrição' : 'Description'}
            </label>
            <textarea
              rows={compact ? 2 : 3}
              placeholder={isPortuguese ? 'Digite a descrição...' : 'Enter description...'}
              value={(item.value as any)?.description || ''}
              onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
        </div>
      ))}
      
      {localItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className={`${compact ? 'text-sm' : 'text-base'}`}>
            {isPortuguese ? 'Nenhum histórico adicionado ainda.' : 'No history added yet.'}
          </p>
          <p className={`${compact ? 'text-xs' : 'text-sm'} mt-1`}>
            {isPortuguese ? 'Clique em "Adicionar Histórico" para começar.' : 'Click "Add History" to get started.'}
          </p>
        </div>
      )}
    </div>
  );
}