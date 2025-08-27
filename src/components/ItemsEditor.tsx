'use client';

import React, { useState, useEffect } from 'react';
import ItemActionButton from './ItemActionButton';

type ItemsEditorProps = {
  items: any[];
  language: 'english' | 'portuguese';
  compact?: boolean;
  onDataChange?: (newData: any[]) => void;
};

export default function ItemsEditor({ items, language, compact = false, onDataChange }: ItemsEditorProps) {
  const [localItems, setLocalItems] = useState(items || []);
  const isPortuguese = language === 'portuguese';
  const editorId = React.useRef(Math.random().toString(36).substr(2, 9));
  
  console.log(`ItemsEditor [${editorId.current}] - language: ${language}, hasCallback: ${!!onDataChange}, compact: ${compact}`);

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
      id: `item-${Date.now()}`,
      value: { text: '', link: '' },
      isNew: true
    };
    const newItems = [...localItems, newItem];
    setLocalItems(newItems);
    notifyDataChange(newItems);
  };

  const handleUpdateItem = (index: number, field: 'text' | 'link', value: string) => {
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
          {isPortuguese ? 'Itens' : 'Items'}
        </label>
        <button
          type="button"
          onClick={handleAddItem}
          className={`inline-flex items-center ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} border border-transparent font-medium rounded text-indigo-600 hover:text-indigo-500`}
        >
          <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isPortuguese ? (compact ? 'Adicionar' : 'Adicionar Item') : (compact ? 'Add' : 'Add Item')}
        </button>
      </div>
      
      {localItems.map((item, index) => (
        <div key={`${language}-item-${index}`} className={`border border-gray-200 rounded-md ${compact ? 'p-3' : 'p-4'} space-y-3 ${item.deleted_at ? 'opacity-50 bg-gray-50' : ''}`}>
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? `Item ${index + 1}` : `Item ${index + 1}`}
            </span>
            <ItemActionButton
              isNew={!!item.isNew}
              isDeleted={!!item.deleted_at}
              language={language}
              compact={compact}
              onAction={() => handleItemAction(index)}
            />
          </div>
          <div>
            <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Texto' : 'Text'}
            </label>
            <input
              type="text"
              placeholder={isPortuguese ? 'Digite o texto do item...' : 'Enter item text...'}
              value={(item.value as any)?.text || ''}
              onChange={(e) => handleUpdateItem(index, 'text', e.target.value)}
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
          <div>
            <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? (compact ? 'Link' : 'Link (opcional)') : (compact ? 'Link' : 'Link (optional)')}
            </label>
            <input
              type="url"
              placeholder={isPortuguese ? (compact ? 'https://...' : 'https://exemplo.com') : (compact ? 'https://...' : 'https://example.com')}
              value={(item.value as any)?.link || ''}
              onChange={(e) => handleUpdateItem(index, 'link', e.target.value)}
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
        </div>
      ))}
      
      {localItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className={`${compact ? 'text-sm' : 'text-base'}`}>
            {isPortuguese ? 'Nenhum item adicionado ainda.' : 'No items added yet.'}
          </p>
          <p className={`${compact ? 'text-xs' : 'text-sm'} mt-1`}>
            {isPortuguese ? 'Clique em "Adicionar Item" para começar.' : 'Click "Add Item" to get started.'}
          </p>
        </div>
      )}
    </div>
  );
}