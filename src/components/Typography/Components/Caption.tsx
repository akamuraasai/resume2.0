import { FC } from 'react';

const Caption: FC = ({ children }) => (
  <p className="uppercase text-neutral-900 font-bold text-xxs pb-0.5">
    {children}
  </p>
);

export default Caption;
