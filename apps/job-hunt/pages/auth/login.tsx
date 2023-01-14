import {
  ClButton,
  ClCol,
  ClContainer,
  ClFacebookLoginButton,
  ClGeneralForm,
  ClGoogleLoginButton,
  ClLink,
  ClRow,
} from '@codelab/ui';
import React, { useCallback } from 'react';

import { Control } from '@codelab/ui/src/components/form/formControl/FormControl';

import { loginSchema } from '@codelab/validations';

import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import SocialLogins from '../../components/ui/socialLogins/SocialLogins';


const Login: NextPageWithLayout = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };
  const controls = [
    {
      control: Control.TextInput,
      name: 'email',
      placeholder: 'Email',
    },
    {
      control: Control.TextInput,
      name: 'password',
      placeholder: 'Password',
      type:'password'
    },
  ];
  const validationSchema = loginSchema;
  return (
    <>
      <div>
        <ClGeneralForm<typeof initialValues, any>
          style={{ maxWidth: '28rem' }}
          title='Welcome Back'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          initialValues={initialValues}
          controls={controls}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          submitBtnText='Login'
          submitBtnProps={{ className: 'w-100 mb-3' }}
          preButtonChildren={
            <p className='text-gray-7 fs-sm mb-3' style={{ textAlign: 'end' }}>
              <ClLink href='/auth/login' className='text-gray-5'>
                Forgot your Password?
              </ClLink>
            </p>
          }
          formFooter={
            <ClCol xs={12} className='d-flex'>
              <ClLink href='/auth/register'  className='w-100 btn btn__outline-primary'>
                Create an account
              </ClLink >
            </ClCol>
          }
        />
      </div>
      <div className='flex-column'>
        <SocialLogins />
      </div>
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
