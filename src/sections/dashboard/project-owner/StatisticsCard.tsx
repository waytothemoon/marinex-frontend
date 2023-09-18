import { SyntheticEvent, useState, useEffect } from 'react';

// next
import dynamic from 'next/dynamic';

// material-ui
import { MenuItem, Select, SelectChangeEvent, Stack, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// third-party
import { Props as ChartProps } from 'react-apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function a11yProps(index: number) {
  return {
    id: `project-owner-statistics-tab-${index}`,
    'aria-controls': `project-owner-statistics-tabpanel-${index}`
  };
}

// chart options
const areaChartOptions = {
  chart: {
    height: 355,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 1
  },
  grid: {
    show: true,
    borderColor: '#90A4AE',
    strokeDashArray: 0,
    position: 'back',
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  }
};

// ==============================|| INCOME LINE CHART ||============================== //

interface Props {
  slot: string;
}

const Chart = ({ slot }: Props) => {
  const theme = useTheme();
  const { mode } = useConfig();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        y: {
          formatter(val: number) {
            return `$ ${val}`;
          }
        }
      },
      theme: {
        mode: 'light'
      }
    }));
  }, [mode, primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'Income',
      data: [0, 86, 28, 115, 48, 210, 136]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Income',
        data: slot === 'month' ? [90, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [21, 40, 28, 51, 42, 109, 100]
      }
    ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={355} />;
};

// ==============================|| STATISTICS CARD ||============================== //

const StatisticsCard = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [filter, setFilter] = useState<number>(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(Number(event.target.value));
  };

  return (
    <MainCard title="Statistics">
      <Stack direction="row" justifyContent="space-between">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="project owner dashboard statistics tabs">
          <Tab label="Investors" {...a11yProps(0)} />
          <Tab label="Projects" {...a11yProps(1)} />
        </Tabs>
        <Select
          value={filter.toString()}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Project Owner Statistics Filter' }}
        >
          <MenuItem value={0}>This Month</MenuItem>
          <MenuItem value={2}>This Year</MenuItem>
          <MenuItem value={3}>All</MenuItem>
        </Select>
      </Stack>
      <Chart slot="month" />
    </MainCard>
  );
};

export default StatisticsCard;
