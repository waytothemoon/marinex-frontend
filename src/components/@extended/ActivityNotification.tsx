// material-ui
import { Stack, Typography, useTheme } from '@mui/material';

// assets
import { BellOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';
import { ThemeMode } from 'types/config';

// ==============================|| ACTIVITY NOTIFICATION ||============================== //

const ActivityNotification = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      bgcolor={theme.palette.mode === ThemeMode.DARK ? antColors.grey[5] : antColors.blue[5]}
      px={2}
      py={1}
      borderRadius={1}
    >
      <BellOutlined
        style={{ color: theme.palette.mode === ThemeMode.DARK ? antColors.blue[3] : 'white', fontSize: 18, paddingRight: 16 }}
      />
      <Stack>
        <Typography fontWeight={800} color={theme.palette.mode === ThemeMode.DARK ? antColors.blue[3] : 'white'}>
          {'gold ship'} - {'deploySecurityToken'}
        </Typography>
        <Typography fontStyle="italic" fontWeight={800} color={theme.palette.mode === ThemeMode.DARK ? antColors.blue[3] : 'white'}>
          Initiated by - {'Test Prowner'}
        </Typography>
        <Typography variant="body2" color={theme.palette.mode === ThemeMode.DARK ? 'textSecondary' : 'white'}>
          {new Date().toDateString()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ActivityNotification;
