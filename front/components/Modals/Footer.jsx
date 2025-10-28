import { Submit } from '@components/HookForm';
import { Button } from '@components';

const Footer = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  submitLabel = 'Submit',
  nextLabel = 'Next',
  backLabel = 'Back',
  isSubmitting = false,
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-end border-t border-gray-200 px-6 py-4">
      <div className="flex items-center gap-3">
        {!isFirstStep && (
          <Button onClick={onBack} className="button full text-black" disabled={isSubmitting}>
            {backLabel}
          </Button>
        )}
        {!isLastStep && (
          <Button onClick={onNext} className="button full primary" disabled={isSubmitting}>
            {nextLabel}
          </Button>
        )}
        {isLastStep && (
          <Submit className="button full primary" isLoading={isSubmitting}>
            {submitLabel}
          </Submit>
        )}
      </div>
    </div>
  );
};

export default Footer;
