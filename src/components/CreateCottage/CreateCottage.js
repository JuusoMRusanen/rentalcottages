import { Button, FormGroup, InputAdornment, LinearProgress, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import CottageDataService from '../../services/cottage.service';
import CityDataService from "../../services/city.service";
import JumboTitle from "../JumboTitle/JumboTitle";
import { Navigate } from "react-router-dom";

export default function CreateCottage(){

  // Form values
  const [cottageName, setCottageName] = useState("");
  const [cityId, setCityId] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);

  // Form errors
  const [cottageNameError, setCottageNameError] = useState(false);
  const [cityIdError, setCityIdError] = useState(false);
  const [bedroomsError, setBedroomsError] = useState(false);
  const [bathroomsError, setBathroomsError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [selectedFilesError, setSelectedFilesError] = useState(false);

  // Form values to be sent
  const [formValues, setFormValues] = useState([]);

  const [cities, setCities] = useState([]);

  // If sending form data
  const [sending, setSending] = useState(false);

  // Good response from server on sent form data
  const [success, setSuccess] = useState(false);

  // Submit Button disabled/enabled
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {

    // prevent the page from reloading
    e.preventDefault();

    setSending(true);

    setFormValues([
      cottageName, 
      cities[cityId] ? cities[cityId].name : null, 
      bedrooms, 
      bathrooms, 
      price, 
      size,
      selectedFiles ? selectedFiles.length : 0,
    ])

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
      formData.append('files', files[i])
    }

    const timer = setTimeout( async () => {

      CottageDataService.create({
        formData: formData
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          setSuccess(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }, 500);
    return () => clearTimeout(timer);

  }

  // Styles
  const textFieldMargin = "10px 0 10px 0";

  useEffect(() => {

    // List form values for validation
    const formValues = [
      cottageName, 
      cities[cityId] ? cities[cityId].name : null, 
      bedrooms, 
      bathrooms, 
      price, 
      size,
      selectedFiles ? selectedFiles.length : 0,
    ]

    const setErrors = [setCottageNameError, setCityIdError, setBedroomsError, setBathroomsError, setPriceError, setSizeError, setSelectedFilesError];

    let correctValues = 0;
    
    // If the fields contain somethingm, set error to false for that field
    for (let i = 0; i < formValues.length; i++) {
      if (formValues[i] <= 0) {
        setErrors[i](true);
      } else {
        setErrors[i](false);
        correctValues += 1;
      }
    }

    // Check if there are too many files selected
    if (selectedFiles !== null) {
      if (selectedFiles.length >= 7) {
        correctValues -= 1;
        setSelectedFilesError(true); 
      }
    }

    // If required amount of correct values, allow user to proceed to the next step
    if (correctValues === 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    
    // Get cities
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

  }, 
  [ 
    cities, 
    formValues,
    cottageName,
    cityId,
    bedrooms,
    bathrooms,
    price,
    size,
    selectedFiles,
    cottageNameError,
    cityIdError,
    bedroomsError,
    bathroomsError,
    priceError,
    selectedFilesError
  ]);

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
          required
          error={cottageNameError}
          value={cottageName || ''}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setCottageName(e.target.value)}
          />

        <TextField
          select
          id="cityId"
          label="Kaupunki" 
          required
          error={cityIdError}
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
          required
          error={bedroomsError}
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
          required
          error={bathroomsError}
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
          required
          error={priceError}
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
          required
          error={sizeError}
          value={size || ''}
          label="Pinta-ala"
          InputProps={{
            startAdornment: <InputAdornment position="start">{`m${"\u00B2"}`}</InputAdornment>,
          }}
          sx={{ m:textFieldMargin }}
          onChange={(e) => setSize(e.target.value)}
          />
        
        <Typography color={selectedFilesError ? "red" : ""} >Syötä kuvat mökistä (väh. 1, max. 6)</Typography>
        <input
          required
          multiple
          type="file" 
          name="files"
          onChange={(e) => setSelectedFiles(e.target.files)}
          />
        
        <Button 
          variant="outlined" 
          size="large"
          type="submit"
          disabled={disabled}
          sx={{ m:"20px 0 0 0" }}
          >Tallenna
        </Button>

      </FormGroup>
    </form>

    {sending && (<Paper square elevation={0} sx={{ p: 3 }}>
      <Typography>Lähetetään lomaketta...</Typography>
      <LinearProgress />
      {success && (
        <Navigate
          replace 
          to="/createcottagesummary" 
          state={{
            formValues: formValues,
          }}
        />
      )}
    </Paper>)}

    </Container>
    </>
  );
}