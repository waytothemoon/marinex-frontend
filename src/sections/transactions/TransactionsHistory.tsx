import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import {
  Box,
  Link,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  IconButton,
  CircularProgress
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
  { id: 'action', label: 'Action', minWidth: 10, align: 'center' },
  { id: 'tokenName', label: 'Token Name', minWidth: 10, align: 'center' },
  { id: 'usdAmount', label: 'Amount(USD)', minWidth: 10, align: 'center' },
  { id: 'createdAt', label: 'Date', minWidth: 10, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 10, align: 'center' },
  { id: 'txHash', label: 'txHash', minWidth: 10, align: 'center' }
];

// ==============================|| FINANCIAL TRANSACTIONS HISTORY ||============================== //

export default function TransactionsHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/transaction?page=${currentPage}&txType=${'wallet'}`)
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
                    key={`project-transaction-wallet-transaction-history-header-${column.id}`}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row: KeyedObject, _index) => (
                <TableRow
                  sx={{ py: 3 }}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`project-transaction-wallet-transaction-history-row-${_index}`}
                >
                  {!isLoading &&
                    columns.map((column) => {
                      let value;
                      if (column.id === 'id') {
                        value = (currentPage - 1) * 25 + _index + 1;
                      }
                      if (column.id === 'action') {
                        value = row['action'];
                      }
                      if (column.id === 'tokenName') {
                        if (row['projectId']) value = row['projectId']['tokenization']['tokenName'];
                        else value = 'Not Project Transaction';
                      }
                      if (column.id === 'usdAmount') {
                        value = row['value'];
                      }
                      if (column.id === 'date') {
                        value = formatDate(row['createdAt']);
                      }
                      if (column.id === 'action') {
                        value = row['action'];
                      }
                      if (column.id === 'txHash') {
                        value = row['txHash'];
                      }
                      if (column.id === 'createdAt') {
                        value = formatDate(row['createdAt']);
                      }
                      if (column.id === 'status') {
                        value = 2;
                      }
                      return (
                        <TableCell
                          key={`project-transaction-wallet-transaction-history-row-${_index}-cell-${column.id}`}
                          align={column.align}
                        >
                          {column.id === 'txHash' && (
                            <NextLink href={`https://goerli.etherscan.io/tx/${value}`} passHref legacyBehavior>
                              <Link target="_blank">
                                <IconButton>
                                  <LinkIcon style={{ color: theme.palette.primary.main }} />
                                </IconButton>
                              </Link>
                            </NextLink>
                          )}
                          {column.id === 'status' && (
                            <Typography
                              color={
                                value === 0
                                  ? theme.palette.warning.main
                                  : value === 1
                                  ? theme.palette.error.main
                                  : theme.palette.success.main
                              }
                            >
                              {value === 0 ? 'Pending' : value === 1 ? 'Failed' : 'Confirmed'}
                            </Typography>
                          )}
                          {column.id === 'tokenName' && (
                            <Typography color={value === 'Not Project Transaction' ? 'red' : theme.palette.success.main}>
                              {value}
                            </Typography>
                          )}
                          {column.id !== 'txHash' &&
                            column.id !== 'status' &&
                            column.id !== 'tokenName' &&
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
            <CircularProgress />
          </Stack>
        )}
        {isLoading === false && rows.length === 0 ? (
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
