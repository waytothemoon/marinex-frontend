// material-ui
import { Grid } from '@mui/material';

// project imports
import InvestmentsCard from './InvestmentsCard';
import FinancialCard from './FinancialCard';
import ProjectsInvestorSection from 'sections/projects/investor/ProjectsInvestorSection';

// ==============================|| INVESTOR - DASHBOARD ||============================== //

const DashboardInvestorSection = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems={'stretch'}>
            <Grid item xs={12} md={6} xl={4}>
              <FinancialCard />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <InvestmentsCard />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ProjectsInvestorSection />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardInvestorSection;
