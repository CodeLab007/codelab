import { ClButton, ClCol, ClContainer, ClFacebookLoginButton, ClGeneralForm, ClGoogleLoginButton, ClRow } from '@codelab/ui';
import React from 'react';

import { Control } from '@codelab/ui/src/components/form/formControl/FormControl';
import { object } from 'yup';
import { loginSchema } from '@codelab/validations';
import ClOneSideContainer from '@codelab/ui/src/components/container/OneSideContainer';
import ClHeading from '@codelab/ui/src/components/heading/Heading';

export const login = () => {
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
    },
  ];
  const validationSchema = loginSchema;
  return (
    <main className='d-flex' style={{ minHeight: '100vh', height: '1px' }}>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ width: '50%', height: '100%' }}
      >
        <ClGeneralForm<typeof initialValues, any>
          style={{ maxWidth: '30rem' }}
          title='Welcome Back'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          initialValues={initialValues}
          controls={controls}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          submitBtnText='Login'
          submitBtnProps={{ className: 'w-100' }}
          formFooter={<p className='mt-4 text-gray-7 fs-sm' style={{textAlign:'end'}}>Dont have an account ? <span className='text-primary' style={{fontWeight:600}}>Register</span></p>}
        />
      </div>
      <div></div>
      <div className='bg-gray-1 d-flex flex-column align-items-center justify-content-center' style={{ width: '50%', height: '100%' }}>
        <ClHeading level={4} className="text-primary mb-3">
            Prefer Social Options?
        </ClHeading>
        <ClGoogleLoginButton />
          <ClHeading className="my-3 text-gray-7" level={6}> OR </ClHeading>
        <ClFacebookLoginButton/>
      </div>
    </main>
  );
};

export default login;
