import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import { Box, CircularProgress, Tabs, Tab, Divider, Stack } from '@mui/material';

// project import
import Layout from 'layout';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import DocumentsForm from 'sections/projects/project-owner/detailForms/DocumentsForm';
import ShipDetailForm from 'sections/projects/project-owner/detailForms/ShipDetailForm';
import TokenizationForm from 'sections/projects/project-owner/detailForms/TokenizationForm';
import ProjectDetailForm from 'sections/projects/investor/ProjectDetail';

// third-party
import { useSession } from 'next-auth/react';

// types
import { UserRole } from 'types/auth';
import { useRouter } from 'next/router';

// ==============================|| ProjectDetail ||============================== //
export type ShipDetail = {
  id?: string;
  projectImage?: File | string;
  projectName?: string;
  description?: string;
  imoNumber?: string;
  vesselType?: string;
  builtYear?: Date;
  flag?: string;
  estimatedEarning?: number;
};

const ProjectDetail = () => {
  const [tab, setTab] = useState<number>(0);
  const [shipDetail, setShipDetail] = useState<ShipDetail>({});
  const [tokenization, setTokenization] = useState<any>({});
  const [documents, setDocuments] = useState({});
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [projectType, setProjectType] = useState<boolean>(false);

  const handleTabChange = (ev: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleNextOfShipDetail = () => {
    setTab(1);
  };

  const handleNextOfDocuments = () => {
    setTab(2);
  };

  useEffect(() => {
    if (router.query.projectId !== 'add-shipping' && router.query.projectId !== 'add-ico') {
      setLoading(true);
      fetch(`/api/project/${router.query.projectId}`)
        .then(async (res) => {
          let data = await res.json();

          data = data._doc ? data._doc : data;

          setShipDetail({
            projectImage: data.projectImage,
            projectName: data.projectName,
            description: data.description,
            imoNumber: data.imoNumber,
            vesselType: data.vesselType,
            builtYear: new Date(data.builtYear),
            flag: data.flag,
            estimatedEarning: data.estimatedEarning,
            id: data._id
          });
          setDocuments(data.documents || {});
          setTokenization({ ...data.tokenization, tokenized: data.tokenized });
          setProjectType(data.projectType);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      if (router.query.projectId === 'add-ico') setProjectType(true);
      else setProjectType(false);
      setLoading(false);
    }
  }, [router]);

  return (
    <Page title="ProjectDetail">
      {isLoading && (
        <Stack alignItems="center" mt={5}>
          <CircularProgress color="primary" />
        </Stack>
      )}
      {!isLoading && session?.token.role !== UserRole.INVESTOR && (
        <MainCard style={{ maxWidth: session?.token.role === UserRole.PROJECT_OWNER ? 768 : 'auto' }}>
          <Box maxWidth={768}>
            <Tabs value={tab} onChange={handleTabChange} aria-label="project detail tabs">
              <Tab label="Ship Detail" value={0} />
              <Tab label="Documents" value={1} disabled={JSON.stringify(shipDetail) === JSON.stringify({})} />
              <Tab
                label="Tokenization"
                value={2}
                disabled={router.query.projectId === 'add' && JSON.stringify(documents) === JSON.stringify({})}
              />
            </Tabs>
            <Divider style={{ marginBottom: 24 }} />
            {session?.token.role === UserRole.PROJECT_OWNER && (
              <>
                {tab === 0 && (
                  <ShipDetailForm
                    handleNext={handleNextOfShipDetail}
                    setShipDetail={setShipDetail}
                    shipDetail={shipDetail}
                    projectType={projectType}
                  />
                )}
                {tab === 1 && (
                  <DocumentsForm
                    handleNext={handleNextOfDocuments}
                    documents={documents}
                    projectType={projectType}
                    projectId={shipDetail.id}
                    setDocuments={setDocuments}
                  />
                )}
                {tab == 2 && (
                  <TokenizationForm
                    tokenization={tokenization}
                    projectType={projectType}
                    setTokenization={setTokenization}
                    projectId={shipDetail.id}
                  />
                )}
              </>
            )}
          </Box>
        </MainCard>
      )}
      {!isLoading && session?.token.role === UserRole.INVESTOR && <ProjectDetailForm />}
    </Page>
  );
};

ProjectDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectDetail;
