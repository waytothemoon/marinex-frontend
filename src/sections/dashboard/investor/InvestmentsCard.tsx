// material-ui
import { Box, Button, Card, Grid, Link, Stack, Typography } from '@mui/material';

// next
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import numberFormat from 'utils/numberFormat';

// ==============================|| INVESTMENTS CARD ||============================== //

const InvestmentsCard = () => {
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    fetch('/api/investment').then(async (res) => {
      if (res.status === 200) {
        const { total } = await res.json();
        setCurrentValue(total.investment);
      }
    });
  }, []);

  return (
    <Card
      style={{
        background: 'linear-gradient(128.81deg, #3E2C9C 7.24%, #77CFE0 104.08%)',
        height: '213px',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24
      }}
    >
      <Stack justifyContent="space-between" height="100%">
        <Box>
          <Typography variant="body2" color="whitesmoke">
            Current Value
          </Typography>
          <Typography variant="h2" fontWeight={700} color="white" mb={1}>
            $ {numberFormat(currentValue)}
          </Typography>
        </Box>
        <Grid container width="100%">
          <Grid item xs={12}>
            <NextLink href="/projects" passHref legacyBehavior>
              <Link color="#262626">
                <Button variant="contained" fullWidth color="inherit" style={{ fontWeight: 'bold' }}>
                  Invest more
                </Button>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default InvestmentsCard;
