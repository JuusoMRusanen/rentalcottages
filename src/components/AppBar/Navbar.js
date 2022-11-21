import { AppBar, Button, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { Box } from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import DropDownMenu from "./DropDownMenu";
import CityDataService from "../../services/city.service";
import RegionDataService from "../../services/region.service";
import AddIcon from '@mui/icons-material/Add';
import TocIcon from '@mui/icons-material/Toc';
import { useTranslation } from "react-i18next";

export default function Navbar() {

  const matches = useMediaQuery('(min-width:600px)');
  const [visibleOnMobile, setVisibleOnMobile] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [baseURL] = useState("/");

  function changeLanguage(countryCode) {
    i18n.changeLanguage(countryCode);
  }
  
  useEffect(() => {

    // Set visibility for mobile
    if(matches) {
      setVisibleOnMobile(false);
    }
    else {
      setVisibleOnMobile(true);
    }

    const GetCities = async () => {
      await CityDataService.getAll()
        .then(response => {
          setCities(response.data);
        })
    }

    const GetRegions = async () => {
      await RegionDataService.getAll()
        .then(response => {
          setRegions(response.data);
        })
    }

    const timer = setTimeout(() => {

      // Get all cities
      if ( !cities.length > 0 ) {
        GetCities();
      }

      // Get all regions
      if ( !regions.length > 0 ) {
        GetRegions();
      }

    }, 500);
    return () => clearTimeout(timer);

  }, [ matches, cities.length, regions.length ]);

  const theme = useTheme();

  return (
    <>
    <AppBar style={theme.appBar}>
      <Toolbar>
        {(visibleOnMobile)
        ?
        <>
          <DrawerMenu />
          <Box sx={{margin:"auto", display:"flex"}}>

            <HomeIcon />

            <Typography variant="h5" component="div">
              {t('appBarTitle')}
            </Typography>
          </Box>
        </>
        :
        <>
          <HomeIcon />

          <Typography variant="h5" component="div">
            {t('appBarTitle')}
          </Typography>

          <Button
            href="/"
            color="inherit"
            sx={{
              marginLeft: "60px"
            }}
            >{t('home')}
          </Button>
          
          {regions.length > 0 && cities.length > 0
          ? 
            <>
              <DropDownMenu baseURL={baseURL+'region'} title={t('regions')} items={regions} />
              <DropDownMenu baseURL={baseURL+'city'} title={t('cities')} items={cities} />
            </>
          : null
          }

          <Button
            href="/createcottage"
            color="inherit"
            sx={{
            }}
            >{t('addCottage')} <AddIcon />
          </Button>

          <Button
            href="/reservations"
            color="inherit"
            sx={{
            }}
            >{t('reservations')} <TocIcon />
          </Button>
            
          <Box 
            sx={{ 
              height:"100%", 
              width:"35px", 
              cursor: "pointer",
              m:"0 10px 0 10px",
            }} 
            onClick={ () => {
              changeLanguage('en')
            }} 
            ><img src='/US-UK.svg' alt="us-uk" />
          </Box>

          <Box 
            sx={{ 
              height:"100%", 
              width:"35px", 
              cursor: "pointer" 
            }} 
            onClick={ () => {
              changeLanguage('fi')
            }} 
            ><img src='/FI.svg' alt="fi" />
          </Box>

        </>
        }
      </Toolbar>
    </AppBar>
    </>
  );
}