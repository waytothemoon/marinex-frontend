import { FormEvent, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, FormHelperText, Grid, Stack, Typography } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';
import { signIn, useSession } from 'next-auth/react';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// types
import { ThemeMode } from 'types/config';
import { enqueueSnackbar } from 'notistack';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = () => {
  const theme = useTheme();
  const { data: session } = useSession();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>();
  const [error, setError] = useState<string>();

  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!/^[0-9]{6}$/.test(otp || '')) {
      setError('Invalid OTP code.');
      return;
    }
    setSubmitting(true);
    signIn('verifyOtp', {
      redirect: false,
      otp,
      email: session?.token.email
    }).then((res: any) => {
      if (res?.error) {
        setError('Invalid OTP code.');
        setSubmitting(false);
      }
    });
  };

  const handleResend = () => {
    fetch('/api/auth/resend').then(async (res) => {
      if (res.status === 200) {
        enqueueSnackbar('OTP code has sent successfully.', { variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'top' } });
      } else {
        console.log(await res.json());
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OtpInput
            value={otp}
            onChange={(newOtp: string) => setOtp(newOtp)}
            numInputs={6}
            containerStyle={{ justifyContent: 'space-between' }}
            inputStyle={{
              width: '100%',
              margin: '8px',
              padding: '10px',
              border: `1px solid ${borderColor}`,
              borderRadius: 4,
              ':hover': {
                borderColor: theme.palette.primary.main
              }
            }}
            focusStyle={{
              outline: 'none',
              boxShadow: theme.customShadows.primary,
              border: `1px solid ${theme.palette.primary.main}`
            }}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <FormHelperText error>{error}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <AnimateButton>
            <Button disableElevation fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
              Continue
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography>
              Did not receive the email? Check your spam, or{' '}
              <Typography
                component="span"
                variant="body1"
                sx={{ minWidth: 85, textDecoration: 'none', cursor: 'pointer' }}
                color="primary"
                onClick={handleResend}
              >
                Resend code
              </Typography>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthCodeVerification;
