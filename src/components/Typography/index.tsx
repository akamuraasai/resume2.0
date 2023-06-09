import { FC } from 'react';
import Title from './Components/Title';
import Subtitle from './Components/Subtitle';
import Header from './Components/Header';
import Caption from './Components/Caption';
import Body from './Components/Body';
import Body2 from './Components/Body2';
import Caption2 from './Components/Caption2';

export type TextProps = {
  children: string
  className?: string
};

type TypographyProps = {
  type: 'title' | 'subtitle' | 'header' | 'caption' | 'caption2' | 'body' | 'body2'
  link?: string
} & TextProps;

const types = {
  title: Title,
  subtitle: Subtitle,
  header: Header,
  caption: Caption,
  caption2: Caption2,
  body: Body,
  body2: Body2,
  DEFAULT: Body,
};

const Typography: FC<TypographyProps> = ({ type, link, className, children }) => {
  const Component = types[type] || types.DEFAULT;

  return <Component link={link} className={className}>{children}</Component>;
};

export default Typography;
