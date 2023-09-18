import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Box, Stack, InputLabel, TextField, Grid, Card, CardContent, Typography, Chip, CardMedia, CircularProgress } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import MainCard from 'components/MainCard';
import { useRouter } from 'next/router';
import Image from 'next/image';

// ==============================|| PROJECT DETAIL - ADMIN ||============================== //

export type KYCDetailData = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dob?: string;
  country?: string;
  countryOfBirth?: string;
  stateOfBirth?: string;
  placeOfBirth?: string;
  phone?: string;
  tin?: string;
  gender?: string;
  nationality?: string;
  documentStatus?: string;
  docType?: string;
  docCountry?: string;
};

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  dob: '',
  country: '',
  countryOfBirth: '',
  stateOfBirth: '',
  placeOfBirth: '',
  phone: '',
  tin: '',
  gender: '',
  nationality: '',
  documentStatus: '',
  docType: '',
  docCountry: ''
};

const KYCDetail = () => {
  const [investor, setInvestor] = useState<KYCDetailData>({ ...initialValues });
  const [imageSrc, setImageSrc] = useState<string>('/assets/images/kyc/back.svg');
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchKYCById = () => {
      fetch(`/api/kyc/${router.query.kycId}`)
        .then(async (res) => {
          if (res.status === 200) {
            const applicantData = await res.json();
            console.log(applicantData['applicant']['info']['idDocs'][0]);
            console.log(applicantData['applicantVeriff']['IDENTITY']['imageReviewResults']);
            const personalInfo: KYCDetailData = Object.assign({}, initialValues);
            const info = Object.assign({}, applicantData['applicant']['info']);
            Object.keys(info).map((key) => {
              if (!key.includes('En')) personalInfo[key as keyof KYCDetailData] = info[key];
            });

            if (applicantData['applicant']['info']['idDocs']) {
              personalInfo.docType = applicantData['applicant']['info']['idDocs'][0]['idDocType'];
              personalInfo.docCountry = applicantData['applicant']['info']['idDocs'][0]['country'];
            }
            if (applicantData['applicantVeriff']['IDENTITY'] && applicantData['applicantVeriff']['IDENTITY']['imageIds']) {
              fetch(
                `/api/kyc/image/${applicantData['applicant']['inspectionId']}/${applicantData['applicantVeriff']['IDENTITY']['imageIds'][0]}`
              ).then(async (res) => {
                const base64 = await res.json();
                setImageSrc('data:image/jpeg;base64,' + base64);
                setLoading(false);
              });

              // Set the image source to the base64-encoded string
            }
            setInvestor(personalInfo);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchKYCById();
  }, [router]);

  return (
    <Page title="KYC Detail">
      <Box mx="auto">
        <MainCard>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={10} direction={'row'}>
                <Box width={'30%'}>
                  <InputLabel>First Name *</InputLabel>
                  <TextField
                    id="firstName"
                    name="firstName"
                    placeholder="First Name *"
                    value={investor.firstName}
                    fullWidth
                    autoComplete="given-name"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Middle Name</InputLabel>
                  <TextField
                    id="middlename"
                    name="middlename"
                    placeholder="Middle Name"
                    value={investor.middleName}
                    fullWidth
                    autoComplete="middle-name"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
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
                </Box>
              </Stack>
            </Grid>
            {/* <Grid item xs={12}>
              <Stack spacing={0.5}></Stack>
            </Grid> */}
            <Grid item xs={12}>
              <Stack spacing={10} direction={'row'}>
                <Box width={'30%'}>
                  <InputLabel>Date of birth *</InputLabel>
                  <TextField
                    id="birthday"
                    name="birthday"
                    placeholder="Date of birth *"
                    value={investor.dob}
                    fullWidth
                    autoComplete="date-birth"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Country *</InputLabel>
                  <TextField
                    id="country"
                    name="country"
                    placeholder="Country *"
                    value={investor.country}
                    fullWidth
                    autoComplete="country"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Country of birth</InputLabel>
                  <TextField
                    id="countryBirth"
                    name="countryBirth"
                    placeholder="Country of birth *"
                    value={investor.countryOfBirth}
                    fullWidth
                    autoComplete="country-birth"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={10} direction={'row'}>
                <Box width={'30%'}>
                  <InputLabel>State of birth *</InputLabel>
                  <TextField
                    id="stateBirth"
                    name="stateBirth"
                    placeholder="State of birth *"
                    value={investor.stateOfBirth}
                    fullWidth
                    autoComplete="state-birth"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Place of Birth *</InputLabel>
                  <TextField
                    id="birthPlace"
                    name="birthPlace"
                    placeholder="Place of Birth *"
                    value={investor.placeOfBirth}
                    fullWidth
                    autoComplete="birth-place"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Phone *</InputLabel>
                  <TextField
                    id="phone"
                    name="phone"
                    placeholder="Phone *"
                    value={investor.phone}
                    fullWidth
                    autoComplete="phone"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={10} direction={'row'}>
                <Box width={'30%'}>
                  <InputLabel>Tin *</InputLabel>
                  <TextField
                    id="tin"
                    name="tin"
                    placeholder="Tin *"
                    value={investor.tin}
                    fullWidth
                    autoComplete="tin"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Gender *</InputLabel>
                  <TextField
                    id="gender"
                    name="gender"
                    placeholder="Gender *"
                    value={investor.gender}
                    fullWidth
                    autoComplete="gender"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box width={'30%'}>
                  <InputLabel>Nationality *</InputLabel>
                  <TextField
                    id="nationality"
                    name="nationality"
                    placeholder="Nationality *"
                    value={investor.nationality}
                    fullWidth
                    autoComplete="nationality"
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
            {/* <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Status *</InputLabel>
                <Switch checked={investor.status} onChange={(ev, checked) => handleSubmit(checked)} color="success" />
              </Stack>
            </Grid> */}
            <Grid container item xs={12}>
              {loading ? (
                <CircularProgress color="success" />
              ) : (
                <>
                  <Image src={imageSrc} width={300} height={400} alt="Image" />
                  <Card sx={{ maxWidth: 345 }} style={{ margin: 10, width: '30%', height: '250px' }}>
                    <CardMedia sx={{ height: 140 }} image={imageSrc} title="green iguana" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {investor.docType} - {investor.docCountry}
                        <Chip style={{ width: 90 }} label="Pending" color="info" />
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              )}
            </Grid>
          </Grid>
        </MainCard>
      </Box>
    </Page>
  );
};

KYCDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KYCDetail;
