import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

const Header: FC<TextProps> = ({ children }) => (
  <h5 className="uppercase text-neutral-900 text-sm font-bold tracking-wide border-b-[1.5px] border-neutral-500 w-full mb-3 pb-1">
    {children}
  </h5>
);

export default Header;
