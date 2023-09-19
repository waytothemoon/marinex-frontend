import { useState, ReactElement, useEffect, useRef, ChangeEvent } from 'react';

// material-ui
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import { InboxOutlined, SearchOutlined } from '@ant-design/icons';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import usePagination from 'hooks/usePagination';

// types
import { KeyedObject } from 'types/root';

// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

const columns: ColumnProps[] = [
  { id: 'step', label: 'Step', minWidth: 25, align: 'left' },
  { id: 'earn', label: 'Earn', minWidth: 25, align: 'left' },
  { id: 'status', label: 'Status', minWidth: 25, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 25, align: 'left' }
];

const rows: any[] = [];

// ==============================|| TestingMilestones ||============================== //

const TestingMilestones = () => {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<number>(3);
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    setTotalRows(100);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(Number(event.target.value));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Page title="Pagination Table">
      <Stack mb={2} direction="row" spacing={2}>
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
            style: {
              backgroundColor: 'white'
            }
          }}
        />
        <Box bgcolor="white">
          <Select
            style={{ minWidth: 180 }}
            value={filter.toString()}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={3}>All</MenuItem>
            <MenuItem value={0}>Pending</MenuItem>
            <MenuItem value={1}>Rejected</MenuItem>
            <MenuItem value={2}>Approved</MenuItem>
          </Select>
        </Box>
      </Stack>
      <Paper>
        {/* table */}
        <TableContainer ref={headRowRef}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      minWidth: ((headRowRef.current?.clientWidth || 1200) * column.minWidth) / 100 - 24,
                      position: 'sticky !important'
                    }}
                    key={`investors-table-header-${column.id}`}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: KeyedObject, _index) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`investors-table-row-${_index}`}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`investors-table-row-${_index}-cell-${column.id}`} align={column.align}>
                        {column.id === 'step' && <Typography fontWeight="bold">{value}</Typography>}
                        {column.id === 'status' && (
                          <Typography variant="body1" color={value ? 'green' : 'black'}>
                            {value ? 'Completed' : 'Pending'}
                          </Typography>
                        )}
                        {column.id === 'action' &&
                          (value ? (
                            <Button variant="contained" color="primary">
                              Start
                            </Button>
                          ) : (
                            ''
                          ))}
                        {column.id === 'earn' && (column.format ? column.format(value) : value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* table pagination */}
        {rows.length === 0 ? (
          <Stack alignItems="center">
            <Stack spacing={1} my={3} style={{ opacity: 0.6 }}>
              <InboxOutlined color="textSecondary" style={{ fontSize: '300%', color: 'gray', fontWeight: 300 }} />
              <Typography color="textSecondary" align="center">
                No data
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack alignItems="end" mt={2}>
            <Pagination
              count={Math.ceil(totalRows / 25)}
              page={currentPage}
              onChange={(_, _page) => jump(_page)}
              variant="contained"
              color="primary"
              shape="circular"
            />
          </Stack>
        )}
      </Paper>
    </Page>
  );
};

TestingMilestones.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TestingMilestones;
