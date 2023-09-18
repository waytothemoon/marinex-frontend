// material-ui
import { Grid } from '@mui/material';

// project imports
import TrendingProjects from './TrendingProjects';

// ==============================|| INVESTOR - PROJECTS ||============================== //

const ProjectsInvestorSection = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TrendingProjects />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectsInvestorSection;
