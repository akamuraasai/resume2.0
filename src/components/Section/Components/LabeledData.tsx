import { FC } from 'react';
import Typography from '@resume/components/Typography';

type LabeledData = {
  label: string,
  values: string[],
};

const LabeledData: FC<LabeledData> = ({ label, values }) => (
  <div className="pb-3">
    <Typography type="caption">{label}</Typography>
    {values.map((value) => (
      <Typography key={value} type="body">{value}</Typography>
    ))}
  </div>
);

export default LabeledData;
