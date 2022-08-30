import { Typography, Container, Grid, Box, Divider, Button, Paper, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import StarRating from '../StarRating';
import PhotoCarousel from '../PhotoCarousel';
import DateRangePickerCalendar from '../DatePicker/DateRangePickerCalendar';
import CottageInformationList from './CottageInformationList';
import Reviews from './Reviews';

export default function Cottage() {

  const params = useParams();
  const carouselParentRef = useRef([null]);

  // User ratings data
  const [rating, setRating] = useState(0);
  const [countOfRatings, setCountOfRatings] = useState(0);
  
  // Date picker values
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  // Data fetch
  const [data, setData] = useState([]);
  const [gotCottage, setGotCottage] = useState(false);
  const [gotUserRatings, setGotUserRatings] = useState(false);
  const [cottage, setCottage] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {

    // Fetch cottage data
    const fetchCottage = async () => {
      const response = await fetch(`/getCottage/${params.id}`);
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

    // Fetch user ratings data
    const fetchUserRatings = async () => {
      const response = await fetch(`/getUserRatings/${params.id}`);
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

    // Set data
    if (data) {
      try {
        setCottage(data.cottage[0])
        setPhotos(data.photos)
        //setUserRatings(data.userRatings)
      } catch (error) {}
    }

    // Data fetch
    if ( !gotCottage ) {
      fetchCottage()
      .then(res => setData({cottage: res.cottage, photos: res.photos, error: res.error}) )
      .catch(err => console.log(err));

      setGotCottage(true);
    }

    if ( !gotUserRatings ) {
      fetchUserRatings()
      .then(res => setUserRatings({userRatings : res.userRatings}.userRatings) )
      .catch(err => console.log(err));

      setGotUserRatings(true);
    }

    // Calculate overall rating of cottage and get count of ratings
    if (userRatings) {

      let sumOfRatings = 0;
      let countOfRatings = 0;
      let rating = 0;

      userRatings.forEach((userRating) => {
        if ( userRating.cottageID === cottage.cottageId ) {
          sumOfRatings += userRating.rating;
          countOfRatings++;
        }
      })

      rating = sumOfRatings / countOfRatings;

      setRating(rating)
      setCountOfRatings(countOfRatings)
    }

  }, [ gotCottage, params, cottage, photos, data, userRatings, rating, countOfRatings, gotUserRatings ]);

  return (
    <>
    <Container maxWidth="xl"
      sx={{
        marginTop:0,
      }}
    >
    {data.error // IF ERROR
    ? 
    <Typography
      variant='h1'  
      sx={{
        marginTop:"80px",
      }}
    >{data.error}</Typography>
    : 
    <>
    <Grid 
      container spacing={2} 
      sx={{ 
        marginTop:"60px",
        }}
      >
      <Grid item xl={12} md={12} sm={12} xs={12} 
        sx={{ 
          height:"auto", 
          margin:0,
          padding:0,
        }}
        >
        <Paper 
          sx={{
            textAlign: "center",
            height:"auto",
            p:"5px",
          }}
          >
           <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            >
            {cottage // CHECKING IF CONTENT EXISTS
            ?
            <>
            <Typography
              variant={'h4'}
              sx={{
                flexGrow: 1,
              }}
              >
              {cottage.cottageId} - {cottage.cottageName}
            </Typography>

            <Button 
              variant="text"
              component={Link}
              to={`/region/${cottage.regionId}`}
              sx={{
                fontSize:24,
                flexGrow: 1,
              }}
              >
              {cottage.regionName}
            </Button>
                       
            <Divider 
              orientation="vertical" flexItem
              />

            <Button
              variant="text"
              component={Link}
              to={`/city/${cottage.cityId}`}
              sx={{
                fontSize:24,
                flexGrow: 1,
              }}
              >
              {cottage.cityName}
            </Button>
            </>
            : <CircularProgress />
            }
          </Box>
        </Paper>
      </Grid>

      <Grid item xl={8} md={8} sm={12} xs={12} 
        sx={{ 
          // border:"1px red solid", 
          height:"auto", 
          alignContent:"",
          margin:0,
          padding:0,
        }}
        ref={carouselParentRef}
        >
        
        {photos // CHECKING IF CONTENT EXISTS
        ? <PhotoCarousel photos={photos} bottomCarousel={true} />
        : <CircularProgress />
        }
        
        <Divider>
          <Typography 
            variant='h4'
            sx={{
              marginTop:5,
              marginBottom:5,
            }}
            >Kohteen tiedot
          </Typography>
        </Divider>
        
        {cottage && userRatings // CHECKING IF CONTENT EXISTS
        ?
        <>
        <StarRating rating={rating} countOfRatings={countOfRatings} showCountOfRatings={true} />

        <CottageInformationList 
          cottageData={cottage} 
          dividers={true}
          showPrimary={true}
          primaryFontSize={"20px"} 
          secondaryFontSize={"20px"}
          itemMarginTop={"5px"}
          itemMarginBottom={"5px"}
          listMarginTop={"20px"}
          listMarginBottom={"20px"}
          />
        </>
        : <CircularProgress />
        }

      </Grid>

      <Grid item xl={4} md={4} sm={12} xs={12} 
        sx={{ 
          //border:"1px blue solid", 
          height:"auto",
        }}
        >
        <Paper
          sx={{
            height:"auto",
            position:"sticky",
            top:100,
            padding:"10px",
          }}
          >
          
        <Divider>
          <Typography 
            variant='h4'
            sx={{
              marginTop:0,
              marginBottom:0,
            }}
            >Varaaminen
          </Typography>
        </Divider>

         <DateRangePickerCalendar startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />

         <Button 
          variant="contained"
          sx={{
            width:"100%",
            fontSize:20,
            marginTop:"10px",
          }}
          component={Link}
          to={`../reserve/${params.id}`}
          state={{
            startDate: startDate,
            endDate: endDate,
          }}
          >Tee varaus</Button>
        </Paper>
      </Grid>
      

      <Grid item xl={12} md={12} sm={12} xs={12} 
        sx={{ 
          // border:"1px green solid", 
          height:"auto" 
        }}
        >
        <Reviews userReviews={userRatings} />
      </Grid>
    </Grid>
    </>
    }
    </Container>

    {data.error
    ? null
    :
    <Box 
      sx={{
        //backgroundImage: "url('/img/jarvi.jpg')",
        //backgroundSize:"cover",
        //backgroundPosition:"0px 300px",
        //backgroundAttachment:"fixed",
        background: "lightgray",
        textAlign: "center",
        margin:0,
        height:600,
      }}
      >
      <Typography variant="h1" component={"div"}></Typography>
    </Box>
    }
    </>
  );
  
}