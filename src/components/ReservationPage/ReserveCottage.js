import { Container, Divider, Grid, Typography } from '@mui/material';
import ReservationStepper from './ReservationStepper';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CottageDataService from '../../services/cottage.service';
import { useTranslation } from 'react-i18next';

export default function ReserveCottage() {

  const { t } = useTranslation();

  // Current cottage
  const params = useParams();

  const [data, setData] = useState([]);
  const [gotCottage, setGotCottage] = useState(false);
  const [cottage, setCottage] = useState(null);

  useEffect(() => {

    // Set data
    if (data) {
      try {
        setCottage(data.cottage[0])
      } catch (error) {}
    }

    // Data fetch
    if ( !gotCottage ) {
      CottageDataService.get(params.id)
      .then(res => setData(res.data, res.error))
      .catch(err => console.log(err));
      
      setGotCottage(true);
    }

  }, [ gotCottage, params, cottage, data ]);

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
            {t('cottageReservation')}
          </Typography>
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
            {t('cottageSubject')+": "} {cottage ? cottage.id : null}, {cottage ? cottage.cottageName : null}</Typography>

          <ReservationStepper />
          
        </Grid>
      </Grid>
    </Container>
    </>
  );
  
}