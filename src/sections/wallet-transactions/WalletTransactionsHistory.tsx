import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import {
  Box,
  Divider,
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
  IconButton,
  useTheme,
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
  { id: 'username', label: 'User Name', minWidth: 15, align: 'center' },
  { id: 'usdAmount', label: 'Amount(USD)', minWidth: 10, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 15, align: 'center' },
  { id: 'createdAt', label: 'Date', minWidth: 15, align: 'center' },
  { id: 'txHash', label: 'Scan', minWidth: 15, align: 'center' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function WalletTransactionsHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

  return (
    <MainCard>
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
                    key={`investor-wallet-transaction-history-header-${column.id}`}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: KeyedObject, _index) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`investor-wallet-transaction-history-row-${_index}`}>
                  {!isLoading &&
                    columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={`investor-wallet-transaction-history-row-${_index}-cell-${column.id}`} align={column.align}>
                          {column.id === 'id' && <Typography>{(currentPage - 1) * 25 + _index + 1}</Typography>}
                          {column.id === 'txHash' && (
                            <NextLink href={`https://goerli.etherscan.io/tx/${row.txHash}`} passHref legacyBehavior>
                              <Link target="_blank">
                                <IconButton>
                                  <LinkIcon style={{ color: theme.palette.primary.main }} />
                                </IconButton>
                              </Link>
                            </NextLink>
                          )}
                          {column.id === 'createdAt' && <Typography>{formatDate(value)}</Typography>}
                          {column.id === 'usdAmount' && <Typography>{row.value}</Typography>}
                          {column.id !== 'mrnOrMAT' &&
                            column.id !== 'txHash' &&
                            column.id !== 'createdAt' &&
                            (column.format ? column.format(value) : value)}
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
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
