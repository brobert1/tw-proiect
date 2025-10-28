import { Field } from '@components/HookForm';
import { Input } from '@components/Fields';

const ConferenceTimeline = () => {
  return (
    <div className="grid gap-6">
      <Field
        as={Input}
        name="submissionDate"
        label="Submission Deadline"
        type="date"
        placeholder="dd.mm.yyyy"
      />
      <Field
        as={Input}
        name="reviewDate"
        label="Review Deadline"
        type="date"
        placeholder="dd.mm.yyyy"
      />
    </div>
  );
};

export default ConferenceTimeline;
