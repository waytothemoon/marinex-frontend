import { useState, ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import SumsubWebSdk from '@sumsub/websdk-react';

import Image from 'next/image';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project imports

import MainCard from 'components/MainCard';
import Layout from 'layout';
import Page from 'components/Page';

// step options

// ==============================|| KYC FORMS ||============================== //

const KYC = () => {
  const [accessToken, setAccessToken] = useState<string>('');
  const router = useRouter();

  const applicantEmail = '';
  const applicantPhone = '';
  useEffect(() => {
    fetch('/api/kyc/websdk').then(async (res) => {
      if (res.status === 200) {
        const { token } = await res.json();
        console.log(token);
        setAccessToken(token);
      }
    });
  }, [router]);

  return (
    <Page title="Forms Wizard">
      <Grid container spacing={2.5} justifyContent="center" mt={6}>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard>
            {accessToken ? (
              <SumsubWebSdk
                accessToken={accessToken}
                expirationHandler={() => Promise.resolve(accessToken)}
                config={{
                  lang: 'ru-RU',
                  email: applicantEmail,
                  phone: applicantPhone,
                  i18n: {
                    document: {
                      subTitles: {
                        IDENTITY: 'Upload a document that proves your identity'
                      }
                    }
                  },
                  onMessage: (type: any, payload: any) => {
                    console.log('WebSDK onMessage', type, payload);
                  },
                  uiConf: {
                    customCssStr:
                      ':root {\n  --black: #000000;\n   --grey: #F5F5F5;\n  --grey-darker: #B2B2B2;\n  --border-color: #DBDBDB;\n}\n\np {\n  color: var(--black);\n  font-size: 60px;\n  line-height: 24px;\n}\n\nsection {\n  margin: 40px auto;\n}\n\ninput {\n  color: var(--black);\n  font-weight: 600;\n  outline: none;\n}\n\nsection.content {\n  background-color: var(--grey);\n  color: var(--black);\n  padding: 40px 40px 16px;\n  box-shadow: none;\n  border-radius: 6px;\n}\n\nbutton.submit,\nbutton.back {\n  text-transform: capitalize;\n  border-radius: 6px;\n  height: 48px;\n  padding: 0 30px;\n  font-size: 16px;\n  background-image: none !important;\n  transform: none !important;\n  box-shadow: none !important;\n  transition: all 0.2s linear;\n}\n\nbutton.submit {\n  min-width: 132px;\n  background: none;\n  background-color: var(--black);\n}\n\n.round-icon {\n  background-color: var(--black) !important;\n  background-image: none !important;\n}'
                  },
                  onError: (error: any) => {
                    console.error('WebSDK onError', error);
                  }
                }}
                options={{ addViewportTag: false, adaptIframeHeight: true }}
                onMessage={(type: any, payload: any) => {
                  console.log('onMessage', type, payload);
                }}
                onError={(data: any) => console.log('onError', data)}
              />
            ) : (
              <Stack mt={6} spacing={3} alignItems="center" pt={6} pb={4} px={2}>
                <Image src={'/assets/images/kyc/back.svg'} alt="KYC picture" width={150} height={150} />
                <Typography variant="h3">Please wait while getting the information for Sumsub KYC verification</Typography>
              </Stack>
            )}
          </MainCard>
        </Grid>
      </Grid>
    </Page>
  );
};

KYC.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KYC;
