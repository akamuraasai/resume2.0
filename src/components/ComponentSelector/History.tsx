import { FC } from 'react';
import HistoryList, { type History } from '@resume/components/Section/Components/HistoryList';
import Section from '@resume/components/Section';
import { Component } from '@resume/components/ComponentSelector/index';

const HistoryComponent: FC<Component> = ({ title, components_data: data }) => (
  <Section title={title}>
    <HistoryList values={data.map(({ value }) => value) as History[]} />
  </Section>
);

export default HistoryComponent;
