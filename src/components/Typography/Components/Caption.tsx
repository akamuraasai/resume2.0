import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

const Caption: FC<TextProps> = ({ children }) => (
  <p className="uppercase text-neutral-900 font-bold text-xxs pb-0.5">
    {children}
  </p>
);

export default Caption;
