import { useEffect, useRef, useState } from 'react';

// next
import Image from 'next/image';

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
  CircularProgress,
  Tooltip,
  useTheme,
  IconButton
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { InboxOutlined } from '@ant-design/icons';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InputIcon from '@mui/icons-material/Input';
// types
import { KeyedObject } from 'types/root';
import { enqueueSnackbar } from 'notistack';

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
  { id: 'projectName', label: 'Project name', minWidth: 17, align: 'left' },
  { id: 'tokenName', label: 'Token name', minWidth: 17, align: 'left' },
  { id: 'tokenPrice', label: 'Token price', minWidth: 17, align: 'left' },
  { id: 'invested', label: 'Invested', minWidth: 17, align: 'left' },
  { id: 'rewards', label: 'Revenue & Rewards', minWidth: 16, align: 'left' },
  { id: 'action', label: '', minWidth: 16, align: 'left' }
  // { id: 'action', label: 'Action', minWidth: 25, align: 'center' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function MyListings() {
  const theme = useTheme();
  const headRowRef = useRef<HTMLDivElement>(null);
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [rows, setRows] = useState<any[]>([]);
  const [isCliaming, setClaiming] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/investment').then(async (res) => {
      if (res.status === 200) {
        const { data } = await res.json();
        setTotalRows(data.length);
        setRows(data);
      }
      setLoading(false);
    });
  }, []);

  const handleClaim = (projectId: string) => {
    setClaiming((_claiming: any) => ({ ..._claiming, [projectId]: true }));

    fetch(`/api/project/claim?projectId=${projectId}`).then(async (res) => {
      if (res.status === 200) {
        enqueueSnackbar(`Successfully claimed.`, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      } else {
        enqueueSnackbar(`Claim failed.`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' } });
      }
      setClaiming((_claiming: any) => ({ ..._claiming, [projectId]: false }));
    });
  };

  return (
    <Box>
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
              <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`my-listings-row-${row.code}`}>
                {columns.map((column) => {
                  return (
                    <TableCell key={`my-listings-${column.id}`} align={column.align}>
                      {column.id === 'tokenPrice' && <Typography color="success">$ {numberFormat(Number(row.price))}</Typography>}
                      {column.id === 'tokenName' && <Typography>{row.project.tokenization.tokenName}</Typography>}
                      {column.id === 'invested' && <Typography>$ {numberFormat(Number(row.amount * Number(row.price)))}</Typography>}
                      {column.id === 'rewards' && (
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <Typography>$ {numberFormat(Number(row.claimedRewards))} / </Typography>
                          <Typography>$ {numberFormat(Number(row.claimableRewards))}</Typography>
                        </Stack>
                      )}
                      {column.id === 'action' && (
                        <Stack spacing={3} direction="row" alignItems="center">
                          <Link href={`/projects/${row.project._id}`} display="flex" alignItems="center">
                            {/* <Button variant="contained"> */}
                            <Tooltip title="Invest">
                              <IconButton style={{ color: theme.palette.primary.main }}>
                                <CurrencyExchangeIcon />
                              </IconButton>
                            </Tooltip>
                            {/* </Button> */}
                          </Link>
                          {/* <Button
                            onClick={() => handleClaim(row.project._id)}
                            variant="contained"
                            style={{ marginLeft: 10 }}
                            disabled={Number(row.claimableRewards) === 0 || isCliaming[row.project._id]}
                          > */}
                          {!(Number(row.claimableRewards) === 0 || isCliaming[row.project._id]) && (
                            <Tooltip title="Claim">
                              <IconButton>
                                <InputIcon style={{ color: theme.palette.primary.main }} onClick={() => handleClaim(row.project._id)} />
                              </IconButton>
                            </Tooltip>
                          )}

                          {isCliaming[row.project._id] && <CircularProgress color="primary" size="20px" />}
                          {/* </Button> */}
                        </Stack>
                      )}
                      {/* {column.id === 'action' && (
                          <NextLink href={`/projects/${row.projectId}`} passHref legacyBehavior>
                            <Link>
                              <IconButton size="medium">
                                <EyeOutlined style={{ color: 'white' }} />
                              </IconButton>
                            </Link>
                          </NextLink>
                        )} */}
                      {column.id === 'projectName' && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Image
                            src={`${process.env.SHIPFINEX_BACKEND_URL}${row.project.projectImage}`}
                            alt="ship"
                            width={40}
                            height={40}
                            style={{ borderRadius: '100%' }}
                          />
                          <Typography>{row.project.projectName}</Typography>
                        </Stack>
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
      {isLoading && (
        <Stack alignItems="center" mt={5}>
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
    </Box>
  );
}
