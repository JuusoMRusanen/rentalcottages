import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import CottageCardGrid from "../CardGrid/CottageCardGrid";

export default function RentalCottagesFrontPage() {

  const matches = useMediaQuery('(min-width:600px)');
  const [titleVariant, setTitleVariant] = useState("h2");
  
  useEffect(() => {
    if(matches) {
      setTitleVariant("h2");
    }
    else {
      setTitleVariant("h3");
    }
  }, [matches]);

return (
  <>
  <Box
    sx={{
      textAlign: "center",
      margin:0,
      background: "lightgray",
      mb:"5px",
    }}
    >
    <Typography 
      variant={titleVariant} 
      component={"div"} 
      sx={{
        paddingBottom:"50px",
        paddingTop:"100px",
        color:"white",
        fontWeight:"bold",
      }}
      >Kaikki mökit.</Typography>
  </Box>

  <Container 
    maxWidth="xl"
    sx={{
      textAlign: "center",
    }}
    >

    <CottageCardGrid />

  </Container>
  <Box 
    sx={{
      background: "lightgray",
      textAlign: "center",
      margin:0,
      height:600,
    }}
    >
    <Typography variant="h1" component={"div"}></Typography>
  </Box>
  </>
);
}