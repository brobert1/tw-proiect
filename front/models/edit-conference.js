import * as Yup from 'yup';

export const initialValues = {
  title: '',
  shortCode: '',
  description: '',
  location: '',
  date: '',
  topics: [],
  topicInput: '',
  submissionDate: '',
  reviewDate: '',
};

export const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required('Title is required'),
  shortCode: Yup.string().trim().max(10, 'Max 10 characters').required('Short code is required'),
  description: Yup.string().trim().max(1000, 'Keep it under 1000 characters'),
  location: Yup.string().trim().required('Location is required'),
  date: Yup.string().required('Conference date is required'),
  topics: Yup.array().of(Yup.string().trim()).min(0),
  submissionDate: Yup.string().nullable(),
  reviewDate: Yup.string().nullable(),
});
