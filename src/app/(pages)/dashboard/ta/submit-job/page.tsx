import SubmitJobArea from '@/app/components/dashboard/employ/submit-job-area';

export const revalidate = 0;

const EmployDashboardCreateJobPage = ({ params, searchParams }) => {
  return (
    <>
      <SubmitJobArea
        params={{ ...params, mode: 'create' }}
        searchParams={searchParams}
      />
    </>
  );
};

export default EmployDashboardCreateJobPage;
