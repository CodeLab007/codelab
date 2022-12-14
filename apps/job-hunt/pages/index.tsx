import { ClAccordion, ClButton, IAccordionProps } from '@codelab/ui';
import Head from 'next/head';

import styles from '../scss/Home.module.css';

export default function Home() {
  const accordionProps: IAccordionProps = {
    type: 'single',
    collapsible:true,
    items: [
      {
        value: 'accordion-1',
        triggerProps: {
          children: 'item1',
        },
        contentProps: {
          children: 'item1',
        },
      },
      {
        value: 'accordion-2',
        triggerProps: {
          children: 'item2',
        },
        contentProps: {
          children: 'item2',
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <ClAccordion {...accordionProps} />
        <ClButton variant='primary'>Click Me</ClButton>
      </main>
    </div>
  );
}
