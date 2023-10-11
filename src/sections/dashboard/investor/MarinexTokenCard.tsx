// material-ui
import { Box, Button, Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography, Link } from '@mui/material';

// assets
import { ArrowDownOutlined, ArrowUpOutlined, SyncOutlined } from '@ant-design/icons';

// project imports
import DepositDialog from 'components/dialogs/DepositDialog';
import numberFormat from 'utils/numberFormat';

import NextLink from 'next/link';

// ==============================|| FINANCIAL CARD ||============================== //

const MarinexTokenCard = () => {
  return (
    <Card
      style={{
        background: 'url(/images/card_bg.png)',
        backgroundSize: '150%, 150%',
        backgroundPosition: '50%',
        height: '100%'
      }}
    >
      <Box
        style={{
          background: 'linear-gradient(128deg, #000000E0 0%, #000000B0 100%)',
          height: '213px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
        sx={{ padding: { md: '24px', xs: '24px 12px' } }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="h2" fontWeight={700} color="white">
              Marinex
            </Typography>
            <Typography variant="h2" fontWeight={700} color="white">
              Tokenisation
            </Typography>
            <Typography fontSize={14} fontWeight={400} color="#979797" mb={3}>
              Now you can be a ship owner too and be part of the $4.2 trillion industry by 2031.
            </Typography>
          </Box>
        </Stack>
        <Box position="absolute" left="50%" bottom="17px" overflow="hidden" style={{ translate: '-50%' }}></Box>
        <Grid container spacing={2} justifyContent={'flex-end'}>
          <NextLink href="/signin" passHref legacyBehavior>
            <Link variant="body1" color="#4c99f3" fontWeight={700} fontSize={14}>
              Show More
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 15 }}>
                <path
                  d="M11.9999 1.05C11.9999 0.784784 11.8946 0.530429 11.707 0.342893C11.5195 0.155357 11.2652 0.0500002 10.9999 0.0500002L2.99994 0C2.73472 0 2.48037 0.105357 2.29283 0.292893C2.1053 0.48043 1.99994 0.734784 1.99994 1C1.99994 1.26522 2.1053 1.51957 2.29283 1.70711C2.48037 1.89464 2.73472 2 2.99994 2H8.55994L0.289939 10.29C0.196211 10.383 0.121816 10.4936 0.0710478 10.6154C0.0202791 10.7373 -0.00585938 10.868 -0.00585938 11C-0.00585938 11.132 0.0202791 11.2627 0.0710478 11.3846C0.121816 11.5064 0.196211 11.617 0.289939 11.71C0.382902 11.8037 0.493503 11.8781 0.615362 11.9289C0.737221 11.9797 0.867927 12.0058 0.999939 12.0058C1.13195 12.0058 1.26266 11.9797 1.38452 11.9289C1.50638 11.8781 1.61698 11.8037 1.70994 11.71L9.99994 3.42V9C9.99994 9.26522 10.1053 9.51957 10.2928 9.70711C10.4804 9.89464 10.7347 10 10.9999 10C11.2652 10 11.5195 9.89464 11.707 9.70711C11.8946 9.51957 11.9999 9.26522 11.9999 9V1.05Z"
                  fill="#4C99F3"
                />
              </svg>
            </Link>
          </NextLink>
        </Grid>
      </Box>
    </Card>
  );
};

export default MarinexTokenCard;
