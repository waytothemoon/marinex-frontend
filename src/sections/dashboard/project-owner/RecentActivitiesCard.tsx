// material-ui
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

// project imports
import ActivityNotification from 'components/@extended/ActivityNotification';

// ==============================|| RECENT ACTIVITIES CARD ||============================== //

const RecentActivitesCard = () => {
  return (
    <Card>
      <CardHeader title={<Typography variant="h3">Recent Activities</Typography>} />
      <CardContent>
        <Stack height={418} overflow="auto" spacing={0.5} pr={0.5}>
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
          <ActivityNotification />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecentActivitesCard;
