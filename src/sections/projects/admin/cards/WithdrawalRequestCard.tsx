import { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, Slider, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import numberFormat from 'utils/numberFormat';

// ==============================|| PREVIEW CARD ||============================== //

type Props = {
  projectId: string;
  projectName?: string;
  imoNumber?: number;
  fundRaising?: number;
  offering?: number;
  requested?: boolean;
};

const WithdrawalRequestCard = (props: Props) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handleApprove = () => {
    setSubmitting(true);
    fetch(`/api/project/withdraw/submit?projectId=${props.projectId}&status=${true}`).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar('Successfully submitted.', { anchorOrigin: { horizontal: 'right', vertical: 'top' }, variant: 'success' });
      } else {
        enqueueSnackbar('Submission failed.', { anchorOrigin: { horizontal: 'right', vertical: 'top' }, variant: 'error' });
      }
      setSubmitting(false);
    });
  };

  const handleReject = () => {
    setSubmitting(true);
    fetch(`/api/project/withdraw/submit?projectId=${props.projectId}&status=${false}`).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar('Successfully submitted.', { anchorOrigin: { horizontal: 'right', vertical: 'top' }, variant: 'success' });
      } else {
        enqueueSnackbar('Submission failed.', { anchorOrigin: { horizontal: 'right', vertical: 'top' }, variant: 'error' });
      }
      setSubmitting(false);
    });
  };

  return (
    <Card style={{ position: 'relative' }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography color="text.secondary">Project</Typography>
              <Typography variant="h3">{props.projectName || 'Unknown'}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary">IMO Number</Typography>
              <Typography variant="h3">{props.imoNumber || 'Unknown'}</Typography>
            </Box>
          </Stack>
          <Typography variant="body2" pl={1} color="text.secondary">
            Fund Raising Status
          </Typography>
          <Box pt={3} px={1.5}>
            <Slider
              value={props.fundRaising}
              valueLabelFormat={(value) => `$ ${numberFormat(value)}`}
              max={props.offering}
              min={0}
              disabled
              valueLabelDisplay="on"
              marks={[
                { value: 0, label: '0' },
                { value: props.offering || 0, label: `$${props.offering || 0}` }
              ]}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button color="error" fullWidth variant="contained" disabled={!props.requested || isSubmitting} onClick={handleReject}>
              Reject
            </Button>
            <Button color="success" fullWidth variant="contained" disabled={!props.requested || isSubmitting} onClick={handleApprove}>
              Approve
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WithdrawalRequestCard;
