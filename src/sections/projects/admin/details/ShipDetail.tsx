// material-ui
import { Grid, Stack, Typography, InputLabel } from '@mui/material';

import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

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
  projectType?: boolean;
  fundSTDate?: Date;
  fundEDDate?: Date;
  tradingSTDate?: Date;
  tradingEDDate?: Date;
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
        {shipDetail.projectType && (
          <>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Fundraising Duration * (UTC-Timezone)</InputLabel>
                <DateRangePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  id="tradingDuration"
                  name="tradingDuration"
                  size="lg"
                  value={[
                    shipDetail.fundSTDate ? shipDetail.fundSTDate : new Date(),
                    shipDetail.fundEDDate ? shipDetail.fundEDDate : new Date()
                  ]}
                  readOnly
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.5}>
                <InputLabel>Trading Duration * (UTC-Timezone)</InputLabel>
                <DateRangePicker
                  format="yyyy-MM-dd HH:mm:ss"
                  id="tradingDuration"
                  name="tradingDuration"
                  size="lg"
                  value={[
                    shipDetail.tradingSTDate ? shipDetail.tradingSTDate : new Date(),
                    shipDetail.tradingEDDate ? shipDetail.tradingEDDate : new Date()
                  ]}
                  readOnly
                />
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
