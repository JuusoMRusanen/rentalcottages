import { AppBar, Button, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CitysData from "../Data/citys.json"
import RegionsData from "../Data/regions.json"
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { Box } from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import DropDownMenu from "./DropDownMenu";

export default function RentalCottagesAppBar() {

  const matches = useMediaQuery('(min-width:600px)');

  const [visibleOnMobile, setVisibleOnMobile] = useState(false);
  

  useEffect(() => {
    if(matches) {
      setVisibleOnMobile(false);
    }
    else {
      setVisibleOnMobile(true);
    }
  }, [matches]);

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
            component={Link}
            to={"/"}
            color="inherit"
            sx={{
              marginLeft: "40px",
            }}
            >Etusivu</Button>
          
          <DropDownMenu menuTitle={"Alueet"} menuItems={RegionsData} />
          <DropDownMenu menuTitle={"Kaupungit"} menuItems={CitysData} />
        </>
        }
      </Toolbar>
    </AppBar>
    </>
  );
}