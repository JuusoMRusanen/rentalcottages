import { Typography } from "@mui/material";
import { Container } from "@mui/system";
//import axios from "axios";

export default function PostTestData(){

  const handleSubmit = async (event) => {

    await fetch('/postTestData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: ""
    })
    .then(response => response.json());
  }

  return(
    <>
    <Container maxWidth="xl"
      sx={{
        marginTop:"100px",
        alignContent:"center",
      }}
    >
    <Typography variant="h3" >Warning: click only once!</Typography>
    <form onSubmit={handleSubmit} >
      <input type="submit" value="DON'T CLICK" />
    </form>
    </Container>
    </>
  );
}