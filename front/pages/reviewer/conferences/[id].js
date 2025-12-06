import { checkAuth, withAuth } from '@auth';
import { updateExpertise } from '@api/reviewer';
import { Layout } from '@components';
import { ConferenceDashboard } from '@components/Reviewer';
import { useMutation, useQuery } from '@hooks';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, status, refetch } = useQuery(`reviewer/conferences/${id}`);

  const mutation = useMutation((formData) => updateExpertise(id, formData.expertise_topics), {
    successCallback: () => {
      refetch();
    },
  });

  return (
    <Layout title={data?.name || 'Conference Details'}>
      <ConferenceDashboard
        data={data}
        status={status}
        onSubmitExpertise={(formData) => mutation.mutateAsync(formData)}
        isSubmitting={mutation.isPending}
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
