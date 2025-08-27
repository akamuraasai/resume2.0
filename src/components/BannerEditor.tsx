'use client';

type BannerEditorProps = {
  language: 'english' | 'portuguese';
};

export default function BannerEditor({ language }: BannerEditorProps) {
  const isPortuguese = language === 'portuguese';
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">
        {isPortuguese 
          ? 'Componentes banner geralmente não possuem campos de dados adicionais além do título e subtítulo.'
          : 'Banner components typically don&apos;t have additional data fields beyond title and subtitle.'
        }
      </p>
    </div>
  );
}