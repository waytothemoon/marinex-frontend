// material-ui
import { Stack, Typography } from '@mui/material';

// assets
import { BellOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

// ==============================|| ACTIVITY NOTIFICATION ||============================== //

const ActivityNotification = () => {
  return (
    <Stack direction="row" alignItems="center" bgcolor={antColors.grey[5]} px={2} py={1} borderRadius={1}>
      <BellOutlined style={{ color: antColors.blue[3], fontSize: 18, paddingRight: 16 }} />
      <Stack>
        <Typography fontWeight={800} color={antColors.blue[3]}>
          {'gold ship'} - {'deploySecurityToken'}
        </Typography>
        <Typography fontStyle="italic" fontWeight={800} color={antColors.blue[3]}>
          Initiated by - {'Test Prowner'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date().toDateString()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ActivityNotification;
