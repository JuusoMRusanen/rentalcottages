import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DateRangePickerCalendarExample from '../DatePicker/DateRangePickerCalendar';
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, LinearProgress, Paper, TextField } from '@mui/material';
import cottages from '../Data/cottages.json';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ReservationDataService from './../../services/reservation.service';

export default function ReservationStepper() {

  const location = useLocation();

  // Current cottage
  const params = useParams();
  const cottage = cottages[params.id - 1];

  // Date picker values
  const [startDate, setStartDate] = useState(location.state.startDate ? location.state.startDate : null);
  const [endDate, setEndDate] = useState(location.state.endDate ? location.state.endDate : null);

  // Form values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalDistrict, setPostalDistrict] = useState('');
  const [cleanUp, setCleanup] = useState(false);
  const [consent, setConsent] = useState(false);

  // Form errors
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [homeAddressError, setHomeAddressError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [postalDistrictError, setPostalDistrictError] = useState(false);

  // Next Button disabled/enabled
  const [disabled, setDisabled] = useState(true);

  // Final price
  const [finalPrice, setFinalPrice] = useState(0);

  // Form values to be sent
  const [formValues, setFormValues] = useState([]);

  // Good response from server on form data send
  const [success, setSuccess] = useState(false);

  const textFieldMargin = "10px";

  const steps = [
    { // FIRST STEP
      label: 'Valitse aloitus- ja lopetuspäivä',
      description: ``,
      component:
      <>
      <DateRangePickerCalendarExample 
        maxWidth={"500px"} 
        showSelectedDates={true}
        mb={"30px"}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        />
      <Typography variant='h6' mb={"0px"}>Loppuhinta: {finalPrice}€</Typography>
      <Typography variant='body1' mb={"20px"}>({cottage.price}€ /vko)</Typography>
      </>
    },
    { // SECOND STEP
      label: 'Täytä lomake',
      description:
        'Tähdellä merkityt kohdat ovat pakollisia',
      component:
      <>
        <Button
          variant='outlined'
          onClick={() => {
            setFirstName("Aku");
            setLastName("Ankka");
            setEmail("aku.ankka@ankkamail.fi");
            setHomeAddress("Paratiisitie 13");
            setPostalCode("131313");
            setPostalDistrict("Ankkalinna");
          }}
        >Automaattinen täyttö</Button>

        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={firstNameError}
          variant='standard'
          label="Etunimi"
          id="firstName"
          name="firstName"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        
        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={lastNameError}
          variant='standard'
          label="Sukunimi"
          id="lastName"
          name="lastName"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        
        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={emailError}
          variant='standard'
          label="Sähköpostiosoite"
          id="email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={homeAddressError}
          variant='standard'
          label="Kotiosoite"
          id="homeAddress"
          name="homeAddress"
          type="text"
          onChange={(e) => setHomeAddress(e.target.value)}
          value={homeAddress}
        />

        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={postalCodeError}
          variant='standard'
          label="Postinumero"
          id="postalCode"
          name="postalCode"
          type="text"
          onChange={(e) => setPostalCode(e.target.value)}
          value={postalCode}
        />

        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={postalDistrictError}
          variant='standard'
          label="Postitoimipaikka"
          id="postalDistrict"
          name="postalDistrict"
          type="text"
          onChange={(e) => setPostalDistrict(e.target.value)}
          value={postalDistrict}
        />

        <br></br>
        <FormGroup
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          >
          <FormControlLabel 
            control={<Checkbox />} 
            label="Loppusiivous (100€)" 
            id="cleanUp"
            name="cleanUp"
            type="boolean"
            onChange={(e,value) => setCleanup(value)}
            value={cleanUp}
            />
        </FormGroup>
        <Typography variant='h6' mb={"20px"}>Hinta: {finalPrice}€</Typography>
      </>
    },
    { // THIRD STEP
      label: 'Viimeistely',
      description: `Varmista, että tietosi ovat oikein.`,
      component: 
      <>
        <FormGroup
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          >
          <FormControlLabel 
            control={<Checkbox />} 
            label="Olen lukenut käyttöehdot" 
            id="consent"
            name="consent"
            type="boolean"
            onChange={(e, value) => setConsent(value)}
            value={consent}
            />
        </FormGroup>
        <Typography variant='h6' mb={"0px"}>Loppuhinta: {finalPrice}€</Typography>
      </>
    },
  ];
  
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {

    // prevent the page from reloading
    e.preventDefault();

    const timer = setTimeout( async () => {

      await ReservationDataService.create({
        'cottageId' : cottage.id,
        'firstName' : firstName,
        'lastName' : lastName,
        'email' : email,
        'homeAddress' : homeAddress,
        'postalCode' : postalCode,
        'postalDistrict' : postalDistrict,
        'cleanUp' : cleanUp,
        'finalPrice' : finalPrice,
        'startDate' : startDate,
        'endDate': endDate
      })
      .then(function (response) {
        console.log(response.status);
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

  useEffect(() => {

    const formValues = [firstName, lastName, email, homeAddress, postalCode, postalDistrict];
    setFormValues([`${cottage.id}, ${cottage.name}`, firstName, lastName, email, homeAddress, postalCode, postalDistrict, cleanUp ? "Kyllä" : "Ei", finalPrice]);
    //const errors = [firstNameError, lastNameError, emailError, homeAddressError, postalCodeError, postalDistrictError];
    const setErrors = [setFirstNameError, setLastNameError, setEmailError, setHomeAddressError, setPostalCodeError, setPostalDistrictError];

    let calculateFinalPrice = () => {
      let dateDelta = Math.ceil((endDate - startDate)/(24*3600*1000) + 1);
      let price = parseFloat((cottage.price / 7) * dateDelta).toFixed(2);

      setFinalPrice(Number(price));

      if( cleanUp ){
        setFinalPrice(Number(price) + Number(100));
      }
    }

    // Form error checks
    if( activeStep === 0 ){

      if( !startDate ){
        setDisabled(true);
      }
      else if( !endDate ){
        setDisabled(true);
      }
      else{
        setDisabled(false);
      }

      calculateFinalPrice();
    }

    if( activeStep === 1 ){

      setDisabled(true);

      let correctValues = 0;
      
      for (let i = 0; i < formValues.length; i++) {
        if (formValues[i] <= 0) {
          setErrors[i](true);
        }
        else {
          setErrors[i](false);
          correctValues += 1;
        } 
      }

      // If required amount of correct values, allow user to proceed to the next step
      if (correctValues === 6) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }

      calculateFinalPrice();
    }

    if( activeStep === 2 ){

      setDisabled(true);

      if( !consent ){
        setDisabled(true);
      }
      else{
        setDisabled(false);
      }

      calculateFinalPrice();
    }

  },[
    firstName, 
    lastName, 
    email, 
    homeAddress, 
    postalCode, 
    postalDistrict, 
    firstNameError, 
    lastNameError, 
    emailError, 
    homeAddressError, 
    postalCodeError, 
    postalDistrictError, 
    disabled, 
    consent, 
    activeStep, 
    endDate, 
    startDate, 
    cleanUp, 
    cottage.price, 
    setFinalPrice, 
    finalPrice,
    setFirstNameError, 
    setLastNameError, 
    setEmailError, 
    setHomeAddressError, 
    setPostalCodeError, 
    setPostalDistrictError,
    cottage.id,
    cottage.name
  ]);

  return (
    <Box 
      sx={{ 
        width:"100%",
        }}
      >
      <form
        onSubmit={handleSubmit}
        encType="application/json"
      >
      <Stepper activeStep={activeStep} orientation="vertical" >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Viimeinen vaihe</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }} >
              <Typography
                sx={{
                  mb:"10px",
                }}
                >
                {step.description}</Typography>
              {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    disabled={disabled}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    type={index === steps.length - 1 ? "submit" : "button"}
                  >
                    {index === steps.length - 1 ? 'Varmista tilaus' : 'Jatka'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Takaisin
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Lähetetään lomaketta...</Typography>
          <LinearProgress />
          {success && (
            <Navigate
              replace 
              to="/summary" 
              state={{
                formValues: formValues,
              }}
            />
          )}
        </Paper>
      )}
      </form>
    </Box>
  );
}
