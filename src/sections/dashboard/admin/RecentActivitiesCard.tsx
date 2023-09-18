// material-ui
import { Stack } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import ActivityNotification from 'components/@extended/ActivityNotification';

// ==============================|| RECENT ACTIVITIES CARD ||============================== //

const RecentActivitesCard = () => {
  return (
    <MainCard title="Recent Activities">
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
    </MainCard>
  );
};

export default RecentActivitesCard;
