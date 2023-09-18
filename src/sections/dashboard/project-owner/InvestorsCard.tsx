// material-ui
import { Box, Card, Divider, Stack, Typography } from '@mui/material';

// assets
import { UserAddOutlined, UserDeleteOutlined, TeamOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

// ==============================|| INVESTMENTS CARD ||============================== //

const InvestorsCard = () => {
  return (
    <Card
      style={{
        background: 'linear-gradient(45deg, #e6f7ff, #ffffff)',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 24,
        paddingRight: 24,
        height: '100%'
      }}
    >
      <Stack justifyContent="space-between" height="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="grey" variant="body2" my={1}>
              Total Investors
            </Typography>
            <Typography color="grey" variant="h4">
              0
            </Typography>
          </Box>
          <TeamOutlined style={{ color: antColors.blue[4], fontSize: 24 }} />
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="grey" variant="body2" my={1}>
              Inactive Investors
            </Typography>
            <Typography color="grey" variant="h4">
              0
            </Typography>
          </Box>
          <UserDeleteOutlined style={{ color: antColors.red[4], fontSize: 24 }} />
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography color="grey" variant="body2" my={1}>
              Active Investors
            </Typography>
            <Typography color="grey" variant="h4">
              0
            </Typography>
          </Box>
          <UserAddOutlined style={{ color: antColors.green[4], fontSize: 24 }} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default InvestorsCard;
