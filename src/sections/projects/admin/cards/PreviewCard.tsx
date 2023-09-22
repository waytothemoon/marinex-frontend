// material-ui
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import numberFormat from 'utils/numberFormat';

// ==============================|| PREVIEW CARD ||============================== //
type Props = {
  projectName?: string;
  projectImage?: string;
  valuation?: number;
  estimatedEarning?: number;
  matPrice?: number;
};

const PreviewCard = (props: Props) => {
  return (
    <Card style={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="150"
        image={`${process.env.SHIPFINEX_BACKEND_URL}${props.projectImage}`}
        alt="green iguana"
        title="Ship Rozer"
      />
      <Box position="absolute" color="white" top={122} pl={2} bgcolor="#00000040" width="100%">
        <Typography variant="h4" fontWeight={800}>
          {props.projectName}
        </Typography>
      </Box>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Valuation
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              ${props.valuation?.toLocaleString()}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Est. IRR
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {props.estimatedEarning} %
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Token price
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              $ {numberFormat(props.matPrice ? props.matPrice : 0)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
