import { useEffect, useState } from 'react';

// material-ui
import { Box, Card, Divider, Stack, Typography } from '@mui/material';

// assets
import * as antColors from '@ant-design/colors';

// ==============================|| BALANCE CARD - MY WALLET - INVESTOR ||============================== //

type BalanceData = {
  balance?: number;
  handleSend?: () => {};
};

const ProjectBalanceCard = (props: BalanceData) => {
  const [total, setTotal] = useState<any>({});

  useEffect(() => {
    fetch('/api/investment').then(async (res) => {
      if (res.status === 200) {
        const { total } = await res.json();
        setTotal(total);
      }
    });
  }, []);

  return (
    <Card
      style={{
        background: `linear-gradient(135deg, ${antColors.green[4]} 30%, ${antColors.green[6]})`,
        paddingTop: 48,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        height: '100%'
      }}
    >
      <Stack direction="row" mb={1} justifyContent="space-between" alignItems="center">
        <Box color="white">
          <Typography variant="body1">Total raised</Typography>
          <Typography variant="h2">$ {Number(total.fundraising).toFixed(2)}</Typography>
        </Box>
      </Stack>

      <Divider orientation="horizontal" flexItem style={{ height: '10px' }} />

      <Stack direction="row" mt={3} justifyContent="space-between" alignItems="center">
        <Box color="white">
          <Typography variant="body1">Revenue & Rewards Given</Typography>
          <Typography variant="h2">$ {Number(total.rewards).toFixed(2)}</Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default ProjectBalanceCard;
