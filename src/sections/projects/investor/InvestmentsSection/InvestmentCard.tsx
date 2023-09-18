// material-ui
import { Box, Card, Chip, Stack, Typography } from '@mui/material';

// assets
import { CaretUpFilled } from '@ant-design/icons';

// ==============================|| INVESTMENTS CARD ||============================== //

const InvestmentCard = () => {
  return (
    <Card>
      <Stack direction="row">
        <Box
          style={{
            background: 'url(https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg)',
            width: 100,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          <Chip label="Open" color="warning" size="small" style={{ position: 'absolute', right: 10, bottom: 10, color: 'white' }} />
        </Box>
        <Stack spacing={2} flexGrow={1} px={2} py={3}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Offshore Supply Vessel</Typography>
            <Typography fontWeight={600}>Ship Rozer</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Offering Size</Typography>
            <Typography fontWeight={800}>$10,000,000</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography fontWeight={800}>$1000.00</Typography>
              <Typography variant="body2" color="textSecondary">
                Purchase Price
              </Typography>
            </Box>
            <Box px={1.5} py={1} bgcolor="success.lighter" borderRadius={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight={800} color="success.dark">
                  $1000.00
                </Typography>
                <CaretUpFilled style={{ color: '#26B56E' }} />
              </Stack>
              <Typography variant="body2" color="success.dark">
                Current Price
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default InvestmentCard;
