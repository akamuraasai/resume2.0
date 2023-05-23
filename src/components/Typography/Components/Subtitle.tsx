import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

const Subtitle: FC<TextProps> = ({ children }) => (
  <h4 className="uppercase text-neutral-800 w-full text-center tracking-sm font-normal text-lg">
    {children}
  </h4>
);

export default Subtitle;
