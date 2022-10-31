import * as React from 'react';
import { useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import CottagesPagination from './CottagesPagination';
import CottageCard from './CottageCard';
import { useParams } from 'react-router-dom';
import CottageDataService from '../../services/cottage.service';
import ReviewDataService from '../../services/review.service';
import PhotoDataService from '../../services/photo.service';

export default function CottageCardGrid({ getCityOrRegionName }) {

  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [cottagesPerPage] = useState(20);

  const [allUserRatings, setAllUserRatings] = useState([]);
  const [allCottages, setAllCottages] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [pageCottages, setPageCottages] = useState([]);

  // Parameter function for pagination component
  const paginate = (currentPage) => {
    setLoading(true) // Page is changing, need to get a new page of cottages
    setCurrentPage(currentPage); // Update page number
  };

  React.useEffect(() => {

    const timer = setTimeout(() => {

      // Calculate index of first and last cottage
      const endRow = currentPage * cottagesPerPage;
      const startRow = endRow - cottagesPerPage;

      // Get all reviews
      const getAllUserRatings = async () => {
        ReviewDataService.getAll()
        .then(response => {
          setAllUserRatings(response.data);
        })
      }

      // Get all Photos
      const getAllPhotos = async () => {
        PhotoDataService.getAll()
        .then(response => {
          setAllPhotos(response.data);
        })
      }

      // Get all cottages
      const getAllCottages = async () => {
        CottageDataService.getAll()
        .then(response => {
          setAllCottages(response.data);
        })
      }

      // Get all cottages by regionId
      const getAllCottagesByRegionId = async (id) => {
        CottageDataService.getAllByRegionId(id)
        .then(response => {
          setAllCottages(response.data);
        })
      }

      // Get all cottages by cityId
      const getAllCottagesByCityId = async (id) => {
        CottageDataService.getAllByCityId(id)
        .then(response => {
          console.log(response.data);
          setAllCottages(response.data);
        })
      }
        
      // If cottages haven't been fetched yet
      if (allCottages.length === 0) {
        if (params.cityId) {
          getAllCottagesByCityId(params.cityId);
        }
        else if (params.regionId) {
          getAllCottagesByRegionId(params.regionId)
        }
        else {
          getAllCottages();
        }
      }

      // If user ratings haven't been fetched yet
      if (allUserRatings.length === 0) {
        getAllUserRatings();
      }

      // If page hasn't loaded yet and all cottages have been fetched
      if (allCottages.length > 0 && allUserRatings.length > 0 && loading) {

        // Get city or region name for page title
        if (params.cityId) {
          getCityOrRegionName(allCottages[0].cityName)
        }
        if (params.regionId) {
          getCityOrRegionName(allCottages[0].regionName)
        }
        
        let slicedCottages = allCottages.slice(startRow, endRow); // Slice all cottages to a page of cottages

        setPageCottages(slicedCottages) // Set page of cottages

        if (allPhotos.length <= 0) {
          getAllPhotos()
        }
      }

      if (allPhotos.length > 0 && pageCottages.length > 0) {
        setLoading(false)
      } 

    }, 500);
    return () => clearTimeout(timer);
    },[ pageCottages, currentPage, allCottages, allPhotos, loading, cottagesPerPage, allUserRatings, params.cityId, params.regionId, getCityOrRegionName ])

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

          allPhotos.forEach( photo => {
            if ( photo.cottageId === cottage.cottageId ) {
              //console.log("yeppee");
              photosArray.push(photo);
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
