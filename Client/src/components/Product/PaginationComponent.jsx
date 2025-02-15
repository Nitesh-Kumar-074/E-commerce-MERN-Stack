import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent({count,page,onChange}) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={onChange} variant="outlined" color="secondary" />
    </Stack>
  );
}
