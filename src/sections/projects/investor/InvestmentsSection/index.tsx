// material-ui
import { Grid, Typography } from '@mui/material';
import MyListings from 'sections/my-portfolio/MyListings';

// project imports

// ==============================|| INVESTOR - PROJECTS ||============================== //

const InvestorSection = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">My Investments</Typography>
        </Grid>
        <Grid item xs={12}>
          <MyListings />
        </Grid>
      </Grid>
    </>
  );
};

export default InvestorSection;
