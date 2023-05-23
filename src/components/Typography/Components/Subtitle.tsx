import { FC } from 'react';

const Subtitle: FC = ({ children }) => (
  <h4 className="uppercase text-neutral-800 w-full text-center tracking-sm font-normal text-lg">
    {children}
  </h4>
);

export default Subtitle;
