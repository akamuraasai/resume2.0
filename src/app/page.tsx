import { cookies } from 'next/headers';
import { getComponents } from '@resume/hooks/useAPI';
import ComponentSelector, { Component } from '@resume/components/ComponentSelector';
import Typography from '@resume/components/Typography';

export const revalidate = 60;

export default async function Home() {
  const components = (await getComponents() || []) as Component[];
  const componentsStrucute = components.reduce<Record<string, Array<{ component: Component }>>>((structure, component) => {
    const { position, components_title: titles } = component;
    const [{ title, subtitle }] = titles || [{}];
    const positionComponents = structure[position] || [];

    return {
      ...structure,
      [position]: [...positionComponents, { component: { ...component, title, subtitle } }],
    };
  }, { center: [], left: [], right: [] });

  const cookieStore = await cookies();
  const langCookie = cookieStore.get('lang');
  const actualLanguage = langCookie?.value || 'en-US';
  const languageSelected = (language: string) => actualLanguage === language ? 'text-neutral-950' : 'text-neutral-100';

  return (
    <>
      <div className="flex align-middle justify-center bg-neutral-500">
        <div className="flex flex-row max-w-[800px] w-screen h-full min-h-[1900px] bg-white relative container">
          {componentsStrucute.center.map((item, index) => (
            <ComponentSelector key={index} component={item.component} />
          ))}

          <div className="flex flex-col gap-3 flex-none w-[248px] bg-neutral-100 p-8 pl-[64px] pt-[204px] left-side">
            {componentsStrucute.left.map((item, index) => (
              <ComponentSelector key={index} component={item.component} />
            ))}
          </div>

          <div className="flex flex-col gap-3 flex-auto xs:w-full pl-[27px] pr-[64px] pt-[204px] pb-24 bg-white right-side">
            {componentsStrucute.right.map((item, index) => (
              <ComponentSelector key={index} component={item.component} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center justify-center fixed top-[32px] right-[32px] print:hidden">
        <Typography type="body2" link="#en-US" className={`${languageSelected('en-US')} cursor-pointer`}>
          ENGLISH
        </Typography>
        |
        <Typography type="body2" link="#pt-BR" className={`${languageSelected('pt-BR')} cursor-pointer`}>
          PORTUGUÊS
        </Typography>
      </div>
    </>
  )
}
