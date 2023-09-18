// material-ui
import { Grid } from '@mui/material';

// project imports
import ProjectsCard from './ProjectsCard';
import RewardsCard from './RewardsCard';
import StatisticsCard from './StatisticsCard';
import RecentActivitesCard from './RecentActivitiesCard';

// ==============================|| INVESTOR - DASHBOARD ||============================== //

const DashboardProjectOwnerSection = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems={'stretch'}>
            {/* <Grid item xs={12} md={4}>
              <InvestorsCard />
            </Grid> */}
            <Grid item xs={12} md={4}>
              <ProjectsCard />
            </Grid>
            <Grid item xs={12} md={4}>
              <RewardsCard />
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

export default DashboardProjectOwnerSection;
