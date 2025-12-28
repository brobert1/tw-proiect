import * as Yup from 'yup';

export const initialValues = {
  recommendation: '',
  feedback_for_author: '',
  confidential_comments: '',
};

export const validationSchema = Yup.object().shape({
  feedback_for_author: Yup.string().nullable(),
  confidential_comments: Yup.string().nullable(),
});

export const RECOMMENDATION_OPTIONS = [
  {
    value: 'strong_accept',
    label: 'Strong Accept',
    description: 'Excellent paper, must be accepted',
    color: 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100',
    selectedColor: 'border-green-600 bg-green-500 text-white shadow-md',
  },
  {
    value: 'accept',
    label: 'Accept',
    description: 'Good paper, should be accepted',
    color: 'border-green-400 bg-green-50 text-green-600 hover:bg-green-100',
    selectedColor: 'border-green-500 bg-green-400 text-white shadow-md',
  },
  {
    value: 'weak_accept',
    label: 'Weak Accept',
    description: 'Acceptable with minor concerns',
    color: 'border-lime-400 bg-lime-50 text-lime-700 hover:bg-lime-100',
    selectedColor: 'border-lime-600 bg-lime-500 text-white shadow-md',
  },
  {
    value: 'weak_reject',
    label: 'Weak Reject',
    description: 'Below threshold, needs improvement',
    color: 'border-orange-400 bg-orange-50 text-orange-600 hover:bg-orange-100',
    selectedColor: 'border-orange-500 bg-orange-400 text-white shadow-md',
  },
  {
    value: 'reject',
    label: 'Reject',
    description: 'Does not meet publication standards',
    color: 'border-red-400 bg-red-50 text-red-600 hover:bg-red-100',
    selectedColor: 'border-red-600 bg-red-500 text-white shadow-md',
  },
];
