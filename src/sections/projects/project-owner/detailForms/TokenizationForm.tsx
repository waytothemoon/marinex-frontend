import { useState } from 'react';

// next
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

// material-ui
import { Button, Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

const validationSchema = yup.object({
  tokenName: yup.string().required('Token Name is required'),
  tokenSymbol: yup.string().required('Token Symbol is required'),
  tonnage: yup.number().positive('Invalid tonnage value').required('Tonnage is required'),
  assetValue: yup.number().positive('Invalid asset value').required('Asset Value is required'),
  tokenizingPercentage: yup
    .number()
    .positive('Invalid tokenizing %')
    .max(100, 'Invalid tokenizing %')
    .default(100)
    .required('Percentage of tokenizing is required'),
  offeringPercentage: yup
    .number()
    .positive('Invalid offering %')
    .lessThan(100, 'Must be less than 100%')
    .not([0], 'Invalid offering %')
    .required('Percentage of offering is required'),
  minimumInvestment: yup.number().required('Minimum Investment is required')
});

export type Tokenization = {
  tokenName?: string;
  tokenSymbol?: string;
  tokenized: boolean;
  decimal?: number;
  tonnage?: number;
  assetValue?: number;
  tokenizingPercentage?: number;
  offeringPercentage?: number;
  minimumInvestment?: number;
};

interface TokenizationFormProps {
  tokenization: Tokenization;
  setTokenization: (d: Tokenization) => void;
  projectId?: string;
}

export default function TokenizationForm({ tokenization, setTokenization, projectId }: TokenizationFormProps) {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      tokenized: tokenization.tokenized,
      tokenName: tokenization.tokenName,
      tokenSymbol: tokenization.tokenSymbol,
      tonnage: tokenization.tonnage,
      assetValue: tokenization.assetValue,
      tokenizingPercentage: tokenization.tokenizingPercentage || 100,
      offeringPercentage: tokenization.offeringPercentage,
      minimumInvestment: tokenization.minimumInvestment
    },

    validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);

      const tokenInfo = {
        tokenized: values.tokenized,
        tokenName: values.tokenName,
        tokenSymbol: values.tokenSymbol,
        decimal: 18,
        tonnage: values.tonnage,
        assetValue: values.assetValue,
        tokenizingPercentage: values.tokenizingPercentage,
        offeringPercentage: values.offeringPercentage,
        minimumInvestment: values.minimumInvestment
      };

      axios.defaults.headers.common = { Authorization: `bearer ${session?.token.accessToken as string}` };

      axios
        .post(`/api/v1/project/${projectId}/tokenization`, tokenInfo)
        .then(async (res) => {
          enqueueSnackbar('Tokenized successfully.', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
          });

          setTokenization(tokenInfo);
          router.push('/projects');
        })
        .catch((err) => {
          enqueueSnackbar('Tokenized failed.', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
          });
          setSubmitting(false);
          console.log(err);
        });
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} mb={2}>
            <Stack spacing={3.5} direction="row" alignItems="center">
              <InputLabel>Status</InputLabel>
              <Typography color={formik.values.tokenized ? 'green' : 'red'} fontWeight={800} variant="h5">
                {formik.values.tokenized ? 'Tokenized' : 'Not tokenized'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Token Name *</InputLabel>
              <TextField
                id="tokenName"
                name="tokenName"
                placeholder="Enter Token Name *"
                value={formik.values.tokenName}
                onChange={formik.handleChange}
                error={formik.touched.tokenName && Boolean(formik.errors.tokenName)}
                helperText={formik.touched.tokenName && formik.errors.tokenName}
                fullWidth
                autoComplete="tokenization name"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Symbol *</InputLabel>
              <TextField
                id="tokenSymbol"
                name="tokenSymbol"
                placeholder="Enter Symbol *"
                value={formik.values.tokenSymbol}
                onChange={formik.handleChange}
                error={formik.touched.tokenSymbol && Boolean(formik.errors.tokenSymbol)}
                helperText={formik.touched.tokenSymbol && formik.errors.tokenSymbol}
                fullWidth
                autoComplete="tokenization token-name"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Tonnage (t) *</InputLabel>
              <TextField
                id="tonnage"
                name="tonnage"
                placeholder="Enter Tonnage *"
                value={formik.values.tonnage}
                onChange={formik.handleChange}
                error={formik.touched.tonnage && Boolean(formik.errors.tonnage)}
                helperText={formik.touched.tonnage && formik.errors.tonnage}
                fullWidth
                autoComplete="tokenization tonnage"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Asset Value *</InputLabel>
              <TextField
                id="assetValue"
                name="assetValue"
                placeholder="Enter Asset Value *"
                value={formik.values.assetValue}
                onChange={formik.handleChange}
                error={formik.touched.assetValue && Boolean(formik.errors.assetValue)}
                helperText={formik.touched.assetValue && formik.errors.assetValue}
                fullWidth
                autoComplete="tokenization asset-value"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>% Tokenizing *</InputLabel>
              <TextField
                id="tokenizingPercentage"
                name="tokenizingPercentage"
                placeholder="Enter % Tokenizing *"
                value={formik.values.tokenizingPercentage}
                onChange={formik.handleChange}
                error={formik.touched.tokenizingPercentage && Boolean(formik.errors.tokenizingPercentage)}
                helperText={formik.touched.tokenizingPercentage && formik.errors.tokenizingPercentage}
                fullWidth
                autoComplete="tokenization name"
                InputProps={{
                  readOnly: true,
                  endAdornment: <InputAdornment position="start">%</InputAdornment>
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>% Offering *</InputLabel>
              <TextField
                id="offeringPercentage"
                name="offeringPercentage"
                placeholder="Enter % Offering *"
                value={formik.values.offeringPercentage}
                onChange={formik.handleChange}
                error={formik.touched.offeringPercentage && Boolean(formik.errors.offeringPercentage)}
                helperText={formik.touched.offeringPercentage && formik.errors.offeringPercentage}
                fullWidth
                autoComplete="tokenization offering"
                InputProps={{
                  readOnly: router.query.projectId !== 'add',
                  endAdornment: <InputAdornment position="start">%</InputAdornment>
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>No. of Token(s)</InputLabel>
              <TextField
                placeholder="Enter No. of Token(s)"
                value={(formik.values.tonnage || 0) * 1000}
                InputProps={{
                  readOnly: true
                }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Offering</InputLabel>
              <TextField
                placeholder="Enter Offering"
                value={(formik.values.offeringPercentage || 0) * (formik.values.tonnage || 0) * 10}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Token Value</InputLabel>
              <TextField
                placeholder="Enter Token Value"
                value={formik.values.tonnage === undefined ? 0 : (formik.values.assetValue || 0) / (formik.values.tonnage * 1000)}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Minimum Investment *</InputLabel>
              <Select
                value={formik.values.minimumInvestment}
                onChange={(ev) => formik.setFieldValue('minimumInvestment', ev.target.value)}
                error={formik.touched.minimumInvestment && Boolean(formik.errors.minimumInvestment)}
                displayEmpty
                inputProps={{ 'aria-label': 'Tokenization Minimum Investment', readOnly: router.query.projectId !== 'add' }}
                placeholder="Select Minimum Investment"
              >
                <MenuItem>Select Minimum Investment</MenuItem>
                <MenuItem value={10}>$ 10</MenuItem>
                <MenuItem value={50}>$ 50</MenuItem>
                <MenuItem value={100}>$ 100</MenuItem>
                <MenuItem value={500}>$ 500</MenuItem>
                <MenuItem value={1000}>$ 1000</MenuItem>
              </Select>
            </Stack>
          </Grid>
          {router.query.projectId === 'add' && (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="end">
                <AnimateButton>
                  <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} disabled={isSubmitting}>
                    Create Token
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
}
