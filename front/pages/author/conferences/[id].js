import { checkAuth, withAuth } from '@auth';
import { submitPaper } from '@api/author';
import { Layout } from '@components';
import { ConferenceDashboard } from '@components/Author/ConferenceDetail';
import { useMutation, useQuery } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, status, refetch } = useQuery(`author/conferences/${id}`);

  const mutation = useMutation((formData) => submitPaper(id, formData), {
    successCallback: () => {
      refetch();
    },
  });

  const handleSubmitPaper = async (formData) => {
    await mutation.mutateAsync(formData);
  };

  return (
    <Layout title={data?.name || 'Conference Details'}>
      <ConferenceDashboard
        data={data}
        status={status}
        onSubmitPaper={handleSubmitPaper}
        isSubmitting={mutation.isPending}
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
