import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatars({image,text}) {
  return (
    <Stack direction="row" spacing={2} 
    alignItems="center" sx={{ mb:2 }}>
      <Avatar alt={text} src={image} />
      <p>{text}</p>
    </Stack>
  );
}