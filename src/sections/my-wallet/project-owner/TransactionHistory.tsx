import { useEffect, useRef, useState } from 'react';

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
  InputLabel,
  CircularProgress,
  IconButton,
  useTheme
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';
import LinkIcon from '@mui/icons-material/Link';

// assets
import { InboxOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
import MainCard from 'components/MainCard';
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
  { id: 'id', label: 'T.NO', minWidth: 10, align: 'left' },
  { id: 'usdAmount', label: 'Amount(USD)', minWidth: 12, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 12, align: 'center' },
  { id: 'createdAt', label: 'Date', minWidth: 20, align: 'center' },
  { id: 'scan', label: 'Scan', minWidth: 20, align: 'center' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function TransactionHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [stoOpen, setStoOpen] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { currentPage, jump } = usePagination(0, 25);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // fetch('api/transaction').
    setLoading(true);
    fetch(`/api/transaction?page=${currentPage}`)
      .then(async (res) => {
        if (res.status === 200) {
          let result = await res.json();
          console.log(result);
          setRows(result.data);
          setTotalRows(result.total);
          setLoading(false);
        } else {
          setRows([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setRows([]);
        setLoading(false);
      });
  }, [currentPage]);

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
                  {!isLoading &&
                    columns.map((column) => {
                      return (
                        <TableCell key={`project-owner-wallet-transaction-history-row-${_index}-cell-${column.id}`} align={column.align}>
                          {column.id === 'id' && <Typography>{(currentPage - 1) * 25 + _index + 1}</Typography>}
                          {column.id === 'action' && row.action}
                          {column.id === 'usdAmount' && row.value}
                          {column.id === 'scan' && (
                            <NextLink href={`https://goerli.etherscan.io/tx/${row.txHash}`} passHref legacyBehavior>
                              <Link target="_blank">
                                <IconButton>
                                  <LinkIcon style={{ color: theme.palette.primary.main }} />
                                </IconButton>
                              </Link>
                            </NextLink>
                          )}
                          {column.id === 'createdAt' && formatDate(row.createdAt)}
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
            <CircularProgress />
          </Stack>
        )}
        {!isLoading && rows.length === 0 ? (
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
