import { Grid, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Grid container sx={{ width : '100%' , height : '80vh', justifyContent : 'center' , alignItems : 'center' , margin : 'auto' }}> 
        <Grid item xs={10}>
          <Typography variant='h2' sx={{ fontWeight : 'bold' ,textAlign : 'center' }}>No Found</Typography>
        </Grid>

    </Grid>
  )
}

export default NotFound