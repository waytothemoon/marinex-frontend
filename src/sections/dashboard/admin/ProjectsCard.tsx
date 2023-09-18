// material-ui
import { Box, Card, Divider, Stack, Typography } from '@mui/material';

// assets
import {
  UserAddOutlined,
  UserDeleteOutlined,
  FileDoneOutlined,
  FieldTimeOutlined,
  CloseCircleOutlined,
  FileProtectOutlined
} from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

// ==============================|| PROJECTS CARD ||============================== //

const ProjectsCard = () => {
  return (
    <Card
      style={{
        backgroundColor: antColors.blue[4],
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        height: '100%'
      }}
    >
      <Stack direction="row" mb={1} justifyContent="space-between" alignItems="center">
        <Box color="white">
          <Typography variant="body2"># of Projects</Typography>
          <Typography variant="h4">0</Typography>
        </Box>
        <FileProtectOutlined style={{ color: 'white', fontSize: 24 }} />
      </Stack>
      <Divider />
      <Stack spacing={0.5} mt={2}>
        <Stack borderRadius={2} bgcolor={antColors.blue[0]} direction="row" justifyContent="space-between" px={2} py={1} color="grey">
          <Stack direction="row" spacing={1.2}>
            <UserAddOutlined style={{ fontSize: 18 }} />
            <Typography>Active</Typography>
          </Stack>
          <Typography fontWeight="bold" color="blue">
            0
          </Typography>
        </Stack>
        <Stack borderRadius={2} bgcolor={antColors.blue[0]} direction="row" justifyContent="space-between" px={2} py={1} color="grey">
          <Stack direction="row" spacing={1.2}>
            <UserDeleteOutlined style={{ fontSize: 18 }} />
            <Typography>Inactive</Typography>
          </Stack>
          <Typography fontWeight="bold" color="blue">
            0
          </Typography>
        </Stack>
        <Stack borderRadius={2} bgcolor={antColors.blue[0]} direction="row" justifyContent="space-between" px={2} py={1} color="grey">
          <Stack direction="row" spacing={1.2}>
            <FileDoneOutlined style={{ fontSize: 18 }} />
            <Typography>Approved</Typography>
          </Stack>
          <Typography fontWeight="bold" color="green">
            0
          </Typography>
        </Stack>
        <Stack borderRadius={2} bgcolor={antColors.blue[0]} direction="row" justifyContent="space-between" px={2} py={1} color="grey">
          <Stack direction="row" spacing={1.2}>
            <FieldTimeOutlined style={{ fontSize: 18 }} />
            <Typography>Pending</Typography>
          </Stack>
          <Typography fontWeight="bold" color="purple">
            0
          </Typography>
        </Stack>
        <Stack borderRadius={2} bgcolor={antColors.blue[0]} direction="row" justifyContent="space-between" px={2} py={1} color="grey">
          <Stack direction="row" spacing={1.2}>
            <CloseCircleOutlined style={{ fontSize: 18 }} />
            <Typography>Rejected</Typography>
          </Stack>
          <Typography fontWeight="bold" color="red">
            0
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProjectsCard;
