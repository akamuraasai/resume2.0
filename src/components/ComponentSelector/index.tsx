import { FC } from 'react';
import Info from './Info';
import Banner from './Banner';
import Items from './Item';
import History from './History';
import Text from './Text';

export type TextData = {
  value: string,
};

export type InfoData = {
  label: string,
  values: string[],
};

export type ItemData = {
  text: string,
  link?: string,
};

export type HistoryData = {
  title: string,
  date: string,
  location: string,
  description: string,
}

type ComponentData = {
  id: string,
  component_id: string,
  value: ItemData | InfoData | TextData | HistoryData,
  language: 'all' | 'en-US' | 'pt-BR',
  created_at: string,
  updated_at: string,
  sort?: number,
};

export type Component = {
  id: string,
  type: 'banner' | 'info' | 'items' | 'history' | 'text',
  title: string,
  position: 'left' | 'center' | 'right',
  sort: number,
  created_at: string,
  updated_at: string,
  subtitle?: string,
  components_data: ComponentData[],
};

type ComponentSelectorProp = {
  component: Component,
}

const componentTypes = {
  banner: Banner,
  info: Info,
  items: Items,
  history: History,
  text: Text,
};

const ComponentSelector: FC<ComponentSelectorProp> = ({ component }) => {
  const Component = componentTypes[component.type] || null;

  return <Component {...component} />;
};

export default ComponentSelector;
