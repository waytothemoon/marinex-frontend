import { ReactElement } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';

// project import
import Layout from 'layout';
import Page from 'components/Page';

// ==============================|| Milestones ||============================== //

const Milestones = () => {
  // const theme = useTheme();

  return (
    <Page title="Milestones">
      <h1>Milestones</h1>
    </Page>
  );
};

Milestones.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Milestones;
