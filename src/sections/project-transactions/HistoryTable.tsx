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
  useTheme
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { CopyOutlined, InboxOutlined } from '@ant-design/icons';

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
  { id: 'projectName', label: 'Project Name', minWidth: 5, align: 'left' },
  { id: 'initiatorName', label: 'Initiator Name', minWidth: 15, align: 'center' },
  { id: 'initiatorEmail', label: 'Initiator Email', minWidth: 12.5, align: 'center' },
  { id: 'transactionType', label: 'Transaction Type', minWidth: 15, align: 'center' },
  { id: 'txHash', label: 'txHash', minWidth: 25, align: 'center' },
  { id: 'projectOwner', label: 'Project Owner', minWidth: 7.5, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 7.5, align: 'center' },
  { id: 'createdAt', label: 'Created At', minWidth: 12.5, align: 'center' }
];

const rows: any[] = [];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function HistoryTable() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    setTotalRows(100);
  }, []);

  const handleCopyClick = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <MainCard tile="Transaction History">
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
                        {column.id === 'projectName' && (
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                            onClick={() => handleCopyClick(value)}
                            style={{ cursor: 'pointer' }}
                            title="Copy Project Name"
                          >
                            <Typography color={theme.palette.primary.main}>{value}</Typography>
                            <CopyOutlined />
                          </Stack>
                        )}
                        {column.id === 'txHash' && (
                          <NextLink href={`https://polygonscan.com/${value}`} passHref legacyBehavior>
                            <Link>{(value as string).slice(0, 33)} ...</Link>
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
                        {column.id !== 'projectName' &&
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
