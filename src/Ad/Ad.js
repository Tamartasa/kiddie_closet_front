import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ItemCard from '../ItemCard/ItemCard';
import ItemCardImage from '../ItemCardImage/ItemCardImage';
 

const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

export default function Ad() {
    
      return (
        <>
      
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', 
        flexDirection: 'column', marginTop: '20px', marginBottom: '20px' }} 
        // sx={{ width: '80%', flexGrow: 0.5 }}
        >
          <Grid container spacing={2}>
            <Grid xs={4}>
                <ItemCard/>
              {/* <Item>xs=8</Item> */}
            </Grid>
            <Grid xs={4}>
            <ItemCard/>
              {/* <Item>xs=4</Item> */}
            </Grid>
            <Grid xs={4}>
                <ItemCard/>
              {/* <Item>xs=4</Item> */}
            </Grid>
          </Grid>
        </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} 
    // sx={{ width: '80%', flexGrow: 0.5 }}
    >
    <Grid container spacing={2}>
        <Grid xs={6}>
            <ItemCard/>
        {/* <Item>xs=8</Item> */}
        </Grid>
        <Grid xs={6}>
        <ItemCard/>
        {/* <Item>xs=4</Item> */}
        </Grid>
    </Grid>
    </Box>
    </>
      );
    }