import { ReactElement } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import { Box, Button, Grid, Typography } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'sections/auth/AuthWrapper';

// ================================|| CHECK MAIL ||================================ //

const VerifyEmail = () => {
  return (
    <Page title="Check Mail">
      <AuthWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Verify your email</Typography>
              <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
                An email verification link has been sent to your registered email id. Click on the link to proceed with creating account
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <NextLink href="/signin" passHref legacyBehavior>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                  Sign in
                </Button>
              </NextLink>
            </AnimateButton>
          </Grid>
        </Grid>
      </AuthWrapper>
    </Page>
  );
};

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="auth">{page}</Layout>;
};

export default VerifyEmail;
