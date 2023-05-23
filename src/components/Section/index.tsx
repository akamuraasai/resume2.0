import { FC, ReactNode } from 'react';
import Typography from '@resume/components/Typography';

type SectionProps = {
  title: string,
  children: ReactNode | ReactNode[],
};

const Section: FC<SectionProps> = ({ title, children }) => (
  <div className="w-full">
    <Typography type="header">{title}</Typography>
    {children}
  </div>
);

export default Section;
