import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Grid, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import getBaseURL from '../../getBaseURL';

export default function PhotoCarousel({ photos, height, cardSized, bottomCarousel }) {
  
  const [photoIndex, setPhotoIndex] = useState(0);
  
  const photoRef = React.useRef([null]);
  const bottomPhotoRef = React.useRef([null]);

  const matches = useMediaQuery('(min-width:420px)');

  const showTopPhoto = (index) => {
    photoRef.current[index].style.display = "flex"; // Show image
  }

  const hideTopPhoto = (index) => {
    photoRef.current[index].style.display = "none"; // Hide image
  }

  const focusBottomPhoto = (index) => {
    bottomPhotoRef.current[index].style.opacity = 1; // Set high opacity
    bottomPhotoRef.current[index].style.borderBottom = "4px solid #FF461E"; // Show Border
  }

  const unfocusBottomPhoto = (index) => {
    bottomPhotoRef.current[index].style.opacity = 0.6; // Set low opacity
    bottomPhotoRef.current[index].style.borderBottom = "none"; // Hide border
  }
  
  const handleClick = (buttonValue) => {

    if ( buttonValue === 1 ){

      // Top photo styles
      if ( photoIndex < photos.length - 1 ) { // If index is smaller than maximum

        hideTopPhoto(photoIndex);

        setPhotoIndex(photoIndex + 1); // Next image
        showTopPhoto(photoIndex + 1);

        if (bottomCarousel) {
          focusBottomPhoto(photoIndex + 1);
          unfocusBottomPhoto(photoIndex);
        }

      } else { // If index goes over the maximum

        hideTopPhoto(photoIndex);
        showTopPhoto(0);

        if (bottomCarousel) {
          unfocusBottomPhoto(photoIndex);
          focusBottomPhoto(0);
        }

        setPhotoIndex(0); // To first
      }
    }

    if ( buttonValue === 0 ) {

      if ( photoIndex !== 0 ) { // If not first

        setPhotoIndex(photoIndex - 1); // Previous image
        
        showTopPhoto(photoIndex - 1);
        hideTopPhoto(photoIndex);

        if (bottomCarousel) {
          focusBottomPhoto(photoIndex - 1);
          unfocusBottomPhoto(photoIndex);
        }

      } else { // If first

        hideTopPhoto(photoIndex);
        showTopPhoto(photos.length - 1);

        if (bottomCarousel) {
          unfocusBottomPhoto(photoIndex);
          focusBottomPhoto(photos.length - 1);
        }

        setPhotoIndex(photos.length - 1); // To last
      }
    }
  }
  
  // Bottomphoto change when clicked
  const changePhoto = (index) => {

    // Reset current photo styles
    hideTopPhoto(photoIndex);
    unfocusBottomPhoto(photoIndex);

    // Update clicked photo stlyes
    showTopPhoto(index);
    focusBottomPhoto(index);

    setPhotoIndex(index);
  }

  const [sortedPhotos, setSortedPhotos] = useState([]);

  // Sorts the array of photos according to the priority number of the photos
  const sortArray = () => {

    let array = photos;
    
    for(let i = 0; i < array.length; i++){
      for(let j = 0; j < array.length - i - 1; j++){
        if( array[j + 1].priority < array[j].priority ) { // If higher priority (lower number is higher)
          [array[j + 1],array[j]] = [array[j],array[j + 1]] // Swap places in array
        }
      }
    };

    //console.log(array)

    setSortedPhotos(array);
  }

  if (sortedPhotos.length === 0 && photos.length > 0) {
    sortArray();
  }

  return(
    <Grid container>
      <Grid item xs={12} sm={12} md={12} xl={12}>
        <Box
          sx={{
            width:"100%",
            height: cardSized 
            ? 
            {
              "@media only screen and (min-width: 0px)": {
                height: 200,
              },
              "@media only screen and (min-width: 400px)": {
                height: 300,
              },
              "@media only screen and (min-width: 580px)": {
                height: 400,
              },
              "@media only screen and (min-width: 745px)": {
                height: 250,
              },
            }
            : {
              "@media only screen and (max-width: 500px)": {
                height: 250,
              },
              "@media only screen and (min-width: 500px)": {
                height: 300,
              },
              "@media only screen and (min-width: 600px)": {
                height: 400,
              },
              "@media only screen and (min-width: 775px)": {
                height: 550,
              },
              "@media only screen and (min-width: 1200px)": {
                height: 600,
              },
              "@media only screen and (min-width: 1400px)": {
                height: 700,
              },
            },
            position:"relative",
          }}
          >
          {sortedPhotos.map((photo, idx) => {

            photo.id = idx; // Indexing each photo
            //console.log(photo)

            return(
              <Box
                ref={x => photoRef.current[idx] = x}
                key={idx}
                sx={{ 
                  backgroundImage:`url(${getBaseURL()}${photo.src})`, // FETCH FROM SERVER ???
                  backgroundRepeat:"no-repeat",
                  backgroundSize:"cover",
                  width: "100%",
                  height: "100%",
                  display: photo.id === 0 ? "flex" : "none",
                  justifyContent:"space-between",
                  "@keyframes fade": {
                    from: {
                      opacity: 0,
                    },
                    to: {
                      opacity: 1,
                    }
                  },
                  animation: "fade 1s",
                }}
              />
            );
          })}    

          <Button 
            sx={{
              color:"white",
              position:"absolute",
              left:0,
              top: height ? height/2-20 : "45%",
              ":active":{
                backgroundColor:"rgba(0,0,0,0.2)",
                transform: "skewY(3deg) ",
                transformOrigin: "0% 0%",
                boxShadow:"1px 1px 10px",
              },
              ":hover":{
                opacity:1,
                backgroundColor:"rgba(0,0,0,0.5)",
              },
              height: "40px",
              width: "auto",
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: "5%",
            }}
            onClick={ () => handleClick(0) }
            >
            <ArrowBackIcon 
              fontSize="large" 
              sx={{
                width:"100%",
                margin:"6px 0px 6px 0",
                ":active":{
                  color:"black",
                },
              }}
            />
          </Button>

          <Button 
            sx={{
              color:"white",
              position:"absolute",
              right:0,
              top: height ? height/2-20 : "45%",
              ":active":{
                backgroundColor:"rgba(0,0,0,0.2)",
                transform: "skewY(-3deg) ",
                transformOrigin: "100% 100%",
                boxShadow:"1px 1px 10px",
              },
              ":hover":{
                opacity:1,
                backgroundColor:"rgba(0,0,0,0.5)",
              },
              height: "40px",
              width: "auto",
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: "5%",
            }}
            onClick={ () => handleClick(1) }
            >
            <ArrowForwardIcon 
              fontSize="large" 
              sx={{
                width:"100%",
                margin:"0px 0 0 6px",
                ":active":{
                  color:"black",
                },
              }}
            />
          </Button>
        </Box>
      </Grid>

      {(bottomCarousel === true)
       ? 
       <>
        {photos.map((photo, idx) => {
          return(
            <Grid item xs={4} sm={2} md={2} xl={2}
              key={idx}
              sx={{
                height: matches ? "100px" : "60px",
                padding:"2px",
                paddingTop:"4px"
              }}
              onClick={() => changePhoto(idx)}
              >
              <Box
                ref={x => bottomPhotoRef.current[idx] = x}
                key={idx}
                sx={{ 
                  backgroundImage:`url(${getBaseURL()}${photo.src})`,
                  backgroundRepeat:"no-repeat",
                  backgroundSize:"cover",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent:"space-between",
                  "@keyframes fade": {
                    from: {
                      opacity: 0,
                    },
                    to: {
                      opacity: 1,
                    }
                  },
                  animation: "fade 1s",
                  borderBottom: photo.id === 0 ? "4px solid #FF461E" : "none",
                  opacity: photo.id === 0 ? 1 : 0.6,
                  ":hover":{
                    opacity: 1,
                  }
                }}
              />
            </Grid>
          );
        })}
       </> 
       : null
      }
      
    </Grid>
  );
}