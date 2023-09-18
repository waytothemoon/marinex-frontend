// material-ui
import { Grid } from '@mui/material';

// project imports
import InvestorsCard from './InvestorsCard';
import ProjectsCard from './ProjectsCard';
import ProjectOwnersCard from './ProjectOwnersCard';
import StatisticsCard from './StatisticsCard';
import RecentActivitesCard from './RecentActivitiesCard';

// ==============================|| INVESTOR - DASHBOARD ||============================== //

const DashboardAdminSection = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems={'stretch'}>
            <Grid item xs={12} md={4}>
              <ProjectOwnersCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <InvestorsCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <ProjectsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems={'stretch'}>
            <Grid item xs={12} md={8}>
              <StatisticsCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <RecentActivitesCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardAdminSection;
