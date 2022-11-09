import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Box, Grid, Tooltip, Typography, Zoom } from '@mui/material';


export default function StarRating({ rating, countOfRatings, showCountOfRatings, numberSize, disableTooltip }) {

  function Stars() {

    let items = [];
    let size = 2.4;

    for (let index = 1; index <= 5; index++) {
      items.push(
        <Grid item xs={size} sm={size} md={size} xl={size} 
          key={index}
          sx={{
            m:0, 
            p:0,
            height:35,
            justifyContent:"center",
          }}
        >
          {rating >= index 
          ? <HomeIcon sx={{ m:0, p:0, height:"100%" }} /> 
          : <HomeOutlinedIcon sx={{ m:0, p:0, height:"100%" }} />}
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
    <Tooltip 
      title={`Perustuu (${countOfRatings}) käyttäjän arvioon`} 
      TransitionComponent={Zoom} 
      disableHoverListener={disableTooltip ? disableTooltip : false} 
      >
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
                fontSize:`${numberSize ? numberSize : "15px"}`
              }}
              >({countOfRatings})
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Tooltip>
    :
    <Tooltip 
      title={`Perustuu (${countOfRatings}) käyttäjän arvioon`} 
      TransitionComponent={Zoom} 
      disableHoverListener={disableTooltip ? disableTooltip : false} 
      >
      <Box
        sx={{
          width:"100%",
          height:"auto",
          p:0,
          m:0,
        }}
        >
        <Grid container 
          sx={{
            width:160,
            height:"auto",
            margin:"auto",
            padding:0,
            textAlign:"center",
          }}
          >
          
          <Stars />

        </Grid>
      </Box>
    </Tooltip>
    }
    </>
  );  
}