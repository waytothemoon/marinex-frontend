import { ReactElement, useEffect, useState } from 'react';

import NextLink from 'next/link';

// material-ui
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';

// third-party
import { useSession } from 'next-auth/react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import FinancialReportCard from 'sections/my-portfolio/FinancialReportCard';
import MyListings from 'sections/my-portfolio/MyListings';
import MainCard from 'components/MainCard';
import Image from 'next/image';
// types
import { UserRole } from 'types/auth';

// ==============================|| My Portfolio ||============================== //

const MyPortfolio = () => {
  // const theme = useTheme();
  const { data: session } = useSession();
  const [total, setTotal] = useState<any>({});

  useEffect(() => {
    fetch('/api/investment').then(async (res) => {
      if (res.status === 200) {
        const { total } = await res.json();
        console.log(total);
        setTotal(total);
      }
    });
  }, []);

  return (
    <Page title="My Portfolio">
      {session && (session.token.kycStatus === undefined || session?.token.kycStatus === 0) && (
        <Box width="max-content" mx="auto" my={18}>
          <Paper style={{ backgroundColor: 'transparent' }}>
            <Stack mt={6} spacing={1} alignItems="center" pt={6} pb={4} px={8}>
              <Image src={'/assets/images/kyc/back.svg'} alt="KYC picture" width={150} height={150} />
              <Typography variant="h3">We are going to use Sumsub KYC verification</Typography>
              <Typography>You will be able to see your portfolio here once your KYC submission has been approved</Typography>
              <NextLink href="/my-portfolio/kyc" passHref legacyBehavior>
                <Button>
                  <Typography fontWeight="700" variant="body1">
                    Start KYC
                  </Typography>
                </Button>
              </NextLink>
            </Stack>
          </Paper>
        </Box>
      )}
      {session && session.token.kycStatus === 1 && (
        <Box width="max-content" mx="auto" my={18}>
          <Paper>
            <Stack mt={6} spacing={3} alignItems="center" pt={6} pb={4} px={8}>
              <Image src={'/assets/images/kyc/waiting.jpg'} alt="Waiting" width={120} height={150} />
              <Typography variant="h3">Your KYC submission is in Progress</Typography>
              <Typography>We will let you know when your KYC is approved</Typography>
            </Stack>
          </Paper>
        </Box>
      )}
      {session && session.token.kycStatus === 2 && session.token.role === UserRole.INVESTOR && (
        <Grid container spacing={4.5}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FinancialReportCard title="Total investment" count={total.investment || 0} color="invest" />
              </Grid>
              <Grid item xs={12} md={4}>
                <FinancialReportCard title="Claimed rewards" count={total.claimed || 0} color="balance" />
              </Grid>
              <Grid item xs={12} md={4}>
                <FinancialReportCard title="Claimable rewards" count={total.claimable || 0} color="reward" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">My Listings</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <MyListings />
            </MainCard>
          </Grid>
        </Grid>
      )}
      {session && session.token.kycStatus === 1 && session.token.role === UserRole.PROJECT_OWNER && (
        <Box width="max-content" mx="auto" my={18}>
          <Paper>
            <Stack mt={6} spacing={3} alignItems="center" pt={6} pb={4} px={8}>
              <Typography variant="h3">Your KYC submission is Approved</Typography>
            </Stack>
          </Paper>
        </Box>
      )}
    </Page>
  );
};

MyPortfolio.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MyPortfolio;
