// material-ui
import { Button, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { CloudUploadOutlined, CameraOutlined } from '@ant-design/icons';

const validationSchema = yup.object({
  cardName: yup.string().required('Card Name is required'),
  cardNumber: yup.string().required('Card Number is required')
});

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export type PaymentData = { cardName?: string; cardNumber?: number };
interface PaymentFormProps {
  paymentData: PaymentData;
  setPaymentData: (d: PaymentData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function KycDocumentForm({ paymentData, setPaymentData, handleNext, handleBack, setErrorIndex }: PaymentFormProps) {
  const formik = useFormik({
    initialValues: {
      cardName: paymentData.cardName,
      cardNumber: paymentData.cardNumber
    },
    validationSchema,
    onSubmit: (values) => {
      setPaymentData({
        cardName: values.cardName,
        cardNumber: values.cardNumber
      });
      handleNext();
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
              KYC Document
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Document Type *</InputLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue={true}>
                <FormControlLabel value={true} control={<Radio />} label="Passport" sx={{ ml: 1 }} />
                <FormControlLabel value={false} control={<Radio />} label="Pancard" sx={{ ml: 1 }} />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Front Page *</InputLabel>
              <Button variant="outlined" component="label">
                <CloudUploadOutlined />
                <Typography ml={1}>Select Front Page of document</Typography>
                <input hidden accept="image/*" multiple type="file" id="" name="" />
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <InputLabel>Back Page</InputLabel>
              <Button variant="outlined" component="label">
                <CloudUploadOutlined />
                <Typography ml={1}>Select Back Page of document</Typography>
                <input hidden accept="image/*" multiple type="file" id="" name="" />
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
              Face Match
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" component="label">
              <CameraOutlined />
              <Typography ml={1}>Capture Your Face</Typography>
            </Button>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
              Liveliness Test
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" component="label">
              <CameraOutlined />
              <Typography ml={1}>Capture Your Face</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
