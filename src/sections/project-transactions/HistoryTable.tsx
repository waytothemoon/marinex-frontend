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
  { id: 'id', label: 'T.NO', minWidth: 5, align: 'left' },
  { id: 'projectName', label: 'Project Name', minWidth: 5, align: 'left' },
  { id: 'transactionType', label: 'Transaction Type', minWidth: 15, align: 'center' },
  { id: 'amount', label: 'Amount', minWidth: 15, align: 'center' },
  { id: 'createdAt', label: 'Date', minWidth: 12.5, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 7.5, align: 'center' },
  { id: 'txHash', label: 'txHash', minWidth: 25, align: 'center' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function HistoryTable() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // fetch('api/transaction').
    setLoading(true);
    fetch(`/api/transaction?page=${currentPage}&txType=project`)
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
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={`project-transaction-wallet-transaction-history-row-${_index}-cell-${column.id}`}
                          align={column.align}
                        >
                          {column.id === 'id' && <Typography>{(currentPage - 1) * 25 + _index + 1}</Typography>}
                          {column.id === 'projectName' && (
                            <Typography color={theme.palette.primary.main}>{row.projectId.projectName}</Typography>
                          )}
                          {column.id === 'amount' && (
                            <Typography color={row.value === 0 ? theme.palette.error.main : theme.palette.primary.main}>
                              {row.value}
                            </Typography>
                          )}
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
                          {column.id === 'transactionType' && <Typography>{row.action}</Typography>}
                          {column.id === 'createdAt' && <Typography>{formatDate(row.createdAt)}</Typography>}
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
