import { useState, ReactElement, useEffect, useRef, ChangeEvent } from 'react';

// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// material-ui
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Pagination,
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
  Typography,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { EyeOutlined, InboxOutlined, SearchOutlined } from '@ant-design/icons';

import { HourglassEmpty, HowToReg } from '@mui/icons-material';
// project import
import Layout from 'layout';
import Page from 'components/Page';
import usePagination from 'hooks/usePagination';

// types
import { KeyedObject } from 'types/root';
import formatDate from 'utils/formatDate';

// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

const columns: ColumnProps[] = [
  { id: 'id', label: 'S.No.', minWidth: 5, align: 'left' },
  { id: 'fullname', label: 'Name', minWidth: 8, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 15, align: 'center' },
  { id: 'phoneNumber', label: 'Phone', minWidth: 13, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 13, align: 'center' },
  {
    id: 'createdAt',
    label: 'Created at',
    minWidth: 10,
    align: 'center',
    format: (date) => formatDate(date)
  },
  { id: 'view', label: 'View', minWidth: 12, align: 'left' }
];

// ==============================|| INVESTORS ||============================== //

const KYC = () => {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<number>(3);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const { currentPage, jump } = usePagination(100, 25);
  const [search, setSearch] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/kyc/all?page=${currentPage}`)
      .then(async (res) => {
        if (res.status === 200) {
          const { total: totalRows, data: _rows } = await res.json();
          if (totalRows) {
            setRows(_rows);
            setTotalRows(totalRows);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage, router]);

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(Number(event.target.value));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Page title="Investors">
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
            )
          }}
        />
        <Box>
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
      <Box mt={4}>
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
              {rows &&
                rows.map((row: KeyedObject, _index) => (
                  <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`investors-table-row-${_index}`}>
                    {columns.map((column) => {
                      let value;
                      if (column.id === 'fullname') value = row.user.firstName + ' ' + row.user.lastName;
                      if (column.id === 'email') value = row.user.email;
                      if (column.id === 'phoneNumber') value = row.user.phoneNumber;
                      if (column.id === 'createdAt') value = row.createdAtMs;
                      if (column.id === 'status') value = row.reviewStatus;

                      return (
                        <TableCell key={`investors-table-row-${_index}-cell-${column.id}`} align={column.align}>
                          {column.id === 'id' && Number(_index + (currentPage - 1) * 25 + 1)}
                          {column.id === 'email' && <Link href={`mailto:${value}`}>{value}</Link>}
                          {(column.id === 'status' && value === 'init' && (
                            <Tooltip title="Pending">
                              <HourglassEmpty />
                            </Tooltip>
                          )) ||
                            (value === 'completed' && (
                              <Tooltip title="Approved">
                                <HowToReg />
                              </Tooltip>
                            ))}
                          {column.id === 'view' && (
                            <NextLink href={`/admin/kyc/${row.applicantId}`} passHref legacyBehavior>
                              <Link>
                                <Tooltip title="Detail">
                                  <IconButton size="medium">
                                    <EyeOutlined style={{ color: 'white' }} />
                                  </IconButton>
                                </Tooltip>
                              </Link>
                            </NextLink>
                          )}
                          {column.id !== 'id' &&
                            column.id !== 'email' &&
                            column.id !== 'status' &&
                            column.id !== 'view' &&
                            (column.format ? column.format(value) : value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* table pagination */}
        {isLoading && (
          <Stack alignItems="center">
            <CircularProgress color="primary" />
          </Stack>
        )}
        {!isLoading && (!rows || rows.length === 0) ? (
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
      </Box>
    </Page>
  );
};

KYC.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KYC;
