import { ReactElement } from 'react';

// material-ui
import { Box, Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

// third-party
import { useSession } from 'next-auth/react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import InvestorBalanceCard from 'sections/dashboard/investor/FinancialCard';
import InvestorTransferCard from 'sections/my-wallet/investor/TransferCard';
import InvestorTransactionHistory from 'sections/my-wallet/investor/TransactionHistory';
import ProjectOwnerBalanceCard from 'sections/my-wallet/project-owner/BalanceCard';
import ProjectOwnerProjectBalanceCard from 'sections/my-wallet/project-owner/ProjectBalanceCard';
import ProjectOwnerTransactionHistory from 'sections/my-wallet/project-owner/TransactionHistory';

// types
import { UserRole } from 'types/auth';

// ==============================|| My Wallet ||============================== //

const MyWallet = () => {
  const { data: session } = useSession();
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Page title="My Wallet">
      {session?.token.role === UserRole.INVESTOR && (
        <Stack spacing={3}>
          <Grid container justifyContent="stretch" alignItems="stretch">
            <Grid item xs={12} sm={6} px={1} py={1}>
              <InvestorBalanceCard />
            </Grid>
            <Grid item xs={12} sm={6} px={1} py={1}>
              <InvestorTransferCard walletAddress={session.token.walletAddress} />
            </Grid>
          </Grid>
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={matchDownSM ? 'start' : 'end'}
            spacing={2}
          >
            <Typography variant="h4">Transaction History</Typography>
          </Stack>
          <InvestorTransactionHistory />
        </Stack>
      )}
      {session?.token.role === UserRole.PROJECT_OWNER && (
        <Stack spacing={3}>
          <Box>
            <Grid container justifyContent="stretch" spacing={3}>
              <Grid item xs={12} sm={6} lg={4} xl={4}>
                <ProjectOwnerBalanceCard />
              </Grid>
              <Grid item xs={12} sm={6} lg={4} xl={4}>
                <ProjectOwnerProjectBalanceCard />
              </Grid>
            </Grid>
          </Box>
          <Typography variant="h4">Transaction History</Typography>
          <ProjectOwnerTransactionHistory />
        </Stack>
      )}
    </Page>
  );
};

MyWallet.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MyWallet;
