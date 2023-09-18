// material-ui
import { Grid, IconButton, Link, Stack, Typography } from '@mui/material';

// assets
import { EyeOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

type BootstrapFormItemProps = {
  label: string;
  index: string;
  data: any;
};

const BootstrapFormItem = ({ label, index, data }: BootstrapFormItemProps) => {
  const handleReviewClick = () => {};

  return (
    <Grid item xs={12} mb={2}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        bgcolor={antColors.grey[6]}
        px={2}
        borderRadius={1}
        py={0.5}
        justifyContent="space-between"
      >
        <Typography>{label}</Typography>
        <Link href={`${process.env.SHIPFINEX_BACKEND_URL}${data[index]}`} target="_blank">
          <IconButton onClick={handleReviewClick}>
            <EyeOutlined style={{ color: antColors.blue[4] }} aria-label="Review" title="Review" />
          </IconButton>
        </Link>
      </Stack>
    </Grid>
  );
};

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //

export type Documents = {
  technicalReport?: string;
  financialReport?: string;
  commercialReport?: string;
  risk?: string;
  community?: string;
  vesselCertificate?: string;
};

interface DocumentsFormProps {
  documents: Documents;
}

export default function DocumentsForm({ documents }: DocumentsFormProps) {
  return (
    <>
      <Grid container spacing={1}>
        <BootstrapFormItem index="technicalReport" label="Technical Reports" data={documents} />
        <BootstrapFormItem index="financialReport" label="Financial Reports" data={documents} />
        <BootstrapFormItem index="commercialReport" label="Commercial Reports" data={documents} />
        <BootstrapFormItem index="risk" label="Risk" data={documents} />
        <BootstrapFormItem index="community" label="Community" data={documents} />
        <BootstrapFormItem index="vesselCertificate" label="Vessel Certificates" data={documents} />
      </Grid>
    </>
  );
}
