import { FC } from 'react';

const Body: FC = ({ children }) => (
  <p className="text-neutral-600 text-xs leading-3">
    {children}
  </p>
);

export default Body;
