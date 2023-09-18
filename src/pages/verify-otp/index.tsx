import { ReactElement } from 'react';

// next
import NextLink from 'next/link';
import { useSession } from 'next-auth/react';

// material-ui
import { Grid, Link, Stack, Typography } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthCodeVerification from 'sections/auth/auth-forms/AuthCodeVerification';

// ================================|| CODE VERIFICATION ||================================ //

const VerifyOTP = () => {
  const { data: session } = useSession();
  return (
    <Page title="Code Verification">
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">OTP Verification</Typography>
              <NextLink href="/signin" passHref legacyBehavior>
                <Link variant="body1" color="primary">
                  Back to SignIn
                </Link>
              </NextLink>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography>We`ve send you code on {session?.token.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <AuthCodeVerification />
          </Grid>
        </Grid>
      </AuthWrapper>
    </Page>
  );
};

VerifyOTP.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="auth">{page}</Layout>;
};

export default VerifyOTP;
