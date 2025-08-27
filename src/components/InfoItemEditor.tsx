'use client';

import { InfoData } from '@/hooks/useComponentsAdmin';
import ItemActionButton from './ItemActionButton';

type InfoItemEditorProps = {
  items: any[];
  language: 'english' | 'portuguese';
  onAdd: () => void;
  onUpdate: (tempId: string, field: 'label' | 'values', value: string | string[]) => void;
  onRemoveToggle: (tempId: string) => void;
};

export default function InfoItemEditor({ 
  items, 
  language, 
  onAdd, 
  onUpdate, 
  onRemoveToggle 
}: InfoItemEditorProps) {
  const isPortuguese = language === 'portuguese';
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {isPortuguese ? 'Itens de Informação' : 'Info Items'}
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-indigo-600 hover:text-indigo-500"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isPortuguese ? 'Adicionar Info' : 'Add Info'}
        </button>
      </div>
      
      {items.map((item, index) => (
        <div 
          key={item.tempId} 
          className={`border border-gray-200 rounded-md p-4 space-y-3 ${item.deleted_at ? 'opacity-50' : ''}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {isPortuguese ? `Info ${index + 1}` : `Info ${index + 1}`}
            </span>
            <ItemActionButton
              isNew={!!item.isNew}
              isDeleted={!!item.deleted_at}
              language={language}
              onAction={() => onRemoveToggle(item.tempId)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isPortuguese ? 'Rótulo' : 'Label'}
            </label>
            <input
              type="text"
              placeholder={isPortuguese ? 'Digite o rótulo...' : 'Enter label...'}
              value={(item.value as any).label || ''}
              onChange={(e) => onUpdate(item.tempId, 'label', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isPortuguese ? 'Valores' : 'Values'}
            </label>
            <textarea
              rows={2}
              placeholder={isPortuguese ? 'Digite os valores separados por vírgulas...' : 'Enter values separated by commas...'}
              value={((item.value as any).values || []).join(', ')}
              onChange={(e) => onUpdate(item.tempId, 'values', e.target.value.split(', ').filter(v => v.trim()))}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
            <p className="mt-1 text-xs text-gray-500">
              {isPortuguese ? 'Separe múltiplos valores com vírgulas' : 'Separate multiple values with commas'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}