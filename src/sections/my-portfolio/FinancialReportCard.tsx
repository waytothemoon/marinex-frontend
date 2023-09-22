// material-ui
import { Card, Grid, Stack, Typography } from '@mui/material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //
import numberFormat from 'utils/numberFormat';
interface Props {
  title: string;
  count: string;
  color?: 'invest' | 'balance' | 'reward';
}

const FinancialReportCard = ({ color, title, count }: Props) => (
  <Card
    style={{
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 24,
      paddingBottom: 24,
      background: `${
        color === 'invest'
          ? 'linear-gradient(90deg, #003a8c, #1890ff)'
          : color === 'balance'
          ? 'linear-gradient(90deg, #faad14, #ffe066)'
          : 'linear-gradient(90deg, #237804, #95de64)'
      }`
    }}
  >
    <Stack spacing={0.5}>
      <Typography variant="h6" color="white">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h3" fontWeight={700} color="white">
            $ {numberFormat(Number(count))}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  </Card>
);

FinancialReportCard.defaultProps = {
  color: 'primary'
};

export default FinancialReportCard;
