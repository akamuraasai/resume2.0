import { FC } from 'react';
import LabeledData from '@resume/components/Section/Components/LabeledData';
import Section from '@resume/components/Section';
import { Component, InfoData } from '@resume/components/ComponentSelector/index';

const Info: FC<Component> = ({ title, components_data: data }) => (
  <Section title={title}>
    {data.map((item) => (
      <LabeledData
        key={item.id}
        label={(item.value as InfoData).label}
        values={(item.value as InfoData).values}
      />
    ))}
  </Section>
);

export default Info;
