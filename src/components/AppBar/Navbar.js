import { AppBar, Button, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { Box } from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import DropDownMenu from "./DropDownMenu";
import CityDataService from "../../services/city.service";
import RegionDataService from "../../services/region.service";

export default function Navbar() {

  const matches = useMediaQuery('(min-width:600px)');

  const [visibleOnMobile, setVisibleOnMobile] = useState(false);

  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [rootURL] = useState("/");
  
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
              Vuokramökit
            </Typography>
          </Box>
        </>
        :
        <>
          <HomeIcon />

          <Typography variant="h5" component="div">
            Vuokramökit
          </Typography>

          <Button
            href="/"
            color="inherit"
            sx={{
              marginLeft: "60px"
            }}
            >Etusivu
          </Button>
          
          {regions.length > 0 && cities.length > 0
          ? 
            <>
              <DropDownMenu url={rootURL+'region'} title={"Alueet"} items={regions} />
              <DropDownMenu url={rootURL+'city'} title={"Kaupungit"} items={cities} />
            </>
          : null
          }
        </>
        }
      </Toolbar>
    </AppBar>
    </>
  );
}