import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Box, Grid, Tooltip, Typography } from '@mui/material';

export default function StarRating({ rating, countOfRatings, showCountOfRatings }) {

  function Stars() {

    let items = [];
    let size = 2.4;

    for (let index = 1; index <= 5; index++) {
      items.push(
        <Grid item xs={size} sm={size} md={size} xl={size} 
          key={index}
          sx={{
            margin:0, 
            padding:0,
            height:35,
            justifyContent:"center",
          }}
        >
          {rating >= index 
          ? <HomeIcon sx={{ margin:0, padding:0, height:"100%" }} /> 
          : <HomeOutlinedIcon sx={{ margin:0, padding:0, height:"100%" }} />}
        </Grid>
      );
    }

    return(
      <>
      {items.map((item) => {
        return item;
      })}
      </>
    );
  }

  return(
    <>
    {showCountOfRatings 
    ?
    <>
    <Tooltip title={`Perustuu (${countOfRatings}) käyttäjän arvioon`}>
      <Box
        sx={{
          width:"100%",
          height:"auto",
        }}
        >
        <Grid container 
          sx={{
            width:160,
            height:"auto",
            //border:"1px black solid",
            margin:"auto",
            padding:0,
            textAlign:"center",
          }}
          >
          
          <Stars />

          <Grid item xs={12} sm={12} md={12} xl={12} 
            sx={{
              margin:0, 
              padding:0,
            }}
            >
            <Typography
              sx={{
                margin:0,
                padding:0,
              }}
              >({countOfRatings})
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Tooltip>
    </>
    :
    <>
      <Box
        sx={{
          width:"0%",
          height:"auto",
        }}
        >
        <Grid container 
          sx={{
            width:160,
            height:"auto",
            //border:"1px black solid",
            margin:"auto",
            padding:0,
            textAlign:"center",
          }}
          >
          
          <Stars />

        </Grid>
      </Box>
    </>
    }
    </>
  );  
}