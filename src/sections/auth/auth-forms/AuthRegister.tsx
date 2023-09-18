import React from 'react';

// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  MenuItem
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha-enterprise';
// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| SIGN UP ||============================ //

const AuthRegister = ({ providers, csrfToken }: any) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [captchaChecked, toggleCaptchaChecked] = React.useState<boolean>(true);

  const onCaptchaChange = (token: string | null) => {
    toggleCaptchaChecked(token !== null);
  };

  const handleClickShowPassword = () => {
    setShowPassword((_v) => !_v);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((_v) => !_v);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
          referralCode: '',
          role: 'investor',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(255).required('First name is required'),
          lastName: Yup.string().max(255).required('Last name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
          referralCode: Yup.string(),
          password: Yup.string().max(255).required('Password is required'),
          confirmPassword: Yup.string()
            .max(255)
            .required('Confirm password is required')
            .when(['password'], (password, schema) => schema.equals(password, 'The two passwords that you entered do not match!'))
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          if (captchaChecked) {
            signIn('signup', {
              redirect: false,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              password: values.password,
              role: values.role,
              referralCode: values.referralCode
            }).then((res: any) => {
              if (res?.error) {
                try {
                  const mappedErrors: any[] = JSON.parse(res.error);
                  const errors: any = {};
                  mappedErrors.forEach((error) => (errors[error.path[0]] = error.message));
                  setErrors({ ...errors });
                  setSubmitting(false);
                } catch (e) {
                  setErrors({ submit: res.error });
                  setSubmitting(false);
                }
              } else {
                setSubmitting(false);
                router.push('/verify-email');
              }
            });
          } else {
            setErrors({ submit: 'ReCAPTCHA not passed' });
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="firstName-login">First Name</InputLabel>
                      <OutlinedInput
                        id="firstName-login"
                        type="text"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        fullWidth
                        error={Boolean(touched.firstName && errors.firstName)}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormHelperText error id="standard-weight-helper-text-firstName-login">
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="lastName-login">Last Name</InputLabel>
                      <OutlinedInput
                        id="lastName-login"
                        type="text"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        fullWidth
                        error={Boolean(touched.lastName && errors.lastName)}
                      />
                      {touched.lastName && errors.lastName && (
                        <FormHelperText error id="standard-weight-helper-text-name-login">
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="role-login">Role</InputLabel>
                  <Select defaultValue="investor" value={values.role} onChange={(ev) => setFieldValue('role', ev.target.value)}>
                    <MenuItem value="investor" title="Investor">
                      Investor
                    </MenuItem>
                    <MenuItem value="prowner" title="Project Owner">
                      Project Owner
                    </MenuItem>
                  </Select>
                  {touched.role && errors.role && (
                    <FormHelperText error id="standard-weight-helper-text-role-login">
                      {errors.role}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phonenumber-login">Phone Number</InputLabel>
                  <OutlinedInput
                    id="phonenumber-login"
                    type="text"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter phone number address"
                    fullWidth
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText error id="standard-weight-helper-text-phonenumber-login">
                      {errors.phoneNumber}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="confirmpassword-login">Confirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    id="-confirm-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Reenter password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormHelperText error id="standard-weight-helper-text-confirmpassword-login">
                      {errors.confirmPassword}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="referralcode-login">Referral Code</InputLabel>
                  <OutlinedInput
                    id="referralCode-login"
                    type="text"
                    value={values.referralCode}
                    name="referralCode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter referral code"
                    fullWidth
                    error={Boolean(touched.referralCode && errors.referralCode)}
                  />
                  {touched.referralCode && errors.referralCode && (
                    <FormHelperText error id="standard-weight-helper-text-referralcode-login">
                      {errors.referralCode}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <ReCAPTCHA size="normal" sitekey="6LfVVqknAAAAADD-a4pkt9ZwBybJRddi0liTtyzJ" onChange={onCaptchaChange} />
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <NextLink href="/" passHref legacyBehavior>
                    <Link variant="subtitle2">Terms of Service</Link>
                  </NextLink>
                  &nbsp; and &nbsp;
                  <NextLink href="/" passHref legacyBehavior>
                    <Link variant="subtitle2">Privacy Policy</Link>
                  </NextLink>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Create Account
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
