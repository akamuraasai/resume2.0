import Typography from '@resume/components/Typography';
import Section from '@resume/components/Section';
import { FC } from 'react';
import { Component, TextData } from '@resume/components/ComponentSelector/index';

const Text: FC<Component> = ({ title, components_data: data }) => (
  <Section title={title}>
    {data.map((item) => (
      <Typography key={item.id} type="caption2">{(item.value as TextData).value}</Typography>
    ))}

  </Section>
);

export default Text;
