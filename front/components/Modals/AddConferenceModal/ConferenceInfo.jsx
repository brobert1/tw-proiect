import { Field, Fieldset } from '@components/HookForm';
import { TagInput, Input, TextArea } from '@components/Fields';

const ConferenceInfo = () => {
  return (
    <div className="grid gap-6">
      <Field
        as={Input}
        name="title"
        label="Conference Name"
        placeholder="e.g., AI & Ethics Conference 2024"
      />
      <Field as={Input} name="shortCode" label="Acronym" placeholder="e.g., AI&EC" />
      <Field
        as={TextArea}
        name="description"
        label="Description"
        placeholder="Enter conference description..."
      />
      <Field
        as={Input}
        name="location"
        label="Location"
        placeholder="e.g., Virtual or New York, NY"
      />
      <Field as={Input} name="date" label="Conference Date" type="date" placeholder="dd.mm.yyyy" />
      <Fieldset label="Topics" name="topics">
        <TagInput
          inputName="topicInput"
          listName="topics"
          placeholder="Type topic and press enter..."
        />
      </Fieldset>
    </div>
  );
};

export default ConferenceInfo;
