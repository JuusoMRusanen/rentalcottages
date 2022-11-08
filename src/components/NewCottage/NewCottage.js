import { Button, FormGroup, InputAdornment, MenuItem, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import CottageDataService from '../../services/cottage.service';
import CityDataService from "../../services/city.service";
import JumboTitle from "../JumboTitle/JumboTitle";

export default function NewCottage(){

  // Form values
  const [cottageName, setCottageName] = useState("");
  const [cityId, setCityId] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [cities, setCities] = useState([]);

  const handleSubmit = async (e) => {

    // prevent the page from reloading
    e.preventDefault();

    // construct form data for posting photos
    const formData = new FormData(e.currentTarget);
    const files = e.currentTarget.files;

    formData.append('name', cottageName);
    formData.append('cityId', cityId);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('price', price);
    formData.append('size', size);
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    CottageDataService.create({
      formData: formData,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // Styles
  const textFieldMargin = "10px 0 10px 0";

  useEffect(() => {

    const GetCities = async () => {
      await CityDataService.getAll()
        .then(response => {
          setCities(response.data);
        })
    }

    const timer = setTimeout(() => {

      // Get all cities
      if ( !cities.length > 0 ) {
        GetCities();
      }

    }, 500);
    return () => clearTimeout(timer);

  }, [ cities.length ]);

  return(
    <>
    <JumboTitle titleText={"Lisää uusi mökki"} />

    <Container maxWidth="xl"
      sx={{
        marginTop:"100px",
        mb:"200px",
        alignContent:"center",
      }}
    >
    
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <FormGroup>

        <Button
          variant='outlined'
          sx={{ m:textFieldMargin }}
          onClick={() => {
            setCottageName("TestiMökki1")
            setCityId(1)
            setBedrooms(2)
            setBathrooms(1)
            setPrice(550)
            setSize(120)
          }}
        >Automaattinen täyttö</Button>

        <TextField
          id="cottageName"
          label="Mökin nimi" 
          type="text"
          value={cottageName || ''}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setCottageName(e.target.value)}
          />

        <TextField
          select
          id="cityId"
          label="Kaupunki" 
          value={cityId || ''}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setCityId(e.target.value)}
          >
          {cities ? cities.map((city, idx) => {
            return (
            <MenuItem key={idx} value={city.id}>
              {city.name}
            </MenuItem>
            )
          }) : null}
        </TextField>

        <TextField
          id="bedrooms"
          type="number"
          value={bedrooms || ''}
          label="Makuuhuoneet"
          InputProps={{
            startAdornment: <InputAdornment position="start">{"kpl"}</InputAdornment>,
          }}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setBedrooms(e.target.value)}
          />

        <TextField
          id="bathrooms"
          type="number"
          value={bathrooms || ''}
          label="Kylpyhuoneet"
          InputProps={{
            startAdornment: <InputAdornment position="start">{"kpl"}</InputAdornment>,
          }}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setBathrooms(e.target.value)}
          />

        <TextField
          id="price"
          label="Viikkohinta" 
          type="number"
          value={price || ''}
          InputProps={{
            startAdornment: <InputAdornment position="start">{`€`}</InputAdornment>,
          }}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setPrice(e.target.value)}
          />

        <TextField
          id="size"
          type="number"
          value={size || ''}
          label="Pinta-ala"
          InputProps={{
            startAdornment: <InputAdornment position="start">{`m${"\u00B2"}`}</InputAdornment>,
          }}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setSize(e.target.value)}
          />

        <input
          multiple
          type="file" 
          name="files" 
          onChange={(e) => setSelectedFiles(e.target.files)}
          />
        
        <Button 
          variant="outlined" 
          size="large"
          type="submit"
          sx={{ m:textFieldMargin }}
          >Tallenna
        </Button>

      </FormGroup>
    </form>

    </Container>
    </>
  );
}