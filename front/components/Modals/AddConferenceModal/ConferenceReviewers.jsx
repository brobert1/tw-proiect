import TagInput from '@components/Fields/TagInput';
import { Fieldset } from '@components/HookForm';

const ConferenceReviewers = () => {
  return (
    <div className="grid gap-6">
      <Fieldset label="Invite reviewers by email" name="emails">
        <TagInput
          inputName="emailInput"
          listName="emails"
          placeholder="Type email and press enter..."
          validateItem={(value) => /.+@.+\..+/.test(value)}
        />
      </Fieldset>
    </div>
  );
};

export default ConferenceReviewers;
