import { FC } from 'react';
import { TextProps } from '@resume/components/Typography';

type Body2Props = {
  link?: string
} & TextProps;

const Body2: FC<Body2Props> = ({ link, className, children }) => {
  const content = link
    ? (<a href={link} target={className ? undefined : `_blank`} className={`undeline ${className}`}>{children}</a>)
    : children;

  return (
    <p className="text-neutral-600 w-full pb-1 text-base">
      {content}
    </p>
  );
}

export default Body2;
