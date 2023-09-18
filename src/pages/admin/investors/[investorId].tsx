import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Box, Stack, InputLabel, TextField, Grid, Switch } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import { useRouter } from 'next/router';

// ==============================|| PROJECT DETAIL - ADMIN ||============================== //

export type InvestorDetailData = {
  firstName?: string;
  middlename?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  status?: boolean;
  referralCode?: string;
};

const initialValues = {
  firstName: '',
  middlename: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  status: true,
  referralCode: ''
};

const InvestorDetail = () => {
  const [investor, setInvestor] = useState<InvestorDetailData>({ ...initialValues });
  const handleSubmit = (status: boolean) => {};
  const router = useRouter();

  useEffect(() => {
    const fetchInvestors = () => {
      fetch(`/api/user/${router.query.investorId}`)
        .then(async (res) => {
          if (res.status === 200) {
            setInvestor(await res.json());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchInvestors();
  }, [router]);

  return (
    <Page title="InvestorDetail">
      <Box maxWidth={768} mx="auto">
        <MainCard>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>First Name *</InputLabel>
                <TextField
                  id="firstName"
                  name="firstName"
                  placeholder="Enter First Name *"
                  value={investor.firstName}
                  fullWidth
                  autoComplete="given-name"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Middle Name</InputLabel>
                <TextField
                  id="middlename"
                  name="middlename"
                  placeholder="Enter Middle Name"
                  value={investor.middlename}
                  fullWidth
                  autoComplete="middle-name"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Last Name *</InputLabel>
                <TextField
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Last Name *"
                  value={investor.lastName}
                  fullWidth
                  autoComplete="family-name"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Email *</InputLabel>
                <TextField
                  id="email"
                  name="email"
                  placeholder="Enter Email *"
                  value={investor.email}
                  fullWidth
                  autoComplete="email"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Phone Number *</InputLabel>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter Phone Number *"
                  value={investor.phoneNumber}
                  fullWidth
                  autoComplete="phone"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Referral Code</InputLabel>
                <TextField
                  id="referralCode"
                  name="referralCode"
                  placeholder="Referral Code"
                  value={investor.referralCode}
                  fullWidth
                  autoComplete="referral-code"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Status *</InputLabel>
                <Switch checked={investor.status} onChange={(ev, checked) => handleSubmit(checked)} color="success" />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Box>
    </Page>
  );
};

InvestorDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default InvestorDetail;
