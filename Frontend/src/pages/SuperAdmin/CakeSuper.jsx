import { Box, Grid } from '@mui/material'
import DataCake from '../../components/SuperAdmin/DataGrid/DataCake'
import React from 'react'
import CreateCake from '../../components/SuperAdmin/FormCreate/CreateCake'

const CakeSuper = () => {
  return (
   <Box>
      <Grid
      container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1 }}
      >
          <Grid item xs={12} >
          <DataCake/>
          </Grid>

          <Grid  item xs={12} >
            <CreateCake />
          </Grid>
      </Grid>
    
   </Box>

  )
}

export default CakeSuper