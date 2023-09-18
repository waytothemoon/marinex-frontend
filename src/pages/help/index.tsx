import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import ChatBoard from 'sections/help/ChatBoard';
// third-party

// ==============================|| Help ||============================== //

const Help = () => {
  // const theme = useTheme();

  return (
    <Page title="Help">
      <ChatBoard />
    </Page>
  );
};

Help.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Help;
