import { FC } from 'react';
import Header from '@resume/components/Header';
import { Component } from '@resume/components/ComponentSelector/index';

const Banner: FC<Component> = ({ title, subtitle }) => (
  <Header title={title} subtitle={subtitle!} />
);

export default Banner;
