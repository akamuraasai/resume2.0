'use client';

import { InfoData } from '@/hooks/useComponentsAdmin';

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
            <button
              type="button"
              onClick={() => onRemoveToggle(item.tempId)}
              className={`p-1 rounded hover:bg-gray-100 ${
                item.isNew 
                  ? 'text-red-600 hover:text-red-700' 
                  : item.deleted_at 
                    ? 'text-green-600 hover:text-green-700' 
                    : 'text-gray-600 hover:text-gray-700'
              }`}
              title={
                item.isNew 
                  ? (isPortuguese ? 'Deletar permanentemente' : 'Delete permanently')
                  : item.deleted_at 
                    ? (isPortuguese ? 'Restaurar' : 'Restore')
                    : (isPortuguese ? 'Ocultar do site' : 'Hide from site')
              }
            >
              {item.isNew ? (
                // Trash icon
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              ) : item.deleted_at ? (
                // Eye with slash (hidden)
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m3.121-3.121l4.243-4.243M15.121 8.879L21 3m-6.878 5.879l-4.243 4.243m4.243-4.243L12 12" />
                </svg>
              ) : (
                // Eye open (visible)
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
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