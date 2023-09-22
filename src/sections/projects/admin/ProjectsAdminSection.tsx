import { ChangeEvent, useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import {
  Link,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  SelectChangeEvent,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { EyeOutlined, InboxOutlined, SearchOutlined } from '@ant-design/icons';

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
  { id: 'projectName', label: 'Project Name', minWidth: 10, align: 'left' },
  { id: 'projectOwner', label: 'Project Owner', minWidth: 10, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 10, align: 'left' },
  { id: 'vesselType', label: 'Project Category', minWidth: 10, align: 'left' },
  { id: 'tokenization', label: 'Tokenization', minWidth: 10, align: 'left' },
  { id: 'allowance', label: 'Status', minWidth: 5, align: 'left' },
  { id: 'createdAt', label: 'Created At', minWidth: 10, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 5, align: 'left' },
  { id: 'withdrawalRequest', label: 'Withdrawal Request', minWidth: 20, align: 'left' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

const ProjectsAdminSection = () => {
  const [filter, setFilterChange] = useState<number>(3);
  const [search, setSearch] = useState<string>('');
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/project')
      .then(async (res) => {
        const { total: totalRows, data: _rows } = await res.json();
        if (totalRows) {
          console.log(_rows);
          setTotalRows(totalRows);
          setRows(_rows);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const allowance = Number(event.target.value);
    setFilterChange(allowance);
    setLoading(true);
    const query = `/api/project${Number(allowance) !== 3 ? `?allowance=${allowance}` : ''}`;
    fetch(query)
      .then(async (res) => {
        const { total: totalRows, data: _rows } = await res.json();
        if (totalRows) {
          console.log(_rows);
          setTotalRows(totalRows);
          setRows(_rows);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="end">
        <TextField
          value={search}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined style={{ color: 'white' }} />
              </InputAdornment>
            )
          }}
        />
        <Select
          style={{ width: 140 }}
          value={filter.toString()}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Project Owner Statistics Filter' }}
        >
          <MenuItem value={3}>All</MenuItem>
          <MenuItem value={1}>Approved</MenuItem>
          <MenuItem value={0}>Pending</MenuItem>
          <MenuItem value={2}>Rejected</MenuItem>
        </Select>
      </Stack>
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
                  key={column.id}
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
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`${row.projectName}-${_index}`}>
                  {columns.map((column) => {
                    const value = row._doc ? row._doc[column.id] : row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'id' && currentPage * 25 + _index - 24}
                        {column.id === 'email' && (
                          <Link href={`mailto:${row._doc ? row._doc.projectOwner.email : row.projectOwner.email}`}>
                            {row._doc ? row._doc.projectOwner.email : row.projectOwner.email}
                          </Link>
                        )}
                        {column.id === 'projectOwner' &&
                          `${row._doc ? row._doc.projectOwner.firstName : row.projectOwner.firstName} ${
                            row._doc ? row._doc.projectOwner.lastName : row.projectOwner.lastName
                          }`}
                        {column.id === 'tokenization' && (
                          <Typography color={!value ? theme.palette.error.main : theme.palette.success.main}>
                            {value ? 'Tokenized' : 'Not Tokenized'}
                          </Typography>
                        )}
                        {column.id === 'allowance' && (
                          <Typography
                            color={
                              value === 0 ? theme.palette.warning.main : value == 2 ? theme.palette.error.main : theme.palette.success.main
                            }
                          >
                            {value === 0 ? 'Pending' : value == 2 ? 'Rejected' : 'Approved'}
                          </Typography>
                        )}
                        {column.id === 'action' && (
                          <NextLink href={`/admin/projects/${row._doc ? row._doc._id : row._id}`} passHref legacyBehavior>
                            <Link>
                              <EyeOutlined />
                            </Link>
                          </NextLink>
                        )}
                        {column.id === 'createdAt' && <Typography>{new Date(value).toLocaleDateString()}</Typography>}
                        {column.id === 'withdrawalRequest' && row._doc && (
                          <>
                            {row.withdrawalRequest === true && <Typography color={theme.palette.error.main}>Failed</Typography>}
                            {row.withdrawalRequest === false && <Typography color={theme.palette.warning.main}>Pending</Typography>}
                          </>
                        )}
                        {column.id !== 'projectOwner' &&
                          column.id !== 'email' &&
                          column.id !== 'allowance' &&
                          column.id !== 'action' &&
                          column.id !== 'tokenization' &&
                          column.id !== 'withdrawalRequest' &&
                          column.id !== 'createdAt' &&
                          value}
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
        <Stack alignItems="center" mt={5}>
          <CircularProgress color="primary" />
        </Stack>
      )}
      {!isLoading && rows && rows.length === 0 ? (
        <Stack alignItems="center">
          <Stack spacing={1} my={3} style={{ opacity: 0.6 }}>
            <InboxOutlined color="textSecondary" style={{ fontSize: '300%', color: 'gray', fontWeight: 300 }} />
            <Typography color="textSecondary" align="center">
              No data
            </Typography>
          </Stack>
        </Stack>
      ) : (
        !isLoading && (
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
        )
      )}
    </Stack>
  );
};

export default ProjectsAdminSection;
