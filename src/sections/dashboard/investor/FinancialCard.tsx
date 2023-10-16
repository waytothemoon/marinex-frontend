import { useState } from 'react';

// material-ui
import { Box, Button, Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';

// assets
import { ArrowDownOutlined, ArrowUpOutlined, SyncOutlined } from '@ant-design/icons';

// project imports
import DepositDialog from 'components/dialogs/DepositDialog';
import { useCurrentBalance } from 'hooks/useCurrentBalance';
import numberFormat from 'utils/numberFormat';
import Image from 'next/image';
// ==============================|| FINANCIAL CARD ||============================== //

const FinancialCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { balance, isLoading, refresh } = useCurrentBalance();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    refresh();
  };

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
          background: 'linear-gradient(128deg, #3E2C9CE0 0%, #77CFE0B0 100%)',
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
            <Typography color="whitesmoke">Total Balance</Typography>
            <Typography variant="h2" fontWeight={700} color="white" mb={3}>
              $ {numberFormat(balance)}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Refresh">
              {!isLoading ? (
                <IconButton style={{ borderRadius: '100px', color: 'white' }} onClick={handleRefresh}>
                  <SyncOutlined />
                </IconButton>
              ) : (
                <IconButton style={{ borderRadius: '100px', color: 'white' }}>
                  <CircularProgress size={18} color="inherit" />
                </IconButton>
              )}
            </Tooltip>
          </Box>
        </Stack>
        <Box position="absolute" left="50%" bottom="17px" overflow="hidden" style={{ translate: '-50%' }}>
          <Image src="/assets/images/Union.png" alt="Union" height={44} width={301} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="text"
              fullWidth
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'black',
                fontWeight: 'bold',
                background: 'white',
                borderRadius: '100px',
                height: '44px',
                padding: 3
              }}
              onClick={handleClickOpen}
            >
              <Box
                width="36px"
                height="36px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="black"
                borderRadius="100px"
                style={{ fontSize: '17px', color: 'white' }}
              >
                <ArrowUpOutlined />
              </Box>
              <Typography fontWeight="bold" style={{ width: 'calc(100% - 40px)' }} pr={3}>
                Deposit
              </Typography>
            </Button>
            <DepositDialog open={open} handleClose={handleClose} />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="text"
              fullWidth
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'black',
                fontWeight: 'bold',
                background: 'white',
                borderRadius: '100px',
                height: '44px',
                padding: 3
              }}
            >
              <Typography
                fontWeight="bold"
                style={{ width: 'calc(100% - 40px)' }}
                textAlign={{ xl: 'center', lg: 'right', xs: 'center' }}
                pl={{ xs: 3, md: 0, xl: 2 }}
              >
                Withdraw
              </Typography>
              <Box
                width="36px"
                height="36px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="black"
                borderRadius="100px"
                style={{ fontSize: '17px', color: 'white' }}
              >
                <ArrowDownOutlined />
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default FinancialCard;
