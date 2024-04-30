import SubmitJobArea from '@/app/components/dashboard/employ/submit-job-area';

const EmployDashboardCreateJobPage = ({ params, searchParams }) => {
  return (
    <>
      <SubmitJobArea params={params} searchParams={searchParams} />
    </>
  );
};

export default EmployDashboardCreateJobPage;
