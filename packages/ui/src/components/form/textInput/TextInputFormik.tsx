import { Field, FieldProps } from 'formik';
import { IInputProps } from '../Input';
import { ClTextInput } from './TextInput';

interface IProps extends IInputProps {
  name: string;
}

export const ClTextInputFormik = ({ name, className, children, ...rest }: IProps) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.submitCount >= 1);

        return (
          <ClTextInput
            {...rest}
            {...field}
            error={form.errors[name] as string}
            hasError={hasError}
          />
        );
      }}
    </Field>
  );
};
