import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

const Title: FC<TextProps> = ({ children }) => (
  <h1 className="uppercase text-neutral-900 w-full text-center text-2xl font-bold tracking-widest">
    {children}
  </h1>
);

export default Title;
