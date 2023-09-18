import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import ProjectsAdminSection from 'sections/projects/admin/ProjectsAdminSection';

// ==============================|| Projects - ADMIN ||============================== //

const Projects = () => {
  return (
    <Page title="Projects">
      <ProjectsAdminSection />
    </Page>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Projects;
