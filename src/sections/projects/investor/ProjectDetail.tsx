import { EyeOutlined } from '@ant-design/icons';
import { Box, Button, CircularProgress, Grid, InputAdornment, Slider, Stack, TextField, Typography, Link } from '@mui/material';
import * as antColors from '@ant-design/colors';
import { useCurrentBalance } from 'hooks/useCurrentBalance';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';

function PropertyBox({ label, value }: { label: string; value: string | number }) {
  return (
    <Stack direction="row" justifyContent="space-between" px={1} py={1} bgcolor={'GrayText'} borderRadius={2}>
      <Typography color={'text.secondary'}>{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
}

function PropertyDocument({ label, value }: { label: string; value: string | number }) {
  return (
    <Stack direction="row" justifyContent="space-between" px={1} py={1} bgcolor={'GrayText'} borderRadius={2}>
      <Typography color={'text.secondary'}>{label}</Typography>
      <Link href={`${process.env.SHIPFINEX_BACKEND_URL}${value}`} target="_blank">
        <EyeOutlined style={{ color: antColors.blue[4] }} aria-label="Review" title="Review" />
      </Link>
    </Stack>
  );
}

export default function ProjectDetail() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<any>({});
  const [usdValue, setUsdValue] = useState<number>();
  const [numberOfTokens, setNumberOfTokens] = useState<number>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [others, setOthers] = useState<any>({});
  const router = useRouter();

  const { balance } = useCurrentBalance();

  const handleSubmit = () => {
    setSubmitting(true);
    fetch(`/api/invest?projectId=${project._id}&amount=${usdValue}`).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar(`Successfully invested.`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      } else {
        enqueueSnackbar(`Invest failed.`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      }
      setSubmitting(false);
    });
  };

  const handleTokensChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNumberOfTokens(Number(ev.currentTarget.value));
    setUsdValue(Number(ev.currentTarget.value) * (project.tokenization.assetValue / project.tokenization.tonnage / 1000));
  };

  const handleUsdChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setUsdValue(Number(ev.currentTarget.value));
    setNumberOfTokens(Number(ev.currentTarget.value) / (project.tokenization.assetValue / project.tokenization.tonnage / 1000));
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
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [router]);

  if (isLoading)
    return (
      <Stack alignItems="center">
        <CircularProgress color="primary" />
      </Stack>
    );

  return (
    <Box width="100%">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Stack borderRadius={2} border="1px solid grey" px={2} py={1.5} spacing={2}>
                <Typography variant="h1">{project.projectName}</Typography>
                <Image
                  src={`${process.env.SHIPFINEX_BACKEND_URL}${project.projectImage}`}
                  alt="ship"
                  width="100"
                  style={{ width: '100%' }}
                  height={300}
                />
                <Stack>
                  <Typography variant="body2">Fund Raising Status</Typography>
                  <Box mt={4} pl={3}>
                    <Slider
                      value={others.investments}
                      valueLabelFormat={(value) => `$ ${value}`}
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
                    <TextField placeholder="Number of token(s)" value={numberOfTokens} onChange={handleTokensChange} fullWidth />
                    <TextField
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
                <Typography variant="caption">
                  Your balance{' '}
                  <Typography variant="h5" component="span">
                    ${balance.toFixed(2)}
                  </Typography>
                </Typography>
                <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
                  Buy now (Minium Investment - {`$${project.tokenization.minimumInvestment}`})
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack spacing={2}>
                <Stack borderRadius={2} border="1px solid grey" px={2} py={1.5} spacing={2}>
                  <Stack direction="row" justifyContent="space-between" py={1.5}>
                    <Typography>Token name</Typography>
                    <Typography fontWeight="bold" fontSize="larger">
                      {project.tokenization.tokenName}
                    </Typography>
                  </Stack>
                  <PropertyBox label="Token(s)" value={project.tokenization.tonnage * 1000} />
                  <PropertyBox label="Offering size" value={project.tokenization.tonnage * 10 * project.tokenization.offeringPercentage} />

                  <Stack direction="row" justifyContent="space-between" py={1.5}>
                    <Typography>Valuation</Typography>
                    <Typography fontWeight="bold" fontSize="larger">
                      $ {project.tokenization.assetValue}
                    </Typography>
                  </Stack>
                  <PropertyBox label="IMO number" value={project.imoNumber} />
                  <PropertyBox label="Vessel type" value={project.vesselType} />
                  <PropertyBox label="Capacity" value={project.tokenization.tonnage} />
                  <PropertyBox label="Owner" value={project.projectOwner.firstName} />
                  <PropertyBox label="Flag" value={project.flag} />
                  <PropertyBox label="Year of built" value={new Date(project.builtYear).getFullYear()} />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Stack px={2} py={1.5} spacing={2}>
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
    </Box>
  );
}
