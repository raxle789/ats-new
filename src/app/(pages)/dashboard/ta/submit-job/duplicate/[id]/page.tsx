import SubmitJobArea from '@/app/components/dashboard/employ/submit-job-area';

export const revalidate = 0;

const EmployDashboardDuplicateJobVacancyPage = ({ params, searchParams }) => {
  return (
    <>
      <SubmitJobArea
        params={{ ...params, mode: 'duplicate' }}
        searchParams={searchParams}
      />
    </>
  );
};

export default EmployDashboardDuplicateJobVacancyPage;
