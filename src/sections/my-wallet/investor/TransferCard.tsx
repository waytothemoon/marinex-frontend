// third-party
import Web3 from 'web3';

// material-ui
import { Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material';

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

const TransferCard = (props: BalanceData) => {
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(Web3.utils.isAddress(props.walletAddress || '') ? props.walletAddress || '' : 'no wallet');
  };

  return (
    <MainCard style={{ borderRadius: '12px', backgroundColor: antColors.blue[5], color: 'white', height: '100%' }}>
      <Stack spacing={4} justifyContent="end" mt={7}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#ffffff20', height: 'max-content', borderRadius: 16 }}
            onClick={handleCopyClipboard}
          >
            {Web3.utils.isAddress(props.walletAddress || '') ? (
              <>
                <Typography mr={1} color="white" overflow="hidden">
                  {props.walletAddress}
                </Typography>
                <CopyOutlined style={{ color: 'white' }} />
              </>
            ) : (
              <Typography>You don&apos;t have a wallet. You will have your wallet when you make your first deposit.</Typography>
            )}
          </Button>
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
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default TransferCard;
