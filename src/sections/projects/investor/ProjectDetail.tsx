import { EyeOutlined } from '@ant-design/icons';
import { Box, Button, CircularProgress, Grid, InputAdornment, Slider, Stack, TextField, Typography, Link, useTheme } from '@mui/material';
import { useCurrentBalance } from 'hooks/useCurrentBalance';
import { useRouter } from 'next/router';

import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import { ThemeMode } from 'types/config';
import numberFormat from 'utils/numberFormat';

function PropertyBox({ label, value }: { label: string; value: string | number }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      px={2}
      py={1.5}
      bgcolor={theme.palette.mode === ThemeMode.DARK ? 'GrayText' : theme.palette.background.default}
      borderRadius={2}
    >
      <Typography color={'text.secondary'}>{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

function PropertyDocument({ label, value }: { label: string; value: string | number }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      px={2}
      py={1.5}
      bgcolor={theme.palette.mode === ThemeMode.DARK ? 'GrayText' : theme.palette.background.default}
      borderRadius={2}
    >
      <Typography color={'text.secondary'}>{label}</Typography>
      <Link href={`${process.env.SHIPFINEX_BACKEND_URL}${value}`} target="_blank">
        <EyeOutlined style={{ color: theme.palette.primary.main }} aria-label="Review" title="Review" />
      </Link>
    </Stack>
  );
}

export default function ProjectDetail() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<any>({});
  const [usdValue, setUsdValue] = useState<number>(0);
  const [numberOfTokens, setNumberOfTokens] = useState<number>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [others, setOthers] = useState<any>({});
  const router = useRouter();

  const { balance } = useCurrentBalance();

  const handleSubmit = () => {
    if (usdValue >= Number(project.tokenization.minimumInvestment)) {
      if (balance >= usdValue) {
        setSubmitting(true);
        fetch(`/api/invest?projectId=${project._id}&amount=${usdValue}`).then((res) => {
          if (res.status === 200) {
            enqueueSnackbar(`Successfully invested.`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
          } else {
            enqueueSnackbar(`Invest failed.`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
          }
          setSubmitting(false);
        });
      } else {
        enqueueSnackbar(`You balance is smaller than invest amount.`, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' }
        });
      }
    } else {
      enqueueSnackbar(`Invest amount is smaller than minium.`, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
    }
  };

  const handleTokensChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNumberOfTokens(Number(ev.currentTarget.value));
    setUsdValue(Number(ev.currentTarget.value) * (project.tokenization.assetValue / project.tokenization.tonnage / 1000));
  };

  const handleUsdChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setUsdValue(Number(ev.currentTarget.value));
    setNumberOfTokens(
      Number((Number(ev.currentTarget.value) / (project.tokenization.assetValue / project.tokenization.tonnage / 1000)).toFixed(0))
    );
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/project/${router.query.projectId}`)
      .then(async (res) => {
        if (res.status === 200) {
          const { _doc: data, ...others } = await res.json();
          setOthers(others);
          setProject(data);
          setLoading(false);
          setUsdValue(Number(data.tokenization.minimumInvestment));
          setNumberOfTokens(
            Number(data.tokenization.minimumInvestment / (data.tokenization.assetValue / data.tokenization.tonnage / 1000))
          );
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Stack alignItems="center">
        <CircularProgress color="primary" />
      </Stack>
    );

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="stretch">
        <Grid item xs={12} md={6} lg={4}>
          <Stack borderRadius={4} border="1px solid #d0d0d0" px={3} py={3} spacing={2}>
            <Typography variant="h1">{project.projectName}</Typography>
            <Box width="100%">
              <img src={`${process.env.SHIPFINEX_BACKEND_URL}${project.projectImage}`} alt="ship" style={{ width: '100%' }} />
            </Box>
            <Stack>
              <Typography variant="body2">Fund Raising Status</Typography>
              <Box mt={4} pl={3}>
                <Slider
                  value={others.investments}
                  valueLabelFormat={(value) => `$ ${numberFormat(value)}`}
                  max={project.tokenization.tonnage * 10 * project.tokenization.offeringPercentage}
                  min={0}
                  disabled
                  valueLabelDisplay="on"
                  marks={[
                    { value: 0, label: '0' },
                    {
                      value: project.tokenization.tonnage * 10 * project.tokenization.offeringPercentage || 0,
                      label: `$${project.tokenization.tonnage * 10 * project.tokenization.offeringPercentage || 0}`
                    }
                  ]}
                />
              </Box>
            </Stack>
            <Stack spacing={1}>
              <Typography>Number of Token(s)</Typography>
              <Stack direction="row" spacing={2}>
                <TextField type="number" placeholder="Number of token(s)" value={numberOfTokens} onChange={handleTokensChange} fullWidth />
                <TextField
                  type="number"
                  inputProps={{ min: project.tokenization.minimumInvestment }}
                  placeholder="USD value"
                  value={usdValue}
                  onChange={handleUsdChange}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" maxWidth={240}>
                <Typography fontSize={16}>Your balance :</Typography>
                <Typography fontSize={16} fontWeight="bold">
                  $ {numberFormat(balance)}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" maxWidth={240}>
                <Typography fontSize={16}>Minium Investment :</Typography>
                <Typography fontSize={16} fontWeight="bold">
                  $ {numberFormat(project.tokenization.minimumInvestment)}
                </Typography>
              </Stack>
            </Stack>
            <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
              Buy now
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Stack borderRadius={4} border="1px solid #d0d0d0" px={2.5} py={3} spacing={2}>
                <Stack direction="row" justifyContent="space-between" py={1.5}>
                  <Typography>Token name</Typography>
                  <Typography fontWeight="bold" fontSize="larger">
                    {project.tokenization.tokenName}
                  </Typography>
                </Stack>
                <PropertyBox label="Token(s)" value={numberFormat(project.tokenization.tonnage * 1000)} />
                <PropertyBox
                  label="Offering size"
                  value={numberFormat(project.tokenization.tonnage * 10 * project.tokenization.offeringPercentage)}
                />

                <Stack direction="row" justifyContent="space-between" py={1.5}>
                  <Typography>Valuation</Typography>
                  <Typography fontWeight="bold" fontSize="larger">
                    $ {numberFormat(project.tokenization.assetValue)}
                  </Typography>
                </Stack>
                <PropertyBox label="IMO number" value={project.imoNumber} />
                <PropertyBox label="Vessel type" value={project.vesselType} />
                <PropertyBox label="Capacity" value={numberFormat(project.tokenization.tonnage)} />
                <PropertyBox label="Owner" value={project.projectOwner.firstName} />
                <PropertyBox label="Flag" value={project.flag} />
                <PropertyBox label="Year of built" value={new Date(project.builtYear).getFullYear()} />
              </Stack>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stack px={2.5} py={3} spacing={2} borderRadius={4} border="1px solid #d0d0d0">
                <Stack direction="row" justifyContent="space-between" py={1.5}>
                  <Typography>Documents</Typography>
                </Stack>
                <PropertyDocument label="Technical Report" value={project.documents.technicalReport} />
                <PropertyDocument label="Financial Report" value={project.documents.financialReport} />
                <PropertyDocument label="Commercial Report" value={project.documents.commercialReport} />
                <PropertyDocument label="Risk" value={project.documents.risk} />
                <PropertyDocument label="Community" value={project.documents.community} />
                <PropertyDocument label="Vessel Certificate" value={project.documents.vesselCertificate} />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
