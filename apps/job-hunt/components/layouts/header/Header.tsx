import { classNames } from '@codelab/lib';
import React from 'react';
import Logo from '../../ui/logo/Logo';

import classes from './header.module.scss'


const Header = () => {
    const navLinks = [
        <ClLink href='/' key={0}>
            Home
        </ClLink>,
        <ClLink href='/jobs' key={1}>
            Jobs
        </ClLink>,
        <ClLink href='/faqs' key={2}>
           FAQs
        </ClLink>,
        <ClLink applyLinkStyles={false} className='btn btn__primary ms-5'  href='/auth/login'  key={3}>
           Login
        </ClLink>
    ]
  return (
    <header className='d-flex'>
      <ClContainer className={classNames('py-2 px-4',classes.header,'bg-white')}>
       <nav className='d-flex justify-content-between align-items-center'>
       <Logo className='ps-0'/>
       <ClNav navLinks={navLinks}/>
       </nav>
      </ClContainer>
    </header>
  );
};

export default Header;
