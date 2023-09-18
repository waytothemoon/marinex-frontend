import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import Dashboard from './dashboard';

export default function HomePage() {
  return (
    <Page title="Landing">
      <Dashboard />
    </Page>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
