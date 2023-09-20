import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import {
  Box,
  Button,
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
  useTheme
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
  { id: 'projectName', label: 'Project Name', minWidth: 10, align: 'left' },
  { id: 'tokenName', label: 'Token Name', minWidth: 12.5, align: 'center' },
  { id: 'tokens', label: 'Token(s)', minWidth: 10, align: 'center' },
  { id: 'tokenPrice', label: 'Token Price', minWidth: 10, align: 'center' },
  { id: 'usdAmount', label: 'Amount(USD)', minWidth: 10, align: 'center' },
  { id: 'tokenAddress', label: 'Token Address', minWidth: 12.5, align: 'center' },
  { id: 'txHash', label: 'txHash', minWidth: 12.5, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 10, align: 'center' },
  { id: 'createdAt', label: 'Created At', minWidth: 12.5, align: 'center' }
];

const rows: any[] = [];

// ==============================|| FINANCIAL TRANSACTIONS HISTORY ||============================== //

export default function FinancialTransactionsHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    setTotalRows(100);
  }, []);

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
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`project-transaction-wallet-transaction-history-row-${_index}-cell-${column.id}`}
                        align={column.align}
                      >
                        {column.id === 'tokenAddress' && (
                          <NextLink href={value} passHref legacyBehavior>
                            <Link>
                              <Button>Polygonscan</Button>
                            </Link>
                          </NextLink>
                        )}
                        {column.id === 'txHash' && (
                          <NextLink href={value} passHref legacyBehavior>
                            <Link>
                              <Button>Polygonscan</Button>
                            </Link>
                          </NextLink>
                        )}
                        {column.id === 'status' && (
                          <Typography
                            color={
                              value === 0 ? theme.palette.warning.main : value === 1 ? theme.palette.error.main : theme.palette.success.main
                            }
                          >
                            {value === 0 ? 'Pending' : value === 1 ? 'Failed' : 'Confirmed'}
                          </Typography>
                        )}
                        {column.id !== 'tokenAddress' &&
                          column.id !== 'txHash' &&
                          column.id !== 'status' &&
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
