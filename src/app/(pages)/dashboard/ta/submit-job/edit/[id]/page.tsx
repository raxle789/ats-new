import SubmitJobArea from '@/app/components/dashboard/employ/submit-job-area';

export const revalidate = 0;

const EmployDashboardEditJobPage = ({ params, searchParams }) => {
  return (
    <>
      <SubmitJobArea
        params={{ ...params, mode: 'update' }}
        searchParams={searchParams}
      />
    </>
  );
};

export default EmployDashboardEditJobPage;
