import Header from '@resume/components/Header';
import Section from '@resume/components/Section';
import LabeledData from '@resume/components/Section/Components/LabeledData';
import TextList from '@resume/components/Section/Components/TextList';
import HistoryList from '@resume/components/Section/Components/HistoryList';
import Typography from '@resume/components/Typography';

export default function Home() {
  return (
    <div className="flex align-middle justify-center bg-neutral-500">
      <div className="flex flex-row max-w-[800px] w-screen h-full min-h-screen bg-white relative">
       <Header title="Jonathan Cruz" subtitle="Sr Developer" />

        <div className="flex flex-col gap-3 flex-none w-[248px] bg-neutral-100 p-8 pl-[64px] pt-[204px]">
          <Section title="Personal Info">
            <LabeledData label="Address" values={['São Paulo', 'Brazil']} />
            <LabeledData label="Phone" values={['+55 11 9 5273 6102']} />
            <LabeledData label="Email" values={['jonathan.willian.tod@gmail.com']} />
          </Section>

          <Section title="Links">
            <TextList
              values={[
                { text: 'LinkedIn', link: 'https://www.linkedin.com/in/jonathan-w-916b2a73/' },
                { text: 'Github', link: 'https://github.com/akamuraasai' },
                { text: 'Personal Website', link: 'https://akamuraasai.work' },
              ]}
            />
          </Section>

          <Section title="Skills">
            <TextList
              values={[
                { text: 'Git' },
                { text: 'React' },
                { text: 'React Native' },
                { text: 'Node' },
                { text: 'NextJS' },
                { text: 'Functional Programming' },
                { text: 'AWS' },
                { text: 'Serverless Architecture' },
              ]}
            />
          </Section>

          <Section title="Hobbies">
            <TextList values={[{ text: 'Coding, Web3, games and anime' }]}/>
          </Section>

          <Section title="Languages">
            <TextList
              values={[
                { text: 'Portuguese' },
                { text: 'English' },
              ]}
            />
          </Section>
        </div>

        <div className="flex flex-col gap-3 flex-auto pl-[27px] pr-[64px] pt-[204px] pb-24">
          <Section title="Profile">
            <TextList
              values={[
                { text: 'I am a senior software engineer with over 10 years of experience in mobile and web application development in various companies in São Paulo. I have skills in Full Stack development, including expertise in React/React Navite, as well as experience in node development. My experience includes working on mobile app projects at Netlolo and ZAX, where I served as a Senior Software Engineer. I also have a degree in Information Technology and fluency in English at B1/B2 level.' }
              ]}
            />
          </Section>

          <Section title="Employment History">
            <HistoryList
              values={[
                { title: 'Sr Software Engineer, Zax', date: 'Jan 2019 — Present', location: 'São Paulo', description: 'Worked in the app from scratch, helping to develop the base for what it is now.\nCreating the React Native boilerplate, the NextJS website with serveless structure, the Magento backend and the backoffice system based on Python.' },
                { title: 'Sr Software Engineer, Netlolo', date: 'Sep 2018 — Present', location: 'São Paulo', description: 'I\'ve implemented the communication with XMPP protocol in the app and created the backend service, so in this way we could work with one of our biggest clients transacting about 3M messages a day with low cost.' },
                { title: 'Sr Software Engineer, Escale', date: 'Jan 2018 — Sep 2018', location: 'São Paulo', description: 'Helped in the base and development of a new product where the company can sell health care services via Google Ads.\nImplemented the React boilerplate with Redux and a backend service done in Node using TypeScript.' },
                { title: 'Pl Software Engineer, PraValer', date: 'Jun 2017 — Jan 2018', location: 'São Paulo', description: 'Worked in a software that helps college students pay less fees.\nMigrated a legacy system made with PHP 5, to PHP 7 with Laravel, helping to make it more structured and performant that gained more than 12x the old performance.' },
              ]}
            />
          </Section>

          <Section title="Education">
            <HistoryList
              values={[{ title: 'Bachelor of Technology, Anhanguera', date: 'Jan 2016 — Jul 2018', location: 'Osasco', description: 'Bachelor of Technology (B.Tech.) in Information Technology' }]}
            />
          </Section>

          <Section title="References">
            <Typography type="caption2">References available upon request</Typography>
          </Section>
        </div>
      </div>
    </div>
  )
}
