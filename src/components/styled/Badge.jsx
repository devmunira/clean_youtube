import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function SizesChips({text,sz}) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label={text} size={sz} />
    </Stack>
  );
}
