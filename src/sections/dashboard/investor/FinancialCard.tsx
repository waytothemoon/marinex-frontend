import { useState } from 'react';

// material-ui
import { Box, Button, Card, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';

// assets
import { ArrowDownOutlined, ArrowUpOutlined, SyncOutlined } from '@ant-design/icons';

// project imports
import DepositDialog from 'components/dialogs/DepositDialog';
import { useCurrentBalance } from 'hooks/useCurrentBalance';
import numberFormat from 'utils/numberFormat';
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
          <svg width="301" height="44" viewBox="0 0 301 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M152.805 19C155.596 19 157.958 17.0406 159.093 14.4914C162.613 6.58512 170.204 0 179 0H279C291.15 0 301 9.84973 301 22C301 34.1503 291.15 44 279 44H179C170.787 44 163.626 38.0671 159.846 30.958C158.636 28.6812 156.399 27 153.821 27H147.179C144.601 27 142.364 28.6812 141.154 30.958C137.374 38.0671 130.213 44 122 44H22C9.84973 44 0 34.1503 0 22C0 9.84973 9.84973 0 22 0H122C130.796 0 138.387 6.58512 141.907 14.4914C143.042 17.0406 145.404 19 148.195 19H152.805Z"
              fill="white"
            />
          </svg>
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
              <Typography fontWeight="bold" style={{ width: 'calc(100% - 40px)' }} pl={3}>
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
