import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import DashboardAdminSection from 'sections/dashboard/admin/DashboardAdminSection';

// assets

// ==============================|| DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Page title="Dashboard">
      <DashboardAdminSection />
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
