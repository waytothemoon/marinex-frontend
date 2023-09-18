// next
import { useRouter } from 'next/router';

// material-ui
import { Grid, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export type Tokenization = {
  tokenName?: string;
  tokenSymbol?: string;
  decimal?: number;
  tonnage?: number;
  assetValue?: number;
  tokenizingPercentage?: number;
  offeringPercentage?: number;
  minimumInvestment?: number;
};

interface TokenizationFormProps {
  tokenization: Tokenization;
}

export default function TokenizationForm({ tokenization }: TokenizationFormProps) {
  const router = useRouter();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170 }}>Status</InputLabel>
            <Typography color="green" fontWeight={800} variant="h5">
              Tokenized
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Token Name *</InputLabel>
            <TextField
              id="tokenName"
              name="tokenName"
              placeholder="Enter Token Name *"
              value={tokenization.tokenName}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add'
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Symbol *</InputLabel>
            <TextField
              id="symbol"
              name="symbol"
              placeholder="Enter Symbol *"
              value={tokenization.tokenSymbol}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add'
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Decimal *</InputLabel>
            <TextField
              id="decimal"
              name="decimal"
              placeholder="Enter Decimal *"
              value={tokenization.decimal}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add'
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Tonnage (t) *</InputLabel>
            <TextField
              id="tonnage"
              name="tonnage"
              placeholder="Enter Tonnage *"
              value={tokenization.tonnage}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add'
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Asset Value *</InputLabel>
            <TextField
              id="assetValue"
              name="assetValue"
              placeholder="Enter Asset Value *"
              value={tokenization.assetValue}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add',
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>% Tokenizing *</InputLabel>
            <TextField
              id="tokenizing"
              name="tokenizing"
              placeholder="Enter % Tokenizing *"
              value={tokenization.tokenizingPercentage}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add',
                endAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>% Offering *</InputLabel>
            <TextField
              id="offering"
              name="offering"
              placeholder="Enter % Offering *"
              value={tokenization.offeringPercentage}
              fullWidth
              InputProps={{
                readOnly: router.query.projectId !== 'add',
                endAdornment: <InputAdornment position="start">%</InputAdornment>
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>No. of Token(s)</InputLabel>
            <TextField
              placeholder="Enter No. of Token(s)"
              value={(tokenization.tonnage || 0) * 1000}
              InputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Offering</InputLabel>
            <TextField
              placeholder="Enter Offering"
              value={((tokenization.offeringPercentage || 0) * (tokenization.assetValue || 0)) / 100}
              InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Token Value</InputLabel>
            <TextField
              placeholder="Enter Token Value"
              value={tokenization.tonnage === undefined ? 0 : (tokenization.assetValue || 0) / (tokenization.tonnage * 1000)}
              InputProps={{
                readOnly: true,
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <InputLabel style={{ minWidth: 170, flexGrow: 1 }}>Minimum Investment *</InputLabel>
            <Select
              value={tokenization.minimumInvestment}
              displayEmpty
              inputProps={{ 'aria-label': 'Tokenization Minimum Investment', readOnly: router.query.projectId !== 'add' }}
              placeholder="Select Minimum Investment"
              fullWidth
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
      </Grid>
    </>
  );
}
