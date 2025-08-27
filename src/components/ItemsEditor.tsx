'use client';

type ItemsEditorProps = {
  items: any[];
  language: 'english' | 'portuguese';
  compact?: boolean;
};

export default function ItemsEditor({ items, language, compact = false }: ItemsEditorProps) {
  const isPortuguese = language === 'portuguese';
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {isPortuguese ? 'Itens' : 'Items'}
        </label>
        <button
          type="button"
          className={`inline-flex items-center ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} border border-transparent font-medium rounded text-indigo-600 hover:text-indigo-500`}
        >
          <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isPortuguese ? (compact ? 'Adicionar' : 'Adicionar Item') : (compact ? 'Add' : 'Add Item')}
        </button>
      </div>
      
      {items.map((item, index) => (
        <div key={`${language}-item-${index}`} className={`border border-gray-200 rounded-md ${compact ? 'p-3' : 'p-4'} space-y-3`}>
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? `Item ${index + 1}` : `Item ${index + 1}`}
            </span>
            <button
              type="button"
              className={`text-red-600 hover:text-red-500 ${compact ? 'text-xs' : 'text-sm'}`}
            >
              {isPortuguese ? 'Remover' : 'Remove'}
            </button>
          </div>
          <div>
            <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Texto' : 'Text'}
            </label>
            <input
              type="text"
              placeholder={isPortuguese ? 'Digite o texto do item...' : 'Enter item text...'}
              defaultValue={(item.value as any).text || ''}
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
              defaultValue={(item.value as any).link || ''}
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className={`border border-gray-200 rounded-md ${compact ? 'p-3' : 'p-4'} space-y-3`}>
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Item 1' : 'Item 1'}
            </span>
            <button
              type="button"
              className={`text-red-600 hover:text-red-500 ${compact ? 'text-xs' : 'text-sm'}`}
            >
              {isPortuguese ? 'Remover' : 'Remove'}
            </button>
          </div>
          <div>
            <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Texto' : 'Text'}
            </label>
            <input
              type="text"
              placeholder={isPortuguese ? 'Digite o texto do item...' : 'Enter item text...'}
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
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
        </div>
      )}
    </div>
  );
}