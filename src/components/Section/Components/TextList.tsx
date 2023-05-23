import { FC } from 'react';
import Typography from '@resume/components/Typography';

type TextAndLink = {
  text: string,
  link?: string,
};

type TextListProps = {
  values: TextAndLink[],
};

const TextList: FC<TextListProps> = ({ values }) => (
  <div className="pb-2">
    {values.map((value) => (
      <Typography key={value.text} type="body2" link={value.link}>{value.text}</Typography>
    ))}
  </div>
);

export default TextList;
