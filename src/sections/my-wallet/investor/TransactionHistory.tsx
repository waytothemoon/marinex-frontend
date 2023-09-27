import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
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
  IconButton,
  CircularProgress
} from '@mui/material';

// projects
import LinkIcon from '@mui/icons-material/Link';
import usePagination from 'hooks/usePagination';

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
  { id: 'id', label: 'T.NO', minWidth: 20, align: 'left' },
  { id: 'usdAmount', label: 'Amount(USD)', minWidth: 15, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 15, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 20, align: 'center' },
  { id: 'scan', label: 'Scan', minWidth: 15, align: 'center' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function TransactionHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  useEffect(() => {
    // fetch('api/transaction').
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
                    key={`investor-wallet-transaction-history-header-${column.id}`}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading &&
                rows.map((row: KeyedObject, _index) => (
                  <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`investor-wallet-transaction-history-row-${_index}`}>
                    {columns.map((column) => {
                      let value;
                      if(column.id === 'id') {
                        value = Number(_index + (currentPage - 1) * 25 + 1);
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
                      if (column.id === 'scan') {
                        value = row['txHash'];
                      }
                      return (
                        <TableCell key={`investor-wallet-transaction-history-row-${_index}-cell-${column.id}`} align={column.align}>
                          {column.id === 'scan' && (
                            <NextLink href={`https://goerli.etherscan.io/tx/${value}`} passHref legacyBehavior>
                              <Link target="_blank">
                                <IconButton>
                                  <LinkIcon style={{ color: theme.palette.primary.main }} />
                                </IconButton>
                              </Link>
                            </NextLink>
                          )}
                          {column.id !== 'musdOrMAT' && column.id !== 'scan' && (column.format ? column.format(value) : value)}
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
