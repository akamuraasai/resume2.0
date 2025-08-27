'use client';

type TitleEditorProps = {
  language: 'english' | 'portuguese';
  title: string;
  subtitle: string;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
};

export default function TitleEditor({ 
  language, 
  title, 
  subtitle, 
  onTitleChange, 
  onSubtitleChange 
}: TitleEditorProps) {
  const isPortuguese = language === 'portuguese';
  
  return (
    <div>
      <h4 className="text-base font-medium text-gray-900 mb-4">
        {isPortuguese ? 'Título e Subtítulo' : 'Title & Subtitle'}
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isPortuguese ? 'Título' : 'Title'}
          </label>
          <input
            type="text"
            placeholder={isPortuguese ? 'Digite o título...' : 'Enter title...'}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isPortuguese ? 'Subtítulo' : 'Subtitle'}
          </label>
          <input
            type="text"
            placeholder={isPortuguese ? 'Digite o subtítulo...' : 'Enter subtitle...'}
            value={subtitle}
            onChange={(e) => onSubtitleChange(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}