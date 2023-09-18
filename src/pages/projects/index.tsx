import { ReactElement } from 'react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import ProjectsInvestorSection from 'sections/projects/investor/ProjectsInvestorSection';
import ProjectsPrownerSection from 'sections/projects/project-owner/ProjectsPrownerSection';

// third-party
import { useSession } from 'next-auth/react';

// types
import { UserRole } from 'types/auth';

// ==============================|| Projects ||============================== //

const Projects = () => {
  const { data: session } = useSession();

  return (
    <Page title="Projects">
      {session?.token.role === UserRole.INVESTOR && <ProjectsInvestorSection />}
      {session?.token.role === UserRole.PROJECT_OWNER && <ProjectsPrownerSection />}
    </Page>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Projects;
