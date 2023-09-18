import { useRef, useState } from 'react';

// next
import NextLink from 'next/link';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';

// material-ui
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  InputLabel
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { InboxOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
import MainCard from 'components/MainCard';

// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

const columns: ColumnProps[] = [
  { id: 'projectName', label: 'Project Name', minWidth: 20, align: 'left' },
  { id: 'tokenSymbol', label: 'Token Symbol', minWidth: 12, align: 'center' },
  { id: 'decimal', label: 'Token Decimals', minWidth: 12, align: 'center' },
  { id: 'tokenPrice', label: 'Token Price', minWidth: 12, align: 'center' },
  { id: 'tokenBalance', label: 'Token Balance', minWidth: 12, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 12, align: 'center' },
  { id: 'scan', label: 'Scan', minWidth: 20, align: 'center' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function TransactionHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [totalRows /*, setTotalRows*/] = useState<number>(0);
  const [stoOpen, setStoOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const { currentPage, jump } = usePagination(0, 25);
  const [rows /*, setRows*/] = useState<any[]>([]);
  // const router = useRouter();
  // const { data: session } = useSession();

  // useEffect(() => {
  //   fetch('/api/project')
  //     .then(async (res) => {
  //       const { total: totalRows, data: _rows } = await res.json();
  //       if (totalRows) {
  //         setTotalRows(totalRows);
  //         setRows(_rows);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, [router, session]);

  const handleStoLaunchClick = (id: string) => {
    setStoOpen(true);
  };

  const handleStoClose = () => {
    setStoOpen(false);
  };

  const handleStartDateChange = (value: any) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: any) => {
    setEndDate(value);
  };

  const handleLaunch = () => {
    setStoOpen(false);
  };

  return (
    <MainCard tile="Transaction History">
      <Box>
        <TableContainer ref={headRowRef}>
          <Table stickyHeader aria-label="transaction table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      minWidth: ((headRowRef.current?.clientWidth || 1200) * column.minWidth) / 100 - 24,
                      position: 'sticky !important'
                    }}
                    key={`project-owner-wallet-transaction-history-header-${column.id}`}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* FormDialog.tsx */}
            <Dialog open={stoOpen} onClose={handleStoClose}>
              <Box sx={{ p: 1, py: 1.5 }}>
                <DialogTitle>Launch STO</DialogTitle>
                <DialogContent>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Stack spacing={0.5}>
                          <InputLabel>Start Date</InputLabel>
                          <DatePicker value={startDate} onChange={handleStartDateChange} />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={0.5}>
                          <InputLabel>End Date</InputLabel>
                          <DatePicker value={endDate} onChange={handleEndDateChange} />
                        </Stack>
                      </Grid>
                    </Grid>
                  </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                  <Button color="error" onClick={handleStoClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleLaunch}>
                    Launch STO
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>

            <TableBody>
              {rows.map((row: KeyedObject, _index) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`project-owner-wallet-transaction-history-row-${_index}`}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`project-owner-wallet-transaction-history-row-${_index}-cell-${column.id}`} align={column.align}>
                        {column.id === 'projectName' && (
                          <Typography>
                            {value}{' '}
                            <Typography variant="body2" color="text.secondary" component="span">
                              {row.tokenization['tokenName']}
                            </Typography>
                          </Typography>
                        )}
                        {column.id === 'tokenSymbol' && row.tokenization.tokenSymbol}
                        {column.id === 'decimal' && row.tokenization.decimal}
                        {column.id === 'tokenPrice' && row.tokenization.assetValue / (row.tokenization.tonnage * 1000)}
                        {column.id === 'action' &&
                          (value === false ? (
                            <Button onClick={() => handleStoLaunchClick(row['id'])}>
                              <Typography>Launch STO</Typography>
                            </Button>
                          ) : (
                            <Typography color="green" fontWeight={600}>
                              STO initialized
                            </Typography>
                          ))}
                        {column.id === 'scan' && (
                          <NextLink href={value || ''} passHref legacyBehavior>
                            <Link>
                              <Typography color="purple">Polygonscan</Typography>
                            </Link>
                          </NextLink>
                        )}
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
    </MainCard>
  );
}
