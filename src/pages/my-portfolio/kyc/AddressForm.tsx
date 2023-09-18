// material-ui
import { Button, Grid, InputLabel, Stack, Typography, TextField } from '@mui/material';

// third-party
import { Formik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| VALIDATION WIZARD - ADDRESS  ||============================== //

export type ShippingData = {
  firstName?: string;
  middlename?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  streetAddress?: string;
  streetAddress2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

interface AddressFormProps {
  shippingData: ShippingData;
  setShippingData: (d: ShippingData) => void;
  handleNext: () => void;
  setErrorIndex: (i: number | null) => void;
}

const AddressForm = ({ shippingData, setShippingData, handleNext, setErrorIndex }: AddressFormProps) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Shipping address
      </Typography>
      <Formik
        initialValues={{
          firstName: shippingData.firstName || '',
          middlename: shippingData.middlename || '',
          lastName: shippingData.lastName || '',
          email: shippingData.email || '',
          phoneNumber: shippingData.phoneNumber || '',
          streetAddress: shippingData.streetAddress || '',
          streetAddress2: shippingData.streetAddress2 || '',
          city: shippingData.city || '',
          state: shippingData.state || '',
          postalCode: shippingData.postalCode || '',
          country: shippingData.country || ''
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string().required('First Name is required'),
          lastName: yup.string().required('Last Name is required'),
          email: yup.string().email('Invalid email address.').required('Email is required'),
          phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
          streetAddress: yup.string().required('Street Address is required'),
          city: yup.string().required('City is required'),
          state: yup.string().required('State is required'),
          postalCode: yup.string().required('Postal Code is required'),
          country: yup.string().required('Country is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          console.log(23);
          setShippingData({
            firstName: values.firstName,
            middlename: values.middlename,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            streetAddress: values.streetAddress,
            streetAddress2: values.streetAddress2,
            city: values.city,
            state: values.state,
            postalCode: values.postalCode,
            country: values.country
          });
          handleNext();
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Stack spacing={0.5}>
                  <InputLabel>First Name *</InputLabel>
                  <TextField
                    id="firstName"
                    name="firstName"
                    placeholder="First Name *"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    fullWidth
                    autoComplete="given-name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={0.5}>
                  <InputLabel>Middle Name</InputLabel>
                  <TextField
                    id="middlename"
                    name="middlename"
                    placeholder="Middle Name"
                    value={values.middlename}
                    onChange={handleChange}
                    error={touched.middlename && Boolean(errors.middlename)}
                    helperText={touched.middlename && errors.middlename}
                    fullWidth
                    autoComplete="middle-name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={0.5}>
                  <InputLabel>Last Name *</InputLabel>
                  <TextField
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name *"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    fullWidth
                    autoComplete="family-name"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Email *</InputLabel>
                  <TextField
                    id="email"
                    name="email"
                    placeholder="Email *"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    autoComplete="email"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Phone Number *</InputLabel>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    fullWidth
                    autoComplete="phone"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Street Address *</InputLabel>
                  <TextField
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Street Address *"
                    value={values.streetAddress}
                    onChange={handleChange}
                    error={touched.streetAddress && Boolean(errors.streetAddress)}
                    helperText={touched.streetAddress && errors.streetAddress}
                    fullWidth
                    autoComplete="shipping address-line1"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0.5}>
                  <InputLabel>Street Address 2</InputLabel>
                  <TextField
                    id="streetAddress2"
                    name="streetAddress2"
                    placeholder="Street Address 2"
                    value={values.streetAddress2}
                    onChange={handleChange}
                    error={touched.streetAddress2 && Boolean(errors.streetAddress2)}
                    helperText={touched.streetAddress2 && errors.streetAddress2}
                    fullWidth
                    autoComplete="shipping address-line2"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <InputLabel>City *</InputLabel>
                  <TextField
                    id="city"
                    name="city"
                    placeholder="City *"
                    value={values.city}
                    onChange={handleChange}
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    fullWidth
                    autoComplete="shipping address-level2"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <InputLabel>State *</InputLabel>
                  <TextField
                    id="state"
                    name="state"
                    placeholder="State/Province/Region *"
                    value={values.state}
                    onChange={handleChange}
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <InputLabel>Zip / Postal Code *</InputLabel>
                  <TextField
                    id="postalCode"
                    name="postalCode"
                    placeholder="Zip / Postal code *"
                    value={values.postalCode}
                    onChange={handleChange}
                    error={touched.postalCode && Boolean(errors.postalCode)}
                    helperText={touched.postalCode && errors.postalCode}
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <InputLabel>Country *</InputLabel>
                  <TextField
                    id="country"
                    name="country"
                    placeholder="Country *"
                    value={values.country}
                    onChange={handleChange}
                    error={touched.country && Boolean(errors.country)}
                    helperText={touched.country && errors.country}
                    fullWidth
                    autoComplete="shipping country"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end">
                  <AnimateButton>
                    <Button variant="contained" disabled={isSubmitting} sx={{ my: 3, ml: 1 }} type="submit">
                      Next
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddressForm;
