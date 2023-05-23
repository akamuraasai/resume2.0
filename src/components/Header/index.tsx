import { FC } from 'react';
import Typography from '@resume/components/Typography';

type HeaderProps = {
  title: string,
  subtitle: string,
};

// w-7/12

const Header: FC<HeaderProps> = ({ title, subtitle }) => (
  <div className="flex flex-col gap-2 justify-center absolute w-[422px] h-min p-[34px] inset-x-0 m-auto top-[39px] border-[1.5px] border-neutral-950 bg-white">
    <Typography type="title">{title}</Typography>
    <Typography type="subtitle">{subtitle}</Typography>
  </div>
);

export default Header;
