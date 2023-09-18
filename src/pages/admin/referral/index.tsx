import { ReactElement } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';

// project import
import Layout from 'layout';
import Page from 'components/Page';

// ==============================|| Referral ||============================== //

const Referral = () => {
  // const theme = useTheme();

  return (
    <Page title="Referral">
      <h1>Referral</h1>
    </Page>
  );
};

Referral.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Referral;
