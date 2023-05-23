import { FC } from 'react';
import Typography from '@resume/components/Typography';

export type History = {
  title: string,
  date: string,
  location: string,
  description: string,
};

type HistoryListProps = {
  values: History[],
};

const HistoryList: FC<HistoryListProps> = ({ values }) => (
  <div className="pb-2 flex flex-col gap-4">
    {values.map(({ title, date, location, description }) => (
      <div key={title}>
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col w-full">
            <Typography type="caption2">{title}</Typography>
            <Typography type="body2">{date}</Typography>
          </div>

          <div className="w-20 text-end">
            <Typography type="body">{location}</Typography>
          </div>
        </div>
        <Typography type="body2">{description}</Typography>
      </div>
    ))}
  </div>
);

export default HistoryList;
