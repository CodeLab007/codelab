import { ClInput, IInputProps } from '../Input';

export const ClTextInput = ({ children, ...rest }: IInputProps) => {
  return <ClInput {...rest}>{children}</ClInput>;
};
