import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

const Body: FC<TextProps> = ({ children }) => (
  <p className="text-neutral-600 text-xs leading-3">
    {children}
  </p>
);

export default Body;
