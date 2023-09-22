import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';
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
  Tooltip
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { InboxOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
import { enqueueSnackbar } from 'notistack';

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
                      {column.id === 'tokenPrice' && <Typography color="success">$ {Number(row.price).toFixed(2)}</Typography>}
                      {column.id === 'tokenName' && <Typography>{row.project.tokenization.tokenName}</Typography>}
                      {column.id === 'invested' && <Typography>$ {Number(row.amount).toFixed(2)}</Typography>}
                      {column.id === 'rewards' && (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>$ {Number(row.claimedRewards).toFixed(2)} / </Typography>
                          <Typography>$ {Number(row.claimableRewards).toFixed(2)}</Typography>
                        </Stack>
                      )}
                      {column.id === 'action' && (
                        <>
                          <NextLink href={`/projects/${row.project._id}`} passHref legacyBehavior>
                            <Link>
                              {/* <Button variant="contained"> */}
                              <Tooltip title="Invest">
                                <svg
                                  version="1.1"
                                  id="Layer_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 96.17 122.88"
                                  width={30}
                                  height={30}
                                >
                                  <path d="M72.25,66a22.51,22.51,0,0,1,5.4-5.2c3.7-2.54,8.14-4,13.4-4.93a1.56,1.56,0,0,1,1.8,1.27,1.54,1.54,0,0,1-1.26,1.79c-4.85.86-8.9,2.17-12.2,4.43A20.85,20.85,0,0,0,72.74,71c12.62,1.26,20.09,0,25.52-3.92s9-10.69,13.76-20.43c-1.39.09-2.84.16-4.32.22-9.57.45-20,.93-26.59,6.69a36.82,36.82,0,0,0-4.9,5.31,58.25,58.25,0,0,0-4,5.91V66Zm-4.47-32c-.56,0-1.12-.1-1.67-.17s-1.23-.18-1.8-.28a16.77,16.77,0,0,1-1.66-.37V28.38c.7.06,1.45.11,2.26.15s1.63.07,2.46.09l2.32,0a8,8,0,0,0,1.69-.15,2,2,0,0,0,1-.49,1.4,1.4,0,0,0-.13-2,1.89,1.89,0,0,0-1.13-.34H69.5a8.14,8.14,0,0,1-5.41-1.57c-2.66-2.26-2.47-8.83.19-11a7.33,7.33,0,0,1,3.5-1.49V9.1h4.37v2.38l.69.06c.85.09,1.65.21,2.4.34s1.42.27,2,.41V17c-.94-.08-2-.15-3.18-.2s-2.25-.08-3.21-.08a8.84,8.84,0,0,0-1.54.12,1.92,1.92,0,0,0-1,.5,1.64,1.64,0,0,0,.12,2.24,2.34,2.34,0,0,0,1.5.4h2a7.16,7.16,0,0,1,3.58.82A5.28,5.28,0,0,1,77.67,23c1.11,2.15,1,6.4-.3,8.35a5,5,0,0,1-2.89,2.08,13.82,13.82,0,0,1-2.33.43v2.69H67.78V33.93ZM2.77,77.8H18.24A2.78,2.78,0,0,1,21,80.58v31.83a2.78,2.78,0,0,1-2.77,2.77H2.77A2.78,2.78,0,0,1,0,112.41V80.58A2.78,2.78,0,0,1,2.77,77.8ZM25.24,112V80.8H39.29c6,1.07,11.91,4.3,17.87,8H68.07c4.94.3,7.52,5.31,2.73,8.6-3.83,2.8-8.88,2.64-14,2.18-3.57-.18-3.73,4.62,0,4.64,1.29.1,2.69-.21,3.92-.21,6.46,0,11.78-1.24,15-6.34l1.63-3.82,16.24-8.05c8.12-2.67,13.89,5.82,7.91,11.73a212.13,212.13,0,0,1-36.15,21.28c-9,5.45-17.91,5.27-26.87,0L25.24,112ZM70.32,0a23.47,23.47,0,0,1,1.93,46.87V59c.5-.71,1-1.39,1.5-2a41.17,41.17,0,0,1,5.3-5.76c7.36-6.47,18.42-7,28.51-7.45,2.33-.11,4.61-.22,6.9-.41h0a1.63,1.63,0,0,1,.8.15,1.55,1.55,0,0,1,.72,2.07c-5.55,11.46-9.47,19.31-15.9,24C94,74,85.82,75.44,72.25,74.07v2.36c7.85.77,15.12,1.75,19.17,5h0L76.84,88.7a9.59,9.59,0,0,0-2-2.26,11.17,11.17,0,0,0-6-2.43,5.84,5.84,0,0,0-.73-.05H58.53a75.18,75.18,0,0,0-10.41-5.52c5.08-1.75,11.82-2.2,18.6-2.26V69.8A32.59,32.59,0,0,1,55.26,69a17.06,17.06,0,0,1-10.59-8.62.41.41,0,0,0-.05-.09h0l-4.37-9a1.89,1.89,0,0,1,.88-2.53,1.83,1.83,0,0,1,.94-.19h0l14.64.9.24,0h0c2.73.34,5.73.72,8.44,3.11a16.92,16.92,0,0,1,1.28,1.26c0-2.82.18-4.71.21-7.11A23.48,23.48,0,0,1,70.32,0Zm0,3.78A19.7,19.7,0,1,1,56.4,9.55,19.64,19.64,0,0,1,70.32,3.78ZM66.72,66V65.7a7.41,7.41,0,0,0-1.57-1.46,13.16,13.16,0,0,0-4.76-1.84,1.55,1.55,0,1,1,.66-3,16.32,16.32,0,0,1,5.67,2.18v-.4c-.07-.2-.15-.41-.23-.6a13.57,13.57,0,0,0-3.56-5.14c-1.85-1.63-4.23-1.93-6.41-2.2h-.05l-11.4-.7,3,6.09a13.4,13.4,0,0,0,8.29,6.75A29.38,29.38,0,0,0,66.72,66Z" />
                                </svg>
                              </Tooltip>
                              {/* </Button> */}
                            </Link>
                          </NextLink>
                          {/* <Button
                            onClick={() => handleClaim(row.project._id)}
                            variant="contained"
                            style={{ marginLeft: 10 }}
                            disabled={Number(row.claimableRewards) === 0 || isCliaming[row.project._id]}
                          > */}
                          {!(Number(row.claimableRewards) === 0 || isCliaming[row.project._id]) && (
                            <Tooltip title="Claim">
                              <svg
                                onClick={() => handleClaim(row.project._id)}
                                style={{ marginLeft: 10 }}
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 96.17 122.88"
                                width={30}
                                height={30}
                              >
                                <g>
                                  <path d="M62.74,110.31l21.48-22.58H62.74V110.31L62.74,110.31z M66.06,26.57l-0.08,1.65c0.41-0.65,0.9-1.15,1.46-1.48 c0.56-0.33,1.21-0.49,1.93-0.49c1.41,0,2.51,0.65,3.32,1.97c0.44-0.65,0.94-1.15,1.5-1.48c0.56-0.33,1.17-0.49,1.85-0.49 c0.89,0,1.64,0.22,2.22,0.65c0.59,0.43,0.96,0.97,1.13,1.6c0.16,0.63,0.25,1.65,0.25,3.08v12.31h-5.11V32.6 c0-1.48-0.05-2.39-0.15-2.75c-0.1-0.35-0.33-0.53-0.7-0.53c-0.37,0-0.62,0.17-0.72,0.52c-0.11,0.35-0.16,1.27-0.16,2.75v11.29 h-5.11V32.89c0-1.7-0.04-2.72-0.12-3.06c-0.08-0.34-0.31-0.51-0.69-0.51c-0.24,0-0.43,0.09-0.6,0.27c-0.17,0.18-0.25,0.4-0.27,0.66 c-0.02,0.25-0.03,0.8-0.03,1.64v12.01h-5.11V26.57H66.06L66.06,26.57z M58.24,22.75v2.75h-5.43v-2.75H58.24L58.24,22.75z M58.24,26.57v17.32h-5.43V26.57H58.24L58.24,26.57z M43.34,33.28h-4.95v-1.16c0-1.34,0.16-2.38,0.46-3.11 c0.31-0.73,0.93-1.37,1.86-1.92c0.93-0.56,2.14-0.84,3.63-0.84c1.78,0,3.13,0.32,4.03,0.95c0.9,0.63,1.45,1.4,1.63,2.32 c0.18,0.92,0.28,2.81,0.28,5.68v8.7h-5.13v-1.55c-0.32,0.62-0.74,1.09-1.25,1.4c-0.51,0.31-1.11,0.47-1.82,0.47 c-0.92,0-1.77-0.26-2.54-0.78c-0.77-0.52-1.15-1.65-1.15-3.4v-1.43c0-1.3,0.21-2.18,0.62-2.65c0.41-0.47,1.43-1.02,3.05-1.64 c1.73-0.68,2.66-1.14,2.78-1.37c0.12-0.24,0.18-0.71,0.18-1.44c0-0.91-0.07-1.49-0.21-1.77c-0.13-0.27-0.36-0.41-0.68-0.41 c-0.36,0-0.58,0.12-0.67,0.35c-0.09,0.23-0.13,0.83-0.13,1.79V33.28L43.34,33.28z M45.03,35.66c-0.85,0.62-1.35,1.14-1.48,1.55 c-0.14,0.42-0.2,1.02-0.2,1.8c0,0.9,0.06,1.48,0.18,1.74c0.12,0.26,0.35,0.39,0.7,0.39c0.33,0,0.55-0.1,0.65-0.31 c0.1-0.2,0.15-0.74,0.15-1.61V35.66L45.03,35.66z M36.03,22.75v21.15H30.6V22.75H36.03L36.03,22.75z M28.36,33.12h-4.97v-2 c0-0.7-0.06-1.17-0.17-1.42c-0.12-0.25-0.33-0.38-0.64-0.38c-0.31,0-0.52,0.11-0.63,0.33c-0.11,0.22-0.16,0.7-0.16,1.46v8.18 c0,0.62,0.08,1.08,0.24,1.39c0.16,0.31,0.39,0.46,0.7,0.46c0.36,0,0.61-0.16,0.74-0.48c0.13-0.32,0.19-0.93,0.19-1.82v-2.05h4.71 c-0.01,1.38-0.06,2.42-0.15,3.11c-0.09,0.69-0.38,1.4-0.88,2.13c-0.49,0.73-1.14,1.27-1.93,1.64c-0.79,0.37-1.77,0.55-2.94,0.55 c-1.49,0-2.67-0.25-3.55-0.77c-0.87-0.51-1.49-1.22-1.85-2.14c-0.36-0.92-0.54-2.22-0.54-3.92v-4.92c0-1.48,0.15-2.58,0.45-3.33 c0.29-0.75,0.93-1.42,1.9-2.01c0.97-0.59,2.14-0.88,3.53-0.88c1.38,0,2.55,0.29,3.53,0.88c0.97,0.58,1.63,1.32,1.95,2.21 C28.19,30.23,28.36,31.49,28.36,33.12L28.36,33.12z M17.44,90.03h20.72v5.53H17.44V90.03L17.44,90.03z M17.44,75.98h28.78v5.53 H17.44V75.98L17.44,75.98z M17.44,61.94h62.78v5.53H17.44V61.94L17.44,61.94z M96.17,84.85c0,1.63-1.1,3.04-2.6,3.45l-31.64,33.27 c-0.66,0.82-1.66,1.32-2.76,1.32H6.43c-1.79,0-3.39-0.72-4.55-1.88C0.72,119.84,0,118.24,0,116.45V6.43c0-1.79,0.72-3.39,1.88-4.55 C3.04,0.72,4.67,0,6.43,0h83.31c1.76,0,3.39,0.72,4.55,1.88c1.16,1.16,1.88,2.76,1.88,4.55V84.85L96.17,84.85z M88.99,80.55V7.18 H7.18v108.55h48.38V84.16c0-1.98,1.6-3.61,3.61-3.61H88.99L88.99,80.55z" />
                                </g>
                              </svg>
                            </Tooltip>
                          )}

                          {isCliaming[row.project._id] && <CircularProgress color="primary" size="16px" />}
                          {/* </Button> */}
                        </>
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
