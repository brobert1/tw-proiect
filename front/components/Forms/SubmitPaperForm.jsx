import { useState } from 'react';
import { HookForm, Form } from '@components/HookForm';
import { Footer } from '@components/Modals';
import { StepIndicator } from '@components';
import { initialValues, validationSchema } from '@models/submit-paper';
import PaperMetadata from '@components/Modals/SubmitPaperModal/PaperMetadata';
import PaperTopics from '@components/Modals/SubmitPaperModal/PaperTopics';
import PaperUpload from '@components/Modals/SubmitPaperModal/PaperUpload';
import PaperReview from '@components/Modals/SubmitPaperModal/PaperReview';

const STEPS = [
  {
    id: 1,
    label: 'Details',
    title: 'Step 1: Paper Details',
    component: PaperMetadata,
  },
  {
    id: 2,
    label: 'Topics',
    title: 'Step 2: Select Topics',
    component: PaperTopics,
  },
  {
    id: 3,
    label: 'Upload',
    title: 'Step 3: Upload Paper',
    component: PaperUpload,
  },
  {
    id: 4,
    label: 'Review',
    title: 'Step 4: Review & Submit',
    component: PaperReview,
  },
];

const SubmitPaperForm = ({ conferenceTopics = [], onSubmit, isSubmitting }) => {
  const [step, setStep] = useState(1);
  const CurrentStepComponent = STEPS[step - 1].component;

  const handleSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const getStepProps = () => {
    switch (step) {
      case 2:
        return { conferenceTopics };
      case 4:
        return { onGoToStep: goToStep };
      default:
        return {};
    }
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
          <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
            <CurrentStepComponent {...getStepProps()} />
          </div>
        </Form>
        <Footer
          currentStep={step}
          totalSteps={STEPS.length}
          onBack={() => setStep((s) => Math.max(1, s - 1))}
          onNext={() => setStep((s) => Math.min(STEPS.length, s + 1))}
          submitLabel="Submit Paper"
          isSubmitting={isSubmitting}
        />
      </HookForm>
    </>
  );
};

export default SubmitPaperForm;
