import React from 'react';
import { Formik, Form, FormikValues } from 'formik';
import { ClContainer } from '../../container/Container';
import { ClRow } from '../../row/Row';
import { ClCol,IColProps } from '../../col/Col';

export enum FormStatus {
  Loading = 'Loading',
  Ready = 'Ready',
}

import { FormControl, IFormControl } from '../formControl/FormControl';
import { ClButton } from '../../button/Button';
import { SchemaOf } from 'yup';
import ClHeading from '../../heading/Heading';
interface IProps<T, U> {
  initialValues: FormikValues & T;
  onSubmit: (values: T) => void;
  controls: (IFormControl & {colProps?:IColProps})[];
  submitBtnText?: string;
  validationSchema: SchemaOf<U>;
  title?: React.ReactNode;
  titleClasses?: string;
}

export const ClGeneralForm = <T extends unknown, U extends Object>({
  initialValues,
  controls,
  onSubmit,
  submitBtnText = 'Submit',
  validationSchema,
  title,
  titleClasses,
}: IProps<T, U>) => {
  let formGroups = controls.map(({ colProps, ...rest }, i) => {
    return (
      <ClCol key={i} {...colProps}>
        <FormControl {...rest} />
      </ClCol>
    );
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => (
        <Form className='row'>
          {title && (
            <ClHeading level={3} className={titleClasses}>
              {title}
            </ClHeading>
          )}

          {formGroups}

          <ClCol xs={12}>
            <ClButton type='submit'>{submitBtnText}</ClButton>
          </ClCol>
        </Form>
      )}
    </Formik>
  );
};


