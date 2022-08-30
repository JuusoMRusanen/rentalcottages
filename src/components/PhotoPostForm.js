import { Container } from "@mui/system";
import { useState } from "react";
//import axios from "axios";

export default function PhotoPostForm(){

  const [cottageId, setCottageId] = useState("1");
  const [photoId, setPhotoId] = useState("12");

  const handleSubmit = async (event) => {

    await fetch('/postPhoto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cottageId: cottageId, photoId: photoId })
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
    <form onSubmit={handleSubmit} >
      <label>
        CottageId:
        <input type="number" id="cottageId" name="cottageId" value={cottageId} onChange={(e)=>{ setCottageId(e.target.value) }} />
        <br></br>
        PhotoId:
        <input type="number" id="photoId" name="photoId" value={photoId} onChange={(e)=>{ setPhotoId(e.target.value) }} />
      </label>
      <br></br>
      <input type="submit" value="Submit" />
    </form>
    </Container>
    </>
  );
}