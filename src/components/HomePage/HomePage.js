import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import CottageCardGrid from "../CardGrid/CottageCardGrid";
import JumboTitle from "../JumboTitle/JumboTitle.js";

export default function RentalCottagesFrontPage() {

  const [titleText, setTitleText] = useState("");

  const getCityOrRegionName = (value) => {
    setTitleText(value)
  }

return (
  <>
  <JumboTitle titleText={titleText} />

  <Container 
    maxWidth="xl"
    sx={{
      textAlign: "center",
    }}
    >

    <CottageCardGrid getCityOrRegionName={getCityOrRegionName} />

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