import { TagInput } from '@components/Fields';
import { HookForm, Submit } from '@components/HookForm';
import * as yup from 'yup';

// Validation schema
const validationSchema = yup.object().shape({
  expertise_topics: yup.array().of(yup.string()),
  topicInput: yup.string(),
});

const ExpertiseForm = ({ initialTopics, onSubmit, isLoading }) => {
  return (
    <div className="rounded-lg border-2 border-blue-200 bg-blue-50/30 p-6">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Your Expertise</h2>
      <p className="mb-4 text-sm text-gray-600">
        Add topics that match your expertise to help organizers assign relevant papers to you.
      </p>
      <HookForm
        initialValues={{
          expertise_topics: initialTopics || [],
          topicInput: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <TagInput
          inputName="topicInput"
          listName="expertise_topics"
          placeholder="Type a topic and press Enter..."
          validateItem={(item) => !initialTopics?.includes(item)}
        />
        <div className="mt-4">
          <Submit isLoading={isLoading}>Save Expertise</Submit>
        </div>
      </HookForm>
    </div>
  );
};

export default ExpertiseForm;
