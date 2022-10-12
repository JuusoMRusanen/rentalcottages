import * as React from 'react';
import { CardHeader, CardContent, Card, Button, Divider } from '@mui/material';
import StarRating from '../StarRating';
import { Link } from 'react-router-dom';
import PhotoCarousel from '../PhotoCarousel';
import CottageInformationList from '../Cottage/CottageInformationList';

export default function CottageCard({cottageData, photosData, rating, countOfRatings}) {

  const cottage = cottageData;

  return (
    <Card 
      sx={{ 
        boxShadow: 2,
        textAlign: 'center',
        height: "auto",
        lineHeight: '60px',
      }} 
      >
      <PhotoCarousel photos={photosData} cardSized={true} bottomCarousel={false} />

      <CardHeader
        titleTypographyProps={{ margin:0, padding:0, fontWeight:"bold" }}
        title={`${cottage.cottageId}, ${cottage.cottageName}`}
        sx={{
          padding:0,
          paddingTop:2,
          height:40,
        }}
      />

      <CardContent
        sx={{
          p:0,
        }}
        >
        <StarRating rating={rating} countOfRatings={countOfRatings} showCountOfRatings={true} />
        <Divider 
          variant='middle'
          sx={{
            mt:"5px",
            mb:"5px",
            p:"0px",
          }}
        />

        <CottageInformationList cottageData={cottage}/>
      </CardContent>

      <Button 
        component={Link}
        to={`/cottage/${cottage.cottageId}`}
        variant="contained"
        sx={{
          fontSize:20,
          //color:"red",
          border:"1px red solid"
        }}
        onClick={() => {
          window.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth'
          });
        }}
      >Tutustu ja varaa</Button>
    </Card>  
  );
}
