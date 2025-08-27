'use client';

type HistoryEditorProps = {
  items: any[];
  language: 'english' | 'portuguese';
  compact?: boolean;
};

export default function HistoryEditor({ items, language, compact = false }: HistoryEditorProps) {
  const isPortuguese = language === 'portuguese';
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {isPortuguese ? (compact ? 'Histórico' : 'Itens de Histórico') : (compact ? 'History' : 'History Items')}
        </label>
        <button
          type="button"
          className={`inline-flex items-center ${compact ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} border border-transparent font-medium rounded text-indigo-600 hover:text-indigo-500`}
        >
          <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {isPortuguese ? (compact ? 'Adicionar' : 'Adicionar Histórico') : (compact ? 'Add' : 'Add History')}
        </button>
      </div>
      
      {items.map((item, index) => (
        <div key={`${language}-history-${index}`} className={`border border-gray-200 rounded-md ${compact ? 'p-3' : 'p-4'} space-y-3`}>
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? `Histórico ${index + 1}` : `History ${index + 1}`}
            </span>
            <button
              type="button"
              className={`text-red-600 hover:text-red-500 ${compact ? 'text-xs' : 'text-sm'}`}
            >
              {isPortuguese ? 'Remover' : 'Remove'}
            </button>
          </div>
          <div className={compact ? 'space-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
            <div>
              <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
                {isPortuguese ? 'Título' : 'Title'}
              </label>
              <input
                type="text"
                placeholder={isPortuguese ? 'Digite o título...' : 'Enter title...'}
                defaultValue={(item.value as any).title || ''}
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
                defaultValue={(item.value as any).date || ''}
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
              defaultValue={(item.value as any).location || ''}
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
              defaultValue={(item.value as any).description || ''}
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className={`border border-gray-200 rounded-md ${compact ? 'p-3' : 'p-4'} space-y-3`}>
          <div className="flex items-center justify-between">
            <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
              {isPortuguese ? 'Histórico 1' : 'History 1'}
            </span>
            <button
              type="button"
              className={`text-red-600 hover:text-red-500 ${compact ? 'text-xs' : 'text-sm'}`}
            >
              {isPortuguese ? 'Remover' : 'Remove'}
            </button>
          </div>
          <div className={compact ? 'space-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-3'}>
            <div>
              <label className={`block ${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>
                {isPortuguese ? 'Título' : 'Title'}
              </label>
              <input
                type="text"
                placeholder={isPortuguese ? 'Digite o título...' : 'Enter title...'}
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
              className={`mt-1 block w-full ${compact ? 'text-sm' : ''} border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900`}
            />
          </div>
        </div>
      )}
    </div>
  );
}