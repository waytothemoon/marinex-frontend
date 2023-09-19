// next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { CloudUploadOutlined, EyeOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';
import axios from 'utils/axios';
import { enqueueSnackbar } from 'notistack';

const validationSchema = yup.object({
  projectImage: yup.mixed().required('Project Image is required'),
  projectName: yup.string().required('Project Name is required'),
  description: yup.string().required('Project Description is required'),
  imoNumber: yup
    .string()
    .matches(/^\d{7}$/, { message: 'Invalid IMO number' })
    .required('IMO number is required'),
  vesselType: yup.string().required('Vessel Type is required.'),
  builtYear: yup.date().required('Built year is required.'),
  flag: yup.string().required('Flag is required'),
  estimatedEarning: yup.number().min(0, 'Invalid Value').max(100, 'Invalid Value').required('Estimated Earning is required.')
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1.25),
    paddingRight: theme.spacing(2)
  }
}));

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export type ShipDetail = {
  id?: string;
  projectImage?: File | string;
  projectName?: string;
  description?: string;
  imoNumber?: string;
  vesselType?: string;
  builtYear?: Date;
  flag?: string;
  estimatedEarning?: number;
};

interface ShipDetailFormProps {
  shipDetail: ShipDetail;
  setShipDetail: (d: ShipDetail) => void;
  handleNext: () => void;
}

export default function ShipDetailForm({ shipDetail, setShipDetail, handleNext }: ShipDetailFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewImage, setReviewImage] = useState<any>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      projectImage: shipDetail.projectImage,
      projectName: shipDetail.projectName,
      description: shipDetail.description,
      imoNumber: shipDetail.imoNumber,
      vesselType: shipDetail.vesselType,
      builtYear: shipDetail.builtYear,
      flag: shipDetail.flag,
      estimatedEarning: shipDetail.estimatedEarning
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitting(true);
      const shipDetail: ShipDetail = {
        projectImage: values.projectImage,
        projectName: values.projectName,
        description: values.description,
        imoNumber: values.imoNumber,
        vesselType: values.vesselType,
        builtYear: values.builtYear,
        flag: values.flag,
        estimatedEarning: values.estimatedEarning
      };

      const formData = new FormData();
      formData.append('projectImage', shipDetail.projectImage as any);
      formData.append('projectName', String(shipDetail.projectName));
      formData.append('description', String(shipDetail.description));
      formData.append('imoNumber', String(shipDetail.imoNumber));
      formData.append('vesselType', String(shipDetail.vesselType));
      formData.append('builtYear', shipDetail.builtYear as any);
      formData.append('flag', String(shipDetail.flag));
      formData.append('estimatedEarning', String(shipDetail.estimatedEarning));

      axios.defaults.headers.common = { Authorization: `bearer ${session?.token.accessToken as string}` };
      axios
        .post(`/api/v1/project/register`, formData)
        .then(async (res) => {
          shipDetail.id = res.data._id;
          setShipDetail(shipDetail);
          handleNext();

          enqueueSnackbar('Project registered successfully.', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
          });

          setSubmitting(false);
        })
        .catch((err) => {
          enqueueSnackbar('Project registeration failed.', {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
          });
          setSubmitting(false);
          console.log(err);
        });
    }
  });

  useEffect(() => {
    if (!formik.values.projectImage) return;

    if (typeof formik.values.projectImage !== 'string') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setReviewImage(ev.target?.result);
      };
      reader.readAsDataURL(formik.values.projectImage);
    } else {
      setReviewImage(`${process.env.SHIPFINEX_BACKEND_URL}${formik.values.projectImage}`);
    }
  }, [formik.values.projectImage]);

  const handleReviewClick = () => {
    setReviewOpen(true);
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Project Image *</InputLabel>
              {router.query.projectId === 'add' && (
                <Button variant="outlined" component="label" /* disabled={formik.values.projectImage !== undefined} */>
                  <CloudUploadOutlined />
                  <Typography ml={1}>Upload Project Image</Typography>
                  <input
                    accept="image/*"
                    multiple
                    hidden
                    type="file"
                    onChange={(ev) => {
                      if (ev.currentTarget.files && ev.currentTarget.files[0]) {
                        formik.setFieldValue('projectImage', ev.currentTarget.files[0]);
                      }
                    }}
                  />
                </Button>
              )}
              {formik.values.projectImage && (
                <>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    bgcolor={antColors.grey[4]}
                    px={2}
                    borderRadius={1}
                    py={0.5}
                    justifyContent="space-between"
                  >
                    <Typography>
                      {typeof formik.values.projectImage === 'string' ? formik.values.projectImage : formik.values.projectImage.name}
                    </Typography>
                    <IconButton onClick={handleReviewClick}>
                      <EyeOutlined aria-label="Review" title="Review" />
                    </IconButton>
                  </Stack>
                  <BootstrapDialog onClose={handleReviewClose} aria-labelledby="project-image-review" open={reviewOpen}>
                    <DialogContent dividers sx={{ p: 3 }}>
                      <Image src={reviewImage} width={400} alt="Review Image" height={400} />
                    </DialogContent>
                    <DialogActions>
                      <Button variant="outlined" onClick={handleReviewClose}>
                        Cancel
                      </Button>
                    </DialogActions>
                  </BootstrapDialog>
                </>
              )}
              {formik.touched.projectImage && formik.errors.projectImage && (
                <FormHelperText error id="standard-weight-helper-text-projectImage-login">
                  {formik.errors.projectImage}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Project Name *</InputLabel>
              <TextField
                id="projectName"
                name="projectName"
                placeholder="Enter Project Name *"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                helperText={formik.touched.projectName && formik.errors.projectName}
                fullWidth
                autoComplete="project name"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Project Description *</InputLabel>
              <TextField
                id="description"
                multiline
                name="description"
                placeholder="Enter Project Description *"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                fullWidth
                autoComplete="project description"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>IMO number *</InputLabel>
              <TextField
                id="imoNumber"
                name="imoNumber"
                placeholder="Enter IMO number *"
                value={formik.values.imoNumber}
                onChange={formik.handleChange}
                error={formik.touched.imoNumber && Boolean(formik.errors.imoNumber)}
                helperText={formik.touched.imoNumber && formik.errors.imoNumber}
                fullWidth
                autoComplete="imo number"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Vessel Type *</InputLabel>
              <Select
                value={formik.values.vesselType}
                onChange={(ev) => formik.setFieldValue('vesselType', ev.target.value)}
                error={formik.touched.vesselType && Boolean(formik.errors.vesselType)}
                displayEmpty
                inputProps={{ 'aria-label': 'Ship Detail Vessel Types', readOnly: router.query.projectId !== 'add' }}
                placeholder="Enter Select Vessel"
                fullWidth
              >
                <MenuItem hidden>Select Vessel</MenuItem>
                <MenuItem value={'Bulk Carriers'}>Bulk Carriers</MenuItem>
                <MenuItem value={'Oil Tankers'}>Oil Tankers</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Built Year *</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['year']}
                  value={formik.values.builtYear}
                  defaultValue={new Date()}
                  onChange={(value, context) => {
                    if (value) {
                      formik.setFieldValue('builtYear', value);
                    }
                  }}
                />
              </LocalizationProvider>
              {formik.touched.builtYear && formik.errors.builtYear && (
                <FormHelperText error id="standard-weight-helper-text-builtYear-login">
                  {formik.errors.builtYear}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Flag *</InputLabel>
              <TextField
                id="flag"
                name="flag"
                placeholder="Enter Flag *"
                value={formik.values.flag}
                onChange={formik.handleChange}
                error={formik.touched.flag && Boolean(formik.errors.flag)}
                helperText={formik.touched.flag && formik.errors.flag}
                fullWidth
                autoComplete="project flag"
                InputProps={{
                  readOnly: router.query.projectId !== 'add'
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={0.5}>
              <InputLabel>Estimated Earning (%) *</InputLabel>
              <TextField
                id="estimatedEarning"
                name="estimatedEarning"
                placeholder="Enter Estimated Earning *"
                value={formik.values.estimatedEarning}
                onChange={formik.handleChange}
                error={formik.touched.estimatedEarning && Boolean(formik.errors.estimatedEarning)}
                helperText={formik.touched.estimatedEarning && formik.errors.estimatedEarning}
                fullWidth
                autoComplete="project estimated-earning"
                InputProps={{
                  readOnly: router.query.projectId !== 'add',
                  endAdornment: <InputAdornment position="start">%</InputAdornment>
                }}
              />
            </Stack>
          </Grid>
          {router.query.projectId === 'add' && (
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="end">
                <AnimateButton>
                  <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} disabled={isSubmitting}>
                    Next
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
