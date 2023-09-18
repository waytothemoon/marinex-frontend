import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import {
  Box,
  Divider,
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
  { id: 'itemName', label: 'Item Name', minWidth: 15, align: 'left' },
  { id: 'initiatorName', label: 'Initiator Name', minWidth: 15, align: 'left' },
  { id: 'mrnOrMAT', label: 'MRN/MATH', minWidth: 15, align: 'center' },
  { id: 'usdAmount', label: 'Amount(USD)', minWidth: 10, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 15, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 15, align: 'center' },
  { id: 'scan', label: 'Scan', minWidth: 15, align: 'center' }
];

const rows: any[] = [];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function WalletTransactionsHistory() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    setTotalRows(100);
  }, []);

  return (
    <MainCard>
      <Box>
        <TableContainer ref={headRowRef}>
          <Table stickyHeader aria-label="transaction table">
            <TableHead
              sx={{
                '& th': {
                  borderTop: `1px solid ${theme.palette.divider}`,
                  borderBottom: `2px solid ${theme.palette.divider} !important`
                }
              }}
            >
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
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`investor-wallet-transaction-history-row-${_index}-cell-${column.id}`} align={column.align}>
                        {column.id === 'mrnOrMAT' && <Typography>{value === true ? 'MRN' : 'MAT'}</Typography>}
                        {column.id === 'scan' && (
                          <NextLink href={value} passHref legacyBehavior>
                            <Link>
                              <Button>Polygonscan</Button>
                            </Link>
                          </NextLink>
                        )}
                        {column.id !== 'mrnOrMAT' && column.id !== 'scan' && (column.format ? column.format(value) : value)}
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
