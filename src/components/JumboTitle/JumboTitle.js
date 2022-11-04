import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

export default function JumboTitle ({ titleText }) {

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

  return(
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
        >
        {titleText ? titleText : "Kaikki mökit."}
      </Typography>
    </Box>
  )
}