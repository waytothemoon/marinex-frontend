import { useEffect, useState } from 'react';

// material-ui
import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';

// project imports
import ProjectCard from '../ProjectCard';
import ProjectsTable from './ProjectsTable';

// assets
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

// project imports

// ==============================|| INVESTOR - PROJECTS ||============================== //

const TrendingProjects = () => {
  const [form, setForm] = useState<boolean>(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const theme = useTheme();

  useEffect(() => {
    fetch('/api/project?allowance=1')
      .then(async (res) => {
        const { total, data } = await res.json();
        if (total) {
          setProjectsCount(total);
          setProjects(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Trending projects</Typography>
            <Stack direction="row" alignItems="center" spacing="2">
              <IconButton onClick={() => setForm(false)}>
                <UnorderedListOutlined style={{ color: form ? '#737677' : theme.palette.primary.main, fontSize: '20px' }} />
              </IconButton>
              <IconButton onClick={() => setForm(true)}>
                <AppstoreOutlined style={{ color: !form ? '#737677' : theme.palette.primary.main, fontSize: '20px' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        {!form && (
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        )}
        {form &&
          projectsCount > 0 &&
          projects.map((project, _index) => (
            <Grid item xs={12} xl={3} lg={4} md={4} sm={6} key={`project-${_index}`}>
              <ProjectCard project={project} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default TrendingProjects;
