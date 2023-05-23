import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

const Caption2: FC<TextProps> = ({ children }) => (
  <p className="text-neutral-900 w-full font-bold text-lg">
    {children}
  </p>
);

export default Caption2;
