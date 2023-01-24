import { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import CottagesPagination from './CottagesPagination';
import CottageCard from './CottageCard';
import { useParams } from 'react-router-dom';
import CottageDataService from '../../services/cottage.service';
import ReviewDataService from '../../services/review.service';
import PhotoDataService from '../../services/photo.service';
import ConnectionAlert from '../ConnectionAlert/ConnectionAlert';

export default function CottageCardGrid({ getCityOrRegionName }) {

  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [badRequest, setBadRequest] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [cottagesPerPage] = useState(20);

  const [allUserRatings, setAllUserRatings] = useState([]);
  const [allCottages, setAllCottages] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(20);

  // Parameter function for pagination component
  const paginate = (currentPage) => {

    setLoading(true) // Page is changing, need to get a new page of cottages
    setCurrentPage(currentPage); // Update page number

    // Get index of first and last cottage
    setEndRow(currentPage * cottagesPerPage);
    setStartRow(currentPage * cottagesPerPage - cottagesPerPage);

    // Set timeout before rendering cottage cards, so paginating feels smoother
    const timer = setTimeout( () => {
      setLoading(false)
    }, 100);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    
    const getData = async () => {
      
      // Get all reviews
      await ReviewDataService.getAll()
      .then(response => {
        setAllUserRatings(response.data)
      }).catch((error) => {
        setBadRequest(true);
        const timer = setTimeout( () => {
          window.location.reload();
        }, 10000);
        return () => clearTimeout(timer);
      });

      // Get all Photos
      await PhotoDataService.getAll()
      .then(response => {
        setAllPhotos(response.data);
      })
      
      if (params.regionId) 
        {
          // Get all cottages by regionId
          await CottageDataService.getAllByRegionId(params.regionId)
          .then(response => {
            setAllCottages(response.data);
            getCityOrRegionName(response.data[0].regionName)
          }) }
      
      if (params.cityId) 
        {
          // Get all cottages by cityId
          await CottageDataService.getAllByCityId(params.cityId)
          .then(response => {
            setAllCottages(response.data);
            getCityOrRegionName(response.data[0].cityName)
          }) 
        }

      if (!params.cityId && !params.regionId)
        {
          // Get all cottages
          await CottageDataService.getAll()
          .then(response => {
            setAllCottages(response.data);
          })
        }
    }

    getData().then(() => setLoading(false))
  
    },[params, badRequest])

  return (
    <>
    {badRequest ? <ConnectionAlert /> : null }

    {allCottages
    ?
    <CottagesPagination 
      cottagesPerPage={cottagesPerPage} 
      totalCottages={allCottages.length} 
      paginate={paginate}
      currentPage={currentPage}
    />
    : <CircularProgress />
    }

    {allCottages.length > 0 && !loading
    ?
    <>
    <Box 
      sx={{
        p: 0,
        display: 'grid',
        gap: 0,
        marginTop:0,
      }}
      >
      <Grid container spacing={1}>
        {allCottages.slice(startRow, endRow).map((cottage, idx) => {

          let cottagePhotos = [];
          let sumOfRatings = 0;
          let countOfRatings = 0;
          let rating = 0;

          allPhotos.forEach( photo => {
            if ( photo.cottageId === cottage.cottageId ) {
              cottagePhotos.push(photo);
            }
          });

          allUserRatings.forEach( userRating => { 
            if ( userRating.cottageID === cottage.cottageId ) {
              sumOfRatings += userRating.rating;
              countOfRatings++;
            }
          });

          rating = sumOfRatings / countOfRatings;

          return (
            <Grid item xl={3} md={4} sm={6} xs={12} 
              key={idx}
              >
              <CottageCard rating={rating} cottageData={cottage} photosData={cottagePhotos} countOfRatings={countOfRatings} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
    </>
    : <CircularProgress />
    }

    {allCottages
    ?
    <CottagesPagination 
      cottagesPerPage={cottagesPerPage} 
      totalCottages={allCottages.length} 
      paginate={paginate}
      currentPage={currentPage}
    />
    : <CircularProgress />
    }
    </>
  );
}
