// material-ui
import { Button, Chip, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { CopyOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

// ==============================|| BALANCE CARD - MY WALLET - INVESTOR ||============================== //

type BalanceData = {
  totalMRN?: number;
  totalUSD?: number;
  walletAddress?: string;
  handleBuy?: () => {};
  handleSend?: () => {};
  handleReceive?: () => {};
};

const BalanceCard = (props: BalanceData) => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(props.walletAddress || 'no wallet');
  };

  return (
    <MainCard style={{ backgroundColor: antColors.blue[5], color: 'white' }}>
      <Stack spacing={2}>
        <Typography>Total Balance</Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="h3">{props.totalMRN?.toLocaleString() || 0}</Typography>
          <Chip
            label={`$ ${props.totalUSD?.toLocaleString() || 0}`}
            style={{
              width: 'max-content',
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: 'grey',
              border: '1px solid white',
              fontSize: 16
            }}
            size="medium"
          />
        </Stack>
        <Stack direction={matchDownSM ? 'column-reverse' : 'row'} spacing={2} alignItems={matchDownSM ? 'start' : 'center'}>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" style={{ backgroundColor: 'white', color: 'black' }}>
              Buy
            </Button>
            <Button variant="outlined" color="inherit">
              Send
            </Button>
            <Button variant="outlined" color="inherit">
              Receive
            </Button>
          </Stack>
          <Button
            variant="contained"
            style={{ backgroundColor: '#ffffff20', height: 'max-content', borderRadius: 16 }}
            onClick={handleCopyClipboard}
          >
            <Typography mr={1} noWrap width="100%" overflow="hidden">
              {props.walletAddress}
            </Typography>
            <CopyOutlined />
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default BalanceCard;
