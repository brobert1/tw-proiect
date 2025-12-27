import * as Yup from 'yup';

export const initialValues = {
  title: '',
  abstract: '',
  coAuthors: [],
  coAuthorName: '',
  coAuthorEmail: '',
  coAuthorAffiliation: '',
  topics: [],
  file: null,
};

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required')
    .max(200, 'Title must be under 200 characters'),
  abstract: Yup.string()
    .trim()
    .required('Abstract is required')
    .max(2000, 'Abstract must be under 2000 characters'),
  coAuthors: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required('Name is required'),
      email: Yup.string().trim().email('Invalid email').required('Email is required'),
      affiliation: Yup.string().trim(),
    })
  ),
  topics: Yup.array().of(Yup.string()).min(1, 'Select at least one topic'),
  file: Yup.mixed().required('Please upload your paper'),
});

export const metadataSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required')
    .max(200, 'Title must be under 200 characters'),
  abstract: Yup.string()
    .trim()
    .required('Abstract is required')
    .max(2000, 'Abstract must be under 2000 characters'),
});

export const topicsSchema = Yup.object().shape({
  topics: Yup.array().of(Yup.string()).min(1, 'Select at least one topic'),
});

export const uploadSchema = Yup.object().shape({
  file: Yup.mixed().required('Please upload your paper'),
});
