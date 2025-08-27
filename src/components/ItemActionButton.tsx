'use client';

type ItemActionButtonProps = {
  isNew: boolean;
  isDeleted?: boolean;
  language: 'english' | 'portuguese';
  compact?: boolean;
  onAction: () => void;
};

export default function ItemActionButton({ 
  isNew, 
  isDeleted = false, 
  language, 
  compact = false, 
  onAction 
}: ItemActionButtonProps) {
  const isPortuguese = language === 'portuguese';
  
  if (isNew) {
    // New items get a trash icon and are permanently removed
    return (
      <button
        type="button"
        onClick={onAction}
        className={`text-red-600 hover:text-red-500 ${compact ? 'text-xs' : 'text-sm'} flex items-center`}
        title={isPortuguese ? 'Remover item' : 'Remove item'}
      >
        <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {isPortuguese ? 'Remover' : 'Remove'}
      </button>
    );
  }
  
  // Existing items get an eye icon and are soft deleted
  if (isDeleted) {
    return (
      <button
        type="button"
        onClick={onAction}
        className={`text-gray-500 hover:text-gray-700 ${compact ? 'text-xs' : 'text-sm'} flex items-center`}
        title={isPortuguese ? 'Restaurar item' : 'Restore item'}
      >
        <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {isPortuguese ? 'Restaurar' : 'Restore'}
      </button>
    );
  }
  
  return (
    <button
      type="button"
      onClick={onAction}
      className={`text-gray-600 hover:text-red-500 ${compact ? 'text-xs' : 'text-sm'} flex items-center`}
      title={isPortuguese ? 'Ocultar item' : 'Hide item'}
    >
      <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.757 6.757M9.878 9.878a3 3 0 00-.007 4.243m4.249-4.25l3.129-3.128m0 0l.707.707M18.121 9.879L15 12.993M18.121 9.879a3 3 0 00-4.243-4.242" />
      </svg>
      {isPortuguese ? 'Ocultar' : 'Hide'}
    </button>
  );
}