import EmployJobDetailArea from '@/app/components/dashboard/employ/job-detail-area';

const EmployDashboardJobDetailLayout = ({ children, params }) => {
  return <EmployJobDetailArea params={params}>{children}</EmployJobDetailArea>;
};

export default EmployDashboardJobDetailLayout;
