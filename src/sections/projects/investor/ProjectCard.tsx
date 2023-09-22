// next
import NextLink from 'next/link';
import Image from 'next/image';

// material-ui
import { Box, Button, Card, CardContent, Link, Stack, Typography } from '@mui/material';

import numberFormat from 'utils/numberFormat';

// ==============================|| PROJECT CARD ||============================== //

const ProjectCard = ({ project: { _doc: project } }: { project: any }) => {
  return (
    <Card style={{ position: 'relative' }}>
      <CardContent>
        <Box borderRadius={3} overflow="hidden" height="160px" mb={2} position="relative">
          <Image src={`${process.env.SHIPFINEX_BACKEND_URL}${project.projectImage}`} alt="Ship" fill />
        </Box>
        <Typography variant="h4" fontWeight={800} mb={2}>
          {project.projectName}
        </Typography>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2"># of Tokens</Typography>
            <Typography variant="body2" fontWeight={700}>
              {numberFormat(project.tokenization.tonnage * 1000)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Current value</Typography>
            <Typography variant="body2" fontWeight={700}>
              $ {numberFormat(project.tokenization.assetValue)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Expected earning</Typography>
            <Typography variant="body2" fontWeight={700}>
              {project.estimatedEarning} %
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">Min investment</Typography>
            <Typography variant="body2" fontWeight={700}>
              $ {numberFormat(project.tokenization.minimumInvestment)}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} mt={3}>
          <NextLink href={`/projects/${project._id}`} passHref legacyBehavior>
            <Link width="100%">
              <Button variant="contained" fullWidth color="primary" style={{ fontWeight: 'bold' }}>
                Buy now
              </Button>
            </Link>
          </NextLink>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
