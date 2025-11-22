import { HookForm, Form } from '@components/HookForm';
import { ActionModal, Button } from '@components';
import { initialValues, validationSchema } from '@models/edit-conference';
import { useDisclosure, useMutation } from '@hooks';
import { deleteConference, updateConference } from '@api/organizer';
import ConferenceInfo from '@components/Modals/AddConferenceModal/ConferenceInfo';
import ConferenceTimeline from '@components/Modals/AddConferenceModal/ConferenceTimeline';

const EditConferenceForm = ({ conference, refetch }) => {
  const { isOpen, show, hide } = useDisclosure();

  const data = {
    title: conference.name,
    shortCode: conference.acronym,
    description: conference.description || '',
    location: conference.location || '',
    date: conference.conference_date
      ? new Date(conference.conference_date).toISOString().split('T')[0]
      : '',
    topics:
      typeof conference.topics === 'string'
        ? JSON.parse(conference.topics)
        : conference.topics || [],
    submissionDate: conference.submission_deadline
      ? new Date(conference.submission_deadline).toISOString().split('T')[0]
      : '',
    reviewDate: conference.review_deadline
      ? new Date(conference.review_deadline).toISOString().split('T')[0]
      : '',
  };

  const mergedInitialValues = { ...initialValues, ...data };

  const deleteMutation = useMutation(() => deleteConference(conference.id), {
    redirectOnSuccess: '/organizer/conferences',
  });

  const updateMutation = useMutation((data) => updateConference(conference.id, data), {
    successCallback: async () => {
      await refetch();
    },
  });

  const handleSubmit = async (data) => {
    return updateMutation.mutateAsync(data);
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
    hide();
  };

  return (
    <HookForm
      initialValues={mergedInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="space-y-6 w-full pb-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Basic Information</h2>
            <ConferenceInfo />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Timeline</h2>
            <ConferenceTimeline />
          </div>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h2 className="text-xl font-semibold mb-2 text-red-800">Danger Zone</h2>
            <p className="text-gray-600 mb-4">
              Once you delete a conference, there is no going back.
            </p>
            <Button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              onClick={show}
            >
              Delete Conference
            </Button>
          </div>
          <div className="flex justify-start pt-4">
            <Button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
      <ActionModal
        confirmText="Delete Conference"
        hide={hide}
        isOpen={isOpen}
        onConfirm={handleDelete}
        title="Delete Conference?"
        variant="danger"
      >
        <p>
          Are you sure you want to delete this conference? This action cannot be undone and all
          associated data (submissions, reviews, etc.) will be permanently lost.
        </p>
      </ActionModal>
    </HookForm>
  );
};

export default EditConferenceForm;
