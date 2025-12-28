import { Button } from '@components';
import { TextArea } from '@components/Fields';
import { Field, HookForm, Submit } from '@components/HookForm';
import { classnames } from '@lib';
import { initialValues, RECOMMENDATION_OPTIONS, validationSchema } from '@models/submit-review';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';

const RecommendationCard = ({ option, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={classnames(
        'w-full rounded-lg border-2 p-3 text-left transition-all duration-200',
        isSelected ? option.selectedColor : option.color
      )}
    >
      <div className="font-medium">{option.label}</div>
      <div className={classnames('text-xs', isSelected ? 'text-white/80' : 'opacity-70')}>
        {option.description}
      </div>
    </button>
  );
};

const ReviewFormSection = ({ hasSubmitted, isLoading, error, onSubmit, onClose }) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState('');

  const handleSubmit = async (data) => {
    await onSubmit({
      ...data,
      recommendation: selectedRecommendation,
    });
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h4 className="mb-4 text-sm font-semibold text-gray-900">Your Review</h4>
      <HookForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Recommendation <span className="text-red-500">*</span>
            </label>
            <div className="-m-1 grid grid-cols-1 gap-2 p-1">
              {RECOMMENDATION_OPTIONS.map((option) => (
                <RecommendationCard
                  key={option.value}
                  option={option}
                  isSelected={selectedRecommendation === option.value}
                  onSelect={setSelectedRecommendation}
                />
              ))}
            </div>
          </div>
          <Field
            as={TextArea}
            name="feedback_for_author"
            label="Feedback for Author"
            help="This feedback will be shared with the author"
            className="form-control"
            rows={4}
            placeholder="Provide constructive feedback..."
          />
          <Field
            as={TextArea}
            name="confidential_comments"
            label="Confidential Comments"
            help="Only visible to the program committee"
            className="form-control"
            rows={3}
            placeholder="Any confidential remarks..."
          />
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" className="button secondary" onClick={onClose}>
              Cancel
            </Button>
            <Submit isLoading={isLoading} disabled={!selectedRecommendation}>
              {hasSubmitted ? 'Update Review' : 'Submit Review'}
            </Submit>
          </div>
        </div>
      </HookForm>
    </div>
  );
};

export default ReviewFormSection;
