import { object, string, array,number } from 'yup';

export const getPasswordSchema = () => string().trim().required();
export const loginSchema = object({
  email: string().trim().required().email(),
  password: getPasswordSchema(),
});
