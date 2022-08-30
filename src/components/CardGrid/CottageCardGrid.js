import * as React from 'react';
import { useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import CottagesPagination from './CottagesPagination';
import CottageCard from './CottageCard';
import { useParams } from 'react-router-dom';

export default function CottageCardGrid() {

  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [cottagesPerPage] = useState(20);

  const [allUserRatings, setAllUserRatings] = useState([]);
  const [allCottages, setAllCottages] = useState([]);
  const [pageCottages, setPageCottages] = useState([]);
  const [photos, setPhotos] = useState([]);

  const [cityId, setCityId] = useState(null);
  const [regionId, setRegionId] = useState(null);

  // Parameter function for pagination component
  const paginate = (currentPage) => {

    setLoading(true) // Page is changing, need to get a new page of cottages
    setCurrentPage(currentPage); // Update page number
  };

  React.useEffect(() => {

    // Calculate index of first and last cottage
    const endRow = currentPage * cottagesPerPage;
    const startRow = endRow - cottagesPerPage;

    // Fetch Photos for a page of cottages
    const fetchUserRatings = async () => {
      
      const response = await fetch(`/listUserRatings`)
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    }

    // Fetch Photos for a page of cottages
    const fetchPhotos = async (cottages) => {

      let cottageIDs = "";

      // Get index of each cottage and form a query string
      cottages.forEach( (cottage, index) => { 
        
        if (index !== cottages.length - 1) {
          cottageIDs += "cottageId=" + cottage[0].cottageId + "&";
        } else {
          cottageIDs += "cottageId=" + cottage[0].cottageId;
        }
      });
      
      const response = await fetch(`/getPhotos/url?${ cottageIDs }`)
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message);
      }
      return body;
    }

    // Fetch all cottages
    const fetchAllCottages = async () => {
      const response = await fetch(`/listCottages`);
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message) 
      }
      
      return body;
    };

    // Get all user ratings
    const getAllUserRatings = () => {
      fetchUserRatings()
        .then(res => setAllUserRatings( {userRatings: res.userRatings}.userRatings ))
        .catch(err => console.log(err));
    }

    // Get photos for a page of cottages
    const getPhotos = (cottages) => {
      if(cottages){fetchPhotos(cottages)
        .then(res => setPhotos( {photos: res.photos}.photos ))
        .catch(err => console.log(err))}
    }

    // Get all cottages
    const getAllCottages = () => {
      fetchAllCottages()
        .then(res => setAllCottages( {cottages: res.cottages}.cottages ))
        .catch(err => console.log(err));
    }
      
    // If cottages haven't been fetched yet
    if (allCottages.length === 0) {
      getAllCottages();
    }

    // If user ratings haven't been fetched yet
    if (allUserRatings.length === 0) {
      getAllUserRatings();
    }

    if (params.cityId) {
      setCityId(params.cityId)
    } else {
      setCityId(null)
    }

    if (params.regionId) {
      setRegionId(params.regionId)
    } else {
      setRegionId(null)
    }

    // If page hasn't loaded yet and all cottages have been fetched
    if (allCottages.length > 0 && allUserRatings.length > 0 && loading) {
      
      let cottagesArray = [];

      // Sort cottages by city or region if an ID is specified
      if (cityId) {      
        allCottages.forEach((cottage) => {
          if (cottage[0].cityId === Number(cityId)) {
            
            cottagesArray.push(cottage)
          } 
        })
        setAllCottages(cottagesArray)
      }
      if (regionId) {
        allCottages.forEach((cottage) => {
          if (cottage[0].regionId === regionId) {
            cottagesArray.push(cottage)
          } 
        })
        setAllCottages(cottagesArray)
      }

      let slicedCottages = allCottages.slice(startRow, endRow); // Slice all cottages to a page of cottages

      setPageCottages(slicedCottages) // Set page of cottages

      getPhotos(slicedCottages); // Get photos
    }

    if (photos.length > 0 && pageCottages.length > 0) {
      setLoading(false)
    }
    
    },[ pageCottages, currentPage, allCottages, photos, loading, cottagesPerPage, allUserRatings, params.cityId, params.regionId, cityId, regionId ])

  return (
    <>
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

    {!loading
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
        {pageCottages.map((cottage, idx) => {

          let photosArray = [];
          let sumOfRatings = 0;
          let countOfRatings = 0;
          let rating = 0;

          photos.forEach( photo => { 
            if ( photo.cottageId === cottage[0].cottageId ) {
              photosArray.push(photo);
            }
          });

          allUserRatings.forEach( userRating => { 
            if ( userRating.cottageID === cottage[0].cottageId ) {
              sumOfRatings += userRating.rating;
              countOfRatings++;
            }
          });

          rating = sumOfRatings / countOfRatings;

          return (
            <Grid item xl={3} md={4} sm={6} xs={12} 
              key={idx}
              >
              <CottageCard rating={rating} cottageData={cottage} photosData={photosArray} countOfRatings={countOfRatings} />
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
