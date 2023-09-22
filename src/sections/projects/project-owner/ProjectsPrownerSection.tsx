import { ChangeEvent, useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';
// material-ui
import {
  Link,
  Button,
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
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  TextField,
  InputAdornment,
  FormHelperText,
  CircularProgress,
  Tooltip
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { EyeOutlined, InboxOutlined, PlusOutlined, CreditCardOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
import { enqueueSnackbar } from 'notistack';
import { useCurrentBalance } from 'hooks/useCurrentBalance';
import numberFormat from 'utils/numberFormat';

// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

const columns: ColumnProps[] = [
  { id: 'id', label: 'S.No.', minWidth: 3, align: 'left' },
  { id: 'projectName', label: 'Project Name', minWidth: 12, align: 'left' },
  { id: 'vesselType', label: 'Project Category', minWidth: 13, align: 'left' },
  { id: 'allowance', label: 'Status', minWidth: 13, align: 'left' },
  { id: 'createdAt', label: 'Created At', minWidth: 12, align: 'left' },
  { id: 'withdrawalRequest', label: 'Investments / Withdrawals', minWidth: 20, align: 'left' },
  { id: 'rewards', label: 'Rewards', minWidth: 20, align: 'left' },
  { id: 'action', label: '', minWidth: 7, align: 'left' }
];

type WithdrawDialogProps = {
  open: boolean;
  handleClose: () => void;
  data: any;
};

const DepositDialog = ({ open, handleClose, data }: WithdrawDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [value, setValue] = useState<string>('');
  const { balance } = useCurrentBalance();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const handleSubmit = () => {
    if (/^[0-9]*$/.test(value)) {
      if (Number(value) > balance) {
        setError('Insufficient balance');
        return;
      }
      setError(undefined);
      setSubmitting(true);
      fetch(`/api/project/deposit?projectId=${data._doc ? data._doc._id : data._id}&amount=${value}`).then((res) => {
        if (res.status === 200) {
          enqueueSnackbar(`Successfully deposit.`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
          handleClose();
        } else {
          enqueueSnackbar('Deposit failed.', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        }
        setSubmitting(false);
      });
    } else {
      setError('Invalid request amount');
    }
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle id="responsive-dialog-title">Deposit revenues</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack spacing={3} justifyContent="space-between" direction="row">
              <Box>
                <InputLabel>Given rewards</InputLabel>
                <Typography>$ {data.givenRewards}</Typography>
              </Box>
              <Box>
                <InputLabel>Your balance</InputLabel>
                <Typography>$ {balance}</Typography>
              </Box>
            </Stack>
            <Stack spacing={1}>
              <InputLabel>Rewards to deposit</InputLabel>
              <TextField
                fullWidth
                error={error !== undefined}
                value={value}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
              <FormHelperText error>{error}</FormHelperText>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} autoFocus disabled={isSubmitting}>
            Deposit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

const WithdrawDialog = ({ open, handleClose, data }: WithdrawDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  // const [value, setValue] = useState<string>('');

  // const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
  //   setValue(ev.target.value);
  // };

  const handleSubmit = () => {
    setError(undefined);
    setSubmitting(true);
    fetch(`/api/project/withdraw?projectId=${data._doc ? data._doc._id : data._id}`).then((res) => {
      if (res.status === 200) {
        enqueueSnackbar(`Successfully requested.`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
        handleClose();
      } else {
        enqueueSnackbar('Withdrawal request failed.', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      }
      setSubmitting(false);
    });
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle id="responsive-dialog-title">Withdrawal request</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1}>
                <InputLabel>Project investments</InputLabel>
                <Typography>$ {data.investments || 0}</Typography>
              </Stack>
              <Stack spacing={1}>
                <InputLabel>Current withdrawal</InputLabel>
                <Typography>$ {data.withdrawals || 0}</Typography>
              </Stack>
            </Stack>
            {/* <Stack spacing={1}>
              <InputLabel>Withdrawal request</InputLabel>
              <TextField
                fullWidth
                error={error !== undefined}
                value={value}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Stack> */}
            <FormHelperText error>{error}</FormHelperText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} autoFocus disabled={isSubmitting}>
            Request
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

const ProjectsPrownerSection = () => {
  const [filter, setFilterChange] = useState<number>(3);
  const headRowRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const [totalRows, setTotalRows] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState<boolean>(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentRow, setCurrentRow] = useState<any>({});

  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    setLoading(true);
    fetch('/api/project').then(async (res) => {
      const { total: totalRows, data: _rows } = await res.json();
      if (totalRows) {
        setTotalRows(totalRows);
        setRows(_rows);
      }
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const allowance: string = event.target.value;
    setFilterChange(Number(allowance));
    setLoading(true);
    setTotalRows(0);
    setRows([]);
    console.log(allowance);
    const query = `/api/project${Number(allowance) !== 3 ? `?allowance=${allowance}` : ''}`;
    console.log(query);
    fetch(query).then(async (res) => {
      const { total: totalRows, data: _rows } = await res.json();
      if (totalRows) {
        setTotalRows(totalRows);
        setRows(_rows);
      }
      setLoading(false);
    });
  };

  const handleClose = () => {
    setWithdrawDialogOpen(false);
    setDepositDialogOpen(false);
  };

  const handleWithdrawOpen = (row: any) => {
    setCurrentRow(row);
    setWithdrawDialogOpen(true);
  };

  const handleDepositOpen = (row: any) => {
    setCurrentRow(row);
    setDepositDialogOpen(true);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" mb={1} justifyContent="space-between" alignItems="center">
        <NextLink href="/projects/add" passHref legacyBehavior>
          <Link>
            <Button variant="contained" startIcon={<PlusOutlined />}>
              New Project
            </Button>
          </Link>
        </NextLink>

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
            {rows.map((row: KeyedObject, _index) => (
              <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`${row.projectName}-${_index}`}>
                {columns.map((column) => {
                  const value = row._doc ? row._doc[column.id] : row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'id' && currentPage * 25 + _index - 24}
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
                        <NextLink href={`/projects/${row._doc ? row._doc._id : row._id}`} passHref legacyBehavior>
                          <Tooltip title={'Detail'}>
                            <Link>
                              <EyeOutlined />
                            </Link>
                          </Tooltip>
                        </NextLink>
                      )}
                      {column.id === 'withdrawalRequest' && row._doc && (
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" pr={2}>
                          <Box>
                            {row.withdrawalRequest === 'undefined' && (
                              <Typography>
                                $ {numberFormat(Number(row.investments)) || 0} / $ {numberFormat(Number(row.withdrawals)) || 0}
                              </Typography>
                            )}
                            {row.withdrawalRequest === true && <Typography color={theme.palette.error.main}>Failed</Typography>}
                            {row.withdrawalRequest === false && <Typography color={theme.palette.warning.main}>Pending</Typography>}
                          </Box>
                          {Number(row.investments) > Number(row.withdrawals) && Boolean(row.withdrawalRequest) !== false && (
                            <Button variant="contained" onClick={() => handleWithdrawOpen(row)}>
                              Withdraw
                            </Button>
                          )}
                          <WithdrawDialog open={withdrawDialogOpen} handleClose={handleClose} data={currentRow} />
                        </Stack>
                      )}
                      {column.id === 'rewards' && row._doc && (
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" pr={2}>
                          <Typography>$ {numberFormat(Number(row.givenRewards))}</Typography>
                          <Tooltip title="Deposit">
                            <CreditCardOutlined style={{ color: theme.palette.primary.main }} onClick={() => handleDepositOpen(row)} />
                          </Tooltip>
                          <DepositDialog open={depositDialogOpen} handleClose={handleClose} data={currentRow} />
                        </Stack>
                      )}
                      {column.id === 'createdAt' && <Typography>{new Date(value).toLocaleDateString()}</Typography>}
                      {column.id !== 'id' &&
                        column.id !== 'allowance' &&
                        column.id !== 'action' &&
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
        <Stack alignItems="center">
          <CircularProgress color="primary" />
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
    </Stack>
  );
};

export default ProjectsPrownerSection;
