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
import { EyeOutlined, InboxOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
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
  { id: 'projectName', label: 'Project Name', minWidth: 17, align: 'left' },
  { id: 'numberOfTokens', label: '# of Tokens', minWidth: 16, align: 'left' },
  { id: 'currentValue', label: 'Current value', minWidth: 16, align: 'left' },
  { id: 'estimatedEarning', label: 'Expected earning', minWidth: 17, align: 'left' },
  { id: 'minimumInvestment', label: 'Min investment', minWidth: 17, align: 'left' },
  { id: 'action', label: '', minWidth: 17, align: 'left' }
];

// ==============================|| PROJECTS TABLE ||============================== //

export default function ProjectsTable() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);
  const { currentPage, jump } = usePagination(100, 25);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/project?allowance=1')
      .then(async (res) => {
        const { total: totalRows, data: _rows } = await res.json();
        if (totalRows) {
          setTotalRows(totalRows);
          console.log(_rows);
          setRows(_rows);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <Box>
      {isLoading && (
        <Stack alignItems="center" mt={5}>
          <CircularProgress color="primary" />
        </Stack>
      )}
      {!isLoading && rows.length > 0 && (
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
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`trending-projects-table-row-${_index}`}>
                  {columns.map((column, index) => {
                    const value = row._doc[column.id];
                    return (
                      <TableCell key={`trending-projects-table-${index}`} align={column.align}>
                        {column.id === 'estimatedEarning' && `${value} %`}
                        {column.id === 'projectName' && (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Image
                              src={`${process.env.SHIPFINEX_BACKEND_URL}${row._doc.projectImage}`}
                              alt="ship"
                              width={32}
                              height={32}
                              style={{ borderRadius: '100%' }}
                            />
                            <Typography>{value}</Typography>
                          </Stack>
                        )}
                        {column.id === 'numberOfTokens' && `${numberFormat(row._doc.tokenization.tonnage * 1000)}`}
                        {column.id === 'currentValue' && `$ ${numberFormat(row._doc.tokenization.assetValue)}`}
                        {column.id === 'minimumInvestment' && `$ ${numberFormat(row._doc.tokenization.minimumInvestment)}`}
                        {column.id === 'action' && (
                          <NextLink href={`/projects/${row._doc._id}`} passHref legacyBehavior>
                            <Link>
                              <Tooltip title="Detail">
                                <EyeOutlined />
                              </Tooltip>
                            </Link>
                          </NextLink>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* table pagination */}
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
