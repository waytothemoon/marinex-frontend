import { ReactElement } from 'react';

// material-ui

// project import
import Layout from 'layout';
import Page from 'components/Page';
import DashboardInvestorSection from 'sections/dashboard/investor/DashboardInvestorSection';
import DashboardProjectOwnerSection from 'sections/dashboard/project-owner/DashboardProjectOwnerSection';
import useUser from 'hooks/useUser';

// types
import { UserRole } from 'types/auth';

// assets

// ==============================|| DASHBOARD ||============================== //

const Dashboard = () => {
  const user = useUser();

  return (
    <Page title="Dashboard">
      {user && (
        <>
          {user.role === UserRole.INVESTOR && <DashboardInvestorSection />}
          {user.role === UserRole.PROJECT_OWNER && <DashboardProjectOwnerSection />}
        </>
      )}
    </Page>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
