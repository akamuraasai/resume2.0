import { getComponents } from '@resume/hooks/useAPI';
import ComponentSelector, { Component } from '@resume/components/ComponentSelector';

export default async function Home() {
  const components = (await getComponents() || []) as Component[];
  const componentsStrucute = components.reduce((structure, component) => {
    const { position } = component;
    const positionComponents = structure[position] || [];

    return {
      ...structure,
      [position]: [...positionComponents, { component }],
    };
  }, { center: [], left: [], right: [] });

  return (
    <div className="flex align-middle justify-center bg-neutral-500">
      <div className="flex flex-row max-w-[800px] w-screen h-full min-h-screen bg-white relative">
        {componentsStrucute.center.map(ComponentSelector)}

        <div className="flex flex-col gap-3 flex-none w-[248px] bg-neutral-100 p-8 pl-[64px] pt-[204px]">
          {componentsStrucute.left.map(ComponentSelector)}
        </div>

        <div className="flex flex-col gap-3 flex-auto pl-[27px] pr-[64px] pt-[204px] pb-24">
          {componentsStrucute.right.map(ComponentSelector)}
        </div>
      </div>
    </div>
  )
}
