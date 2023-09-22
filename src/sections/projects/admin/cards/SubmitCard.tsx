import { useState } from 'react';

// next
import { useSession } from 'next-auth/react';

// material-ui
import { Button, CardContent, Divider, MenuItem, Select, SelectChangeEvent, Stack, Typography, useTheme } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

// ==============================|| PREVIEW CARD ||============================== //

type Log = {
  action: string;
  date: Date;
};

type Props = {
  data: any;
  logs?: Log[];
};

const SubmitCard = (props: Props) => {
  const [newStatus, setNewStatus] = useState<number>(props.data.allowance || 0);
  const { data: session } = useSession();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const theme = useTheme();

  const handleStatusChange = (ev: SelectChangeEvent) => {
    setNewStatus(Number(ev.target.value));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    axios.defaults.headers.common = { Authorization: `bearer ${session?.token.accessToken as string}` };
    axios
      .post(`/api/v1/project/${props.data._id}/submit`, { allowance: newStatus })
      .then(() => {
        setSubmitting(false);
        enqueueSnackbar('Project submitted successfully.', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
      })
      .catch((error) => {
        setSubmitting(false);
        enqueueSnackbar('Project submission failed.', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
      });
  };

  return (
    <MainCard style={{ border: '1px solid grey', borderRadius: '15px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Project Status</Typography>
        <Typography
          variant="h4"
          color={
            props.data.allowance === 1
              ? theme.palette.success.main
              : props.data.allowance === 2
              ? theme.palette.error.main
              : theme.palette.warning.main
          }
        >
          {props.data.allowance === 1 ? 'Approved' : props.data.allowance === 2 ? 'Rejected' : 'Pending'}
        </Typography>
      </Stack>
      <Divider style={{ marginTop: 16 }} />
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary" width={200}>
              Project Name
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {props.data.projectName}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary" width={200}>
              Status
            </Typography>
            <Select
              fullWidth
              value={newStatus.toString()}
              onChange={handleStatusChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Project Owner Statistics Filter' }}
            >
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Approve</MenuItem>
              <MenuItem value={2}>Reject</MenuItem>
            </Select>
          </Stack>
          <Divider />
          <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </CardContent>
    </MainCard>
  );
};

export default SubmitCard;
