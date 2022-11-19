import * as React from 'react';
import { CardHeader, CardContent, Card, Button } from '@mui/material';
import StarRating from '../StarRating/StarRating';
import { Link } from 'react-router-dom';
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel';
import CottageInformationList from '../Cottage/CottageInformationList';
import { useTranslation } from 'react-i18next';

export default function CottageCard({cottageData, photosData, rating, countOfRatings}) {

  const cottage = cottageData;
  const { t } = useTranslation();

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
        titleTypographyProps={{ margin:0, padding:0, fontWeight:"bold", fontSize:"20px" }}
        title={`${cottage.cottageId}, ${cottage.cottageName}`}
        sx={{
          p:"10px 0 0 0",
          m:0,
          height:"35px",
        }}
      />

      <CardContent
        sx={{
          p:0,
          m:0,
        }}
        >
        <StarRating rating={rating} countOfRatings={countOfRatings} showCountOfRatings={false} />
        <CottageInformationList cottageData={cottage} itemPadding={"2px"} />
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
      >{t('reserveNow')}</Button>
    </Card>  
  );
}
