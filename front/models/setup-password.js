import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string().min(8).required(),
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
});

export const initialValues = { password: '', confirm: '' };
