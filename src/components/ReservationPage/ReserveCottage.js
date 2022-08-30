import { Container, Divider, Grid, Typography } from '@mui/material';
import ReservationStepper from './ReservationStepper';
import cottages from '../Data/cottages.json';
import { useParams } from 'react-router-dom';

export default function ReserveCottage() {

  // Current cottage
  const params = useParams();
  const cottage = cottages[params.id - 1];

  return (
    <>
    <Container maxWidth="xl"
      sx={{
        marginTop:"80px",
      }}
      >
      <Grid container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
        >
        <Grid item  xl={12} md={12} sm={12} xs={12} 
          sx={{
            
          }} 
          >
          <Typography
            variant='h2'
            sx={{
              mb:"10px",
            }}
          >
          Kohteen varaaminen</Typography>
          <Divider 
            sx={{
              mb:"10px",
            }}
            />
          <Typography 
            variant='h4' 
            sx={{
              mb:"40px",
            }}
            >
            Kohde: {cottage.id}, {cottage.name}</Typography>

          <ReservationStepper />
          
        </Grid>
      </Grid>
    </Container>
    </>
  );
  
}