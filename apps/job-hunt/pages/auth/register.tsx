import { ClMultistepWizard, ClWizardStep } from '@codelab/ui';
import React from 'react';

import { Control } from '@codelab/ui/src/components/form/formControl/FormControl';

import { loginSchema } from '@codelab/validations';

import Link from 'next/link';
import { NextPageWithLayout } from '../_app';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import SocialLogins from '../../components/ui/socialLogins/SocialLogins';

import { step1Schema, step2Schema, step3Schema } from '@codelab/validations';

const Register: NextPageWithLayout = (props) => {
  // I need to access type so that i can define steps conditionally, to get values use this
  // https://stackoverflow.com/questions/56268194/update-another-component-when-formik-form-changes/56269090#56269090
  const initialValues = {
    type: 'company',
  };

  const onSubmit = (values: typeof initialValues, step: number, isLastStep: Boolean) => {
    console.log(values);
  };

  const step1Controls = [
    {
      control: Control.RadioInput,
      name: 'type',
      label: 'You are: ',
      radios: [
        {
          value: 'company',
          label: 'Company',
        },
        {
          value: 'individual',
          label: 'Individual',
        },
      ],
    },
  ];
  const step2Controls = [
    {
      control: Control.TextInput,
      name: 'email',
      placeholder: 'Email',
    },
    {
      control: Control.TextInput,
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
    {
      control: Control.TextInput,
      name: 'passwordRepeat',
      placeholder: 'Password (Repeat)',
      type: 'password',
    },
  ];

  const step3Controls = [
    {
      control: Control.TextInput,
      name: 'firstName',
      placeholder: 'First name',
    },
    {
      control: Control.TextInput,
      name: 'lastName',
      placeholder: 'Last name',
    },
    {
      control: Control.TextInput,
      name: 'companyName',
      placeholder: 'Company Name',
    },
  ];

  return (
    <>
      <div>
        <ClMultistepWizard
          style={{ maxWidth: '28rem' }}
          className='row'
          initialValues={initialValues}
          onSubmit={onSubmit}
          title='Join Our Platform'
          titleProps={{ level: 3, className: 'mb-3 text-gray-7' }}
          submitBtnProps={{ className: 'w-100' }}
        >
          <ClWizardStep controls={step1Controls} validationSchema={step1Schema} />
          <ClWizardStep controls={step2Controls} validationSchema={step2Schema} />

          <ClWizardStep controls={step3Controls} validationSchema={step3Schema} />
        </ClMultistepWizard>
      </div>

      <div className='flex-column'>
        <SocialLogins />
        {/* <ClGoogleLoginButton className='mb-3' onLogin={onGoogleLogin} />
          <ClFacebookLoginButton appId='1460628304461567' callback={onfacebookLogin} /> */}
      </div>
    </>
  );
};

Register.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
