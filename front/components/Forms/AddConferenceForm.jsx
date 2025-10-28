import { useState } from 'react';
import { HookForm, Form } from '@components/HookForm';
import { Footer } from '@components/Modals';
import { StepIndicator } from '@components';
import { initialValues, validationSchema } from '@models/add-conference';
import ConferenceInfo from '@components/Modals/AddConferenceModal/ConferenceInfo';
import ConferenceTimeline from '@components/Modals/AddConferenceModal/ConferenceTimeline';
import ConferenceReviewers from '@components/Modals/AddConferenceModal/ConferenceReviewers';
import { useMutation } from '@hooks';
import { createConference } from '@api/organizer';

const STEPS = [
  {
    id: 1,
    label: 'Basics',
    title: 'Step 1: Basic Information',
    fields: ['title', 'shortCode', 'description', 'location', 'date'],
    component: ConferenceInfo,
  },
  {
    id: 2,
    label: 'Timeline',
    title: 'Step 2: Conference Details',
    fields: ['submissionDate', 'reviewDate'],
    component: ConferenceTimeline,
  },
  {
    id: 3,
    label: 'Invite Reviewers',
    title: 'Step 3: Invite Reviewers',
    fields: [],
    component: ConferenceReviewers,
  },
];

const AddConferenceForm = ({ refetch, hide }) => {
  const [step, setStep] = useState(1);
  const CurrentStepComponent = STEPS[step - 1].component;

  const mutation = useMutation(createConference, {
    successCallback: () => {
      refetch();
      hide();
    },
  });

  const handleSubmit = (data) => {
    return mutation.mutateAsync(data);
  };

  return (
    <>
      <StepIndicator step={step} labels={STEPS.map((s) => s.label)} />
      <HookForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="px-6 py-4">
            <CurrentStepComponent />
          </div>
        </Form>
        <Footer
          currentStep={step}
          totalSteps={STEPS.length}
          onBack={() => setStep((s) => Math.max(1, s - 1))}
          onNext={() => setStep((s) => Math.min(STEPS.length, s + 1))}
          submitLabel="Create Conference"
        />
      </HookForm>
    </>
  );
};

export default AddConferenceForm;
