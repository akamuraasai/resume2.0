'use client';

type TextEditorProps = {
  items: any[];
  language: 'english' | 'portuguese';
};

export default function TextEditor({ items, language }: TextEditorProps) {
  const isPortuguese = language === 'portuguese';
  
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={`${language}-${index}`}>
          <label className="block text-sm font-medium text-gray-700">
            {isPortuguese ? 'Conteúdo do Texto' : 'Text Content'}
          </label>
          <textarea
            rows={3}
            placeholder={isPortuguese ? 'Digite o conteúdo do texto...' : 'Enter text content...'}
            defaultValue={(item.value as any).value || ''}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
          />
        </div>
      ))}
      {items.length === 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isPortuguese ? 'Conteúdo do Texto' : 'Text Content'}
          </label>
          <textarea
            rows={3}
            placeholder={isPortuguese ? 'Digite o conteúdo do texto...' : 'Enter text content...'}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
          />
        </div>
      )}
    </div>
  );
}