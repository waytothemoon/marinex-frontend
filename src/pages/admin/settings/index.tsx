import { ReactElement } from 'react';

// material-ui
// import { useTheme } from '@mui/material/styles';

// project import
import Layout from 'layout';
import Page from 'components/Page';

// ==============================|| Settings ||============================== //

const Settings = () => {
  // const theme = useTheme();

  return (
    <Page title="Settings">
      <h1>Settings</h1>
    </Page>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
