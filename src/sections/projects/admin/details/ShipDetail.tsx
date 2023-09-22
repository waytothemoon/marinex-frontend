// material-ui
import { Grid, Stack, Typography } from '@mui/material';

import numberFormat from 'utils/numberFormat';

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //
export type ShipDetail = {
  projectImage?: string;
  projectName?: string;
  description?: string;
  imoNumber?: string;
  offeringSize?: number;
  openTill?: Date;
  vesselType?: string;
  capacity?: number;
  builtYear?: string;
  flag?: string;
};

interface ShipDetailFormProps {
  shipDetail: ShipDetail;
}

export default function ShipDetailForm({ shipDetail }: ShipDetailFormProps) {
  return (
    <>
      <Grid container spacing={2}>
        {/* <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              width={100}
              height={100}
              style={{
                backgroundImage: `url(${process.env.SHIPFINEX_BACKEND_URL}${shipDetail.projectImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 100
              }}
            />
            <Typography variant="h4">{shipDetail.projectName}</Typography>
          </Stack>
        </Grid> */}
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              Project Description
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              {shipDetail.description}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              IMO Number
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              {shipDetail.imoNumber}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              Offering Size
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              $ {numberFormat(Number(shipDetail.offeringSize))}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              Vessel Type
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              {shipDetail.vesselType}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              Capacity
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              {numberFormat(Number(shipDetail.capacity))} t
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              Build
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              {new Date(shipDetail.builtYear as string).getFullYear()}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography color="text.secondary" width={200}>
              Flag
            </Typography>
            <Typography fontWeight={600} flexGrow={1}>
              {shipDetail.flag}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
