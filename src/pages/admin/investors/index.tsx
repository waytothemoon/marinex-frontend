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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { EyeOutlined, InboxOutlined, SearchOutlined } from '@ant-design/icons';

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
  { id: 'id', label: 'S.No.', minWidth: 5, align: 'left' },
  { id: 'firstName', label: 'First Name', minWidth: 8, align: 'center' },
  { id: 'middlename', label: 'Middle Name', minWidth: 8, align: 'center' },
  { id: 'lastName', label: 'Last Name', minWidth: 8, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 15, align: 'center' },
  { id: 'phoneNumber', label: 'Phone', minWidth: 13, align: 'center' },
  { id: 'referralCode', label: 'Referral Code', minWidth: 8, align: 'center' },
  {
    id: 'createdAt',
    label: 'Created at',
    minWidth: 10,
    align: 'center',
    format: (date) => new Date(date).toDateString()
  },
  { id: 'status', label: 'Status', minWidth: 9, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 12, align: 'left' }
];

// ==============================|| INVESTORS ||============================== //

const Investors = () => {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<number>(3);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const { currentPage, jump } = usePagination(100, 25);
  const [search, setSearch] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const fetchInvestors = () => {
      fetch(`/api/user/investor?page=${currentPage}`)
        .then(async (res) => {
          if (res.status === 200) {
            const { total: totalRows, data: _rows } = await res.json();
            if (totalRows) {
              setRows(_rows);
              setTotalRows(totalRows);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchInvestors();
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
                <SearchOutlined style={{ color: '#83F1AA' }} />
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
              {rows.map((row: KeyedObject, _index) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`investors-table-row-${_index}`}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`investors-table-row-${_index}-cell-${column.id}`} align={column.align}>
                        {column.id === 'id' && Number(_index + (currentPage - 1) * 25 + 1)}
                        {column.id === 'email' && <Link href={`mailto:${value}`}>{value}</Link>}
                        {column.id === 'status' && (
                          <Typography variant="body1" color="blue" textAlign="center">
                            <Switch checked={value} color="success" />
                          </Typography>
                        )}
                        {column.id === 'action' && (
                          <NextLink href={`/admin/investors/${row._id}`} passHref legacyBehavior>
                            <Link>
                              <IconButton size="medium">
                                <EyeOutlined style={{ color: 'white' }} />
                              </IconButton>
                            </Link>
                          </NextLink>
                        )}
                        {column.id !== 'id' &&
                          column.id !== 'email' &&
                          column.id !== 'status' &&
                          column.id !== 'action' &&
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
      </Box>
    </Page>
  );
};

Investors.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Investors;
