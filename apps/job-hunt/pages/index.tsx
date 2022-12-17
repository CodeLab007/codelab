import { ClButton, ClToast, ClTooltip } from '@codelab/ui';
import Head from 'next/head';
import { useState } from 'react';

import styles from '../scss/Home.module.css';

export default function Home() {
  const triggerChildren = 'Tooltip Trigger';
  const [open,setOpen] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <ClTooltip triggerProps={{ children: triggerChildren, className: 'btn btn-primary' }}>
          Test tooltip
        </ClTooltip>
        <ClButton onClick={setOpen.bind(null,true)} >HEllo world</ClButton>
        <ClToast title="TEST" open={open} onOpenChange={setOpen} >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim porro eaque quos! Labore quidem eum repellendus optio
        </ClToast>
      </main>
    </div>
  );
}
