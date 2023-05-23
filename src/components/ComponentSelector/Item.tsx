import { FC } from 'react';
import TextList, { TextAndLink } from '@resume/components/Section/Components/TextList';
import Section from '@resume/components/Section';
import { Component } from '@resume/components/ComponentSelector/index';

const Items: FC<Component> = ({ title, components_data: data }) => (
  <Section title={title}>
    <TextList values={data.map(({ value }) => value) as TextAndLink[]} />
  </Section>
);

export default Items;
