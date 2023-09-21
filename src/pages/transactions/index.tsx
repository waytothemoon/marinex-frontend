import { ChangeEvent, ReactElement, useState } from 'react';

// material-ui
import { InputAdornment, Stack, TextField } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import TransactionsHistory from 'sections/transactions/TransactionsHistory';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| Project Transactions ||============================== //

const Transactions = () => {
  const [search, setSearch] = useState<string>();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Page title="Project Transactions">
      <Stack spacing={2}>
        <TextField
          value={search}
          onChange={handleSearchChange}
          placeholder="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
        <TransactionsHistory />
      </Stack>
    </Page>
  );
};

Transactions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Transactions;
