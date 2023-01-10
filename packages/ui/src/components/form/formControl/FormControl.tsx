import { ClTextInputFormik, IFormikTextInputProps } from '../textInput/TextInputFormik';

export enum Control {
  TextInput = 'TextInput',
  SelectInput = 'SelectInput',
  CheckInput = 'CheckInput',
}

type FormControlBase = {
  control: Control;
};

export type IFormControl = FormControlBase & IFormikTextInputProps;

export const FormControl = ({ control, ...rest }: FormControlBase & IFormikTextInputProps) => {
  switch (control) {
    case Control.TextInput:
      return <ClTextInputFormik {...(rest as IFormikTextInputProps)} />;
    default:
      return <ClTextInputFormik {...(rest as IFormikTextInputProps)} />;
  }
};
