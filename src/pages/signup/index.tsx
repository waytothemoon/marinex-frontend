import { ReactElement } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import { Grid, Link, Stack, Typography } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthSignUp from 'sections/auth/auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

const SignUp = () => (
  <Page title="Register">
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <NextLink href="/signin" passHref legacyBehavior>
              <Link variant="body1" color="primary">
                Already have an account?
              </Link>
            </NextLink>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthSignUp />
        </Grid>
      </Grid>
    </AuthWrapper>
  </Page>
);

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="auth">{page}</Layout>;
};

export default SignUp;
