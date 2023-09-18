import { ReactElement, useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

// material-ui
import { Box, Button, Stack, InputLabel, TextField, Grid, Switch } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';

// ==============================|| PROJECT DETAIL - ADMIN ||============================== //

export type ProjectOwnerDetailData = {
  firstName?: string;
  middlename?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  status?: boolean;
};

const ProjectOwnerDetail = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const [projectOwner, setProjectOwner] = useState<ProjectOwnerDetailData>({ status: true });

  const router = useRouter();

  const handleSubmit = () => {};

  useEffect(() => {
    const fetchInvestors = () => {
      fetch(`/api/user/${router.query.projectOwnerId}`).then(async (res) => {
        if (res.status === 200) {
          setProjectOwner(await res.json());
        }
      });
    };
    fetchInvestors();
  }, [router]);

  return (
    <Page title="ProjectOwnerDetail">
      <Box maxWidth={768} mx="auto">
        <MainCard>
          <Formik
            initialValues={{
              firstName: projectOwner.firstName || '',
              middlename: projectOwner.middlename || '',
              lastName: projectOwner.lastName || '',
              email: projectOwner.email || '',
              phoneNumber: projectOwner.phoneNumber || '',
              status: projectOwner.status
            }}
            validationSchema={yup.object().shape({
              firstName: yup.string().required('First Name is required'),
              lastName: yup.string().required('Last Name is required'),
              email: yup.string().email('Invalid email address.').required('Email is required'),
              phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
              status: yup.bool().required('Status is required')
            })}
            onSubmit={(values, { setErrors, setSubmitting }) => {
              console.log(23);
              setProjectOwner({
                firstName: values.firstName,
                middlename: values.middlename,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                status: values.status
              });
              handleSubmit();
            }}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={0.5}>
                      <InputLabel>First Name *</InputLabel>
                      <TextField
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name *"
                        value={values.firstName}
                        onChange={handleChange}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        fullWidth
                        autoComplete="given-name"
                        InputProps={{
                          readOnly: router.query.projectOwnerId !== 'add'
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
                        value={values.middlename}
                        onChange={handleChange}
                        error={touched.middlename && Boolean(errors.middlename)}
                        helperText={touched.middlename && errors.middlename}
                        fullWidth
                        autoComplete="middle-name"
                        InputProps={{
                          readOnly: router.query.projectOwnerId !== 'add'
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
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        fullWidth
                        autoComplete="family-name"
                        InputProps={{
                          readOnly: router.query.projectOwnerId !== 'add'
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
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        fullWidth
                        autoComplete="email"
                        InputProps={{
                          readOnly: router.query.projectOwnerId !== 'add'
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
                        value={values.phoneNumber}
                        onChange={handleChange}
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        fullWidth
                        autoComplete="phone"
                        InputProps={{
                          readOnly: router.query.projectOwnerId !== 'add'
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={0.5}>
                      <InputLabel>Status *</InputLabel>
                      <Switch checked={values.status} onChange={(ev, checked) => setFieldValue('status', checked)} color="success" />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">
                      <AnimateButton>
                        <Button variant="contained" disabled={isSubmitting} sx={{ my: 3, ml: 1 }} type="submit">
                          Submit
                        </Button>
                      </AnimateButton>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </MainCard>
      </Box>
    </Page>
  );
};

ProjectOwnerDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProjectOwnerDetail;
