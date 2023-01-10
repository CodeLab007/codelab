import { ClGeneralForm } from '@codelab/ui';
import React from 'react';

import { Control } from '@codelab/ui/src/components/form/formControl/FormControl';
import { object } from 'yup';
import { loginSchema } from '@codelab/validations';

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
    },
    {
      control: Control.TextInput,
      name: 'password',
    },
  ];
  const validationSchema = loginSchema;
  return (
    <ClGeneralForm<typeof initialValues, any>
      initialValues={initialValues}
      controls={controls}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default login;
