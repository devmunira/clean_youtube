import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Skeleton, Typography } from '@mui/material';
import { Item } from '../styled/Item';

const Skaleton = () => {
  return (
    <Box>
        <Grid container spacing={3}>
          <Grid lg>
          <Item>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="100%" height="30px" />
                <Skeleton width="60%" height="20px" />
                <Skeleton width="40%" height="10px" />
            </Item>
          </Grid>

          <Grid lg>
          <Item>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="100%" height="30px" />
                <Skeleton width="60%" height="20px" />
                <Skeleton width="40%" height="10px" />
            </Item>
          </Grid>

          <Grid lg>
          <Item>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="100%" height="30px" />
                <Skeleton width="60%" height="20px" />
                <Skeleton width="40%" height="10px" />
            </Item>
          </Grid>

          <Grid lg>
          <Item>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton width="100%" height="30px" />
                <Skeleton width="60%" height="20px" />
                <Skeleton width="40%" height="10px" />
            </Item>
          </Grid>
        </Grid>
          </Box>
  )
}

export default Skaleton