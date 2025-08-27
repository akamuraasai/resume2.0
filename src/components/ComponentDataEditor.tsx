'use client';

import TextEditor from './TextEditor';
import ItemsEditor from './ItemsEditor';
import InfoItemEditor from './InfoItemEditor';
import HistoryEditor from './HistoryEditor';
import BannerEditor from './BannerEditor';

type ComponentDataEditorProps = {
  componentType: 'banner' | 'info' | 'items' | 'history' | 'text';
  language: 'english' | 'portuguese';
  data: any[];
  dynamicData?: any[];
  compact?: boolean;
  onAdd?: () => void;
  onUpdate?: (tempId: string, field: 'label' | 'values', value: string | string[]) => void;
  onRemoveToggle?: (tempId: string) => void;
};

export default function ComponentDataEditor({
  componentType,
  language,
  data,
  dynamicData,
  compact = false,
  onAdd,
  onUpdate,
  onRemoveToggle
}: ComponentDataEditorProps) {
  const isPortuguese = language === 'portuguese';

  const renderDataEditor = () => {
    switch (componentType) {
      case 'text':
        return <TextEditor items={data} language={language} />;
        
      case 'items':
        return <ItemsEditor items={data} language={language} compact={compact} />;
        
      case 'info':
        if (dynamicData && onAdd && onUpdate && onRemoveToggle) {
          return (
            <InfoItemEditor
              items={dynamicData}
              language={language}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onRemoveToggle={onRemoveToggle}
            />
          );
        }
        return null;
        
      case 'history':
        return <HistoryEditor items={data} language={language} compact={compact} />;
        
      case 'banner':
        return <BannerEditor language={language} />;
        
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {isPortuguese ? 'Dados' : 'Data'}
      </h3>
      {renderDataEditor()}
    </div>
  );
}