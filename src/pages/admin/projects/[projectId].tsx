import { ReactElement, SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import { Tabs, Tab, Typography, Divider, Grid, CircularProgress } from '@mui/material';

// project import
import Layout from 'layout';
import MainCard from 'components/MainCard';
import Page from 'components/Page';
import Documents from 'sections/projects/admin/details/Documents';
import ShipDetail from 'sections/projects/admin/details/ShipDetail';
import Tokenization from 'sections/projects/admin/details/Tokenization';
import PreviewCard from 'sections/projects/admin/cards/PreviewCard';
import SubmitCard from 'sections/projects/admin/cards/SubmitCard';
import WithdrawalRequestCard from 'sections/projects/admin/cards/WithdrawalRequestCard';

// third-party
import { useSession } from 'next-auth/react';

// types
import { UserRole } from 'types/auth';
import { useRouter } from 'next/router';

// ==============================|| PROJECT DETAIL - ADMIN ||============================== //

const ProjectDetail = () => {
  const [tab, setTab] = useState<number>(0);
  const [shipDetail, setShipDetail] = useState<any>({});
  const [tokenization, setTokenization] = useState<any>({});
  const [documents, setDocuments] = useState<any>({});
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const [projectDetail, setProjectDetail] = useState<any>();
  const [others, setOthers] = useState<any>({});

  const handleTabChange = (ev: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    fetch(`/api/project/${router.query.projectId}`)
      .then(async (res) => {
        const { _doc: data, ...others } = await res.json();
        setOthers(others);
        setProjectDetail(data);
        setShipDetail({
          projectImage: data.projectImage,
          projectName: data.projectName,
          description: data.description,
          imoNumber: data.imoNumber,
          offeringSize: (data.tokenization.assetValue * data.tokenization.offeringPercentage) / 100,
          openTill: data.openTill,
          vesselType: data.vesselType,
          capacity: data.tokenization.tonnage,
          builtYear: data.builtYear,
          flag: data.flag
        });
        setDocuments(data.documents || {});
        setTokenization(data.tokenization);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [router]);

  return (
    <Page title="ProjectDetail">
      {isLoading && <CircularProgress color="primary" />}
      {!isLoading && !error && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MainCard
              style={{ maxWidth: session?.token.role === UserRole.PROJECT_OWNER ? 768 : 'auto', marginLeft: 'auto', marginRight: 'auto' }}
            >
              <Tabs value={tab} onChange={handleTabChange} aria-label="project detail tabs">
                <Tab label="Ship Detail" value={0} />
                <Tab label="Documents" value={1} />
                <Tab label="Tokenization" value={2} />
              </Tabs>
              <Divider style={{ marginBottom: 24 }} />
              {tab === 0 && <ShipDetail shipDetail={shipDetail} />}
              {tab === 1 && <Documents documents={documents} />}
              {tab == 2 && <Tokenization tokenization={tokenization} />}
            </MainCard>
          </Grid>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={4}>
            {tab === 0 && (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={12}>
                    <PreviewCard
                      projectName={shipDetail.projectName}
                      estimatedEarning={projectDetail.estimatedEarning}
                      matPrice={1}
                      valuation={tokenization.assetValue}
                    />
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <WithdrawalRequestCard
                      requested={others.withdrawalRequest === false}
                      fundRaising={others.investments}
                      projectName={shipDetail.projectName}
                      imoNumber={shipDetail.imoNumber}
                      projectId={projectDetail._id}
                      offering={tokenization.tonnage * 10 * tokenization.offeringPercentage}
                    />
                  </Grid>
                </Grid>
              </>
            )}
            {tab === 1 && <SubmitCard data={projectDetail} />}
          </Grid>
        </Grid>
      )}
      {error && (
        <Typography variant="h3" align="center">
          Failed to fetch data
        </Typography>
      )}
    </Page>
  );
};

ProjectDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectDetail;
