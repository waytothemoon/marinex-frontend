import { FormEvent, useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

// next
import Image from 'next/image';

// third party
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { enqueueSnackbar } from 'notistack';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || '');

type DepositDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const CheckoutForm = ({ handleClose }: { handleClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000'
      },
      redirect: 'if_required'
    });

    console.log(result);

    if (result.error) {
      enqueueSnackbar(`Deposit failed.`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
    } else {
      enqueueSnackbar(`Successfully deposited.`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      handleClose();
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} px={1} py={1}>
        <PaymentElement />
        <Button disabled={!stripe || isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default function DepositDialog({ open, handleClose: onClose }: DepositDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [depositAmount, setDepositAmount] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState<string>('pi_3NmjxFJAEI0iajKv1Yz6iZKN_secret_FN4zqxwDJ72gM4f7N3Uzd4g01');
  const [isLoading, setLoading] = useState<boolean>(false);

  const handlePay = () => {
    if (paymentMethod === false) {
      setLoading(true);
      setStep(1);
      fetch(`/api/payment/stripe?amount=${depositAmount}`).then(async (res) => {
        if (res.status === 200) {
          const { clientSecret: _clientSecret } = await res.json();
          setClientSecret(_clientSecret);
          setLoading(false);
        }
      });
    } else {
      setStep(2);
    }
  };

  useEffect(() => {
    if (open) {
      setStep(0);
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="deposit-dialog-title" title="Deposit">
      <Box sx={{ px: 2, py: 1.5, minWidth: '400px' }}>
        <Typography variant="h2" my={1} align="center">
          Deposit
        </Typography>
        {step === 0 && (
          <>
            <DialogTitle id="deposit-dialog-title">1. Choose a payment method</DialogTitle>
            <DialogContent>
              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  variant={!paymentMethod ? 'outlined' : 'text'}
                  onClick={() => setPaymentMethod(false)}
                  style={{ width: 150, height: 'auto' }}
                >
                  <Image src="/images/visa_icon.png" alt="visa" width={43} height={44} />
                </Button>
                <Button
                  variant={paymentMethod ? 'outlined' : 'text'}
                  onClick={() => setPaymentMethod(true)}
                  style={{ width: 150, height: 'auto' }}
                >
                  <Image src="/images/usdt_icon.png" alt="visa" width={132} height={41} />
                </Button>
              </Stack>
            </DialogContent>
            <DialogTitle id="deposit-dialog-title">2. Specify top up amount</DialogTitle>
            <DialogContent>
              <Stack direction="row" spacing={3} py={1}>
                <Button variant={depositAmount === 100 ? 'outlined' : 'text'} onClick={() => setDepositAmount(100)} fullWidth>
                  100 $
                </Button>
                <Button variant={depositAmount === 500 ? 'outlined' : 'text'} onClick={() => setDepositAmount(500)} fullWidth>
                  500 $
                </Button>
                <Button variant={depositAmount === 1000 ? 'outlined' : 'text'} onClick={() => setDepositAmount(1000)} fullWidth>
                  1000 $
                </Button>
              </Stack>
              <Box mt={3} width={150}>
                <Button onClick={handlePay} variant="contained" fullWidth>
                  Pay
                </Button>
              </Box>
            </DialogContent>
          </>
        )}

        {step === 1 &&
          (isLoading ? (
            <Stack alignItems="center">
              <CircularProgress color="primary" />
            </Stack>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
              <CheckoutForm handleClose={handleClose} />
            </Elements>
          ))}
      </Box>
    </Dialog>
  );
}
