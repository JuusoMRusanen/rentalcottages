import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DateRangePickerCalendarExample from '../DatePicker/DateRangePickerCalendar';
import { Checkbox, FormControlLabel, FormGroup, LinearProgress, Paper, TextField } from '@mui/material';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ReservationDataService from './../../services/reservation.service';
import CottageDataService from '../../services/cottage.service';
import { useTranslation } from "react-i18next";

export default function ReservationStepper() {

  const location = useLocation();
  const { t } = useTranslation();

  // Current cottage
  const params = useParams();

  const [data, setData] = useState([]);
  const [gotCottage, setGotCottage] = useState(false);
  const [cottage, setCottage] = useState(null);

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
      label: t('selectDates'),
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
      <Typography variant='h6' mb={"0px"}>{t('price')+": "} {finalPrice}€</Typography>
      <Typography variant='body1' mb={"20px"}>({cottage ? cottage.price : null}€ {t('perWeek')})</Typography>
      </>
    },
    { // SECOND STEP
      label: t('fillForm'),
      description:
        t('fillFormDesc'),
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
        >{t('autoFill')}</Button>

        <br></br>
        <TextField
          sx={{
            mt:`${textFieldMargin}`,
            mb:`${textFieldMargin}`,
          }}
          required
          error={firstNameError}
          variant='standard'
          label={t('firstName')}
          id='firstName'
          name='firstName'
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
          label={t('lastName')}
          id='lastName'
          name='lastName'
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
          label={t('email')}
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
          label={t('homeAddress')}
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
          label={t('postalCode')}
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
          label={t('postalDistrict')}
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
            label={t('cleanUp')+" (+100€)"}
            id="cleanUp"
            name="cleanUp"
            type="boolean"
            onChange={(e,value) => setCleanup(value)}
            value={cleanUp}
            />
        </FormGroup>
        <Typography variant='h6' mb={"20px"}>{t('price')+": "} {finalPrice}€</Typography>
      </>
    },
    { // THIRD STEP
      label: t('wrappingUp'),
      description: t('wrappingUpDesc'),
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
            label={t('readTerms')}
            id="consent"
            name="consent"
            type="boolean"
            onChange={(e, value) => setConsent(value)}
            value={consent}
            />
        </FormGroup>
        <Typography variant='h6' mb={"0px"}>{t('finalPrice')+": "} {finalPrice}€</Typography>
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

    // Set data
    if (data) {
      try {
        setCottage(data.cottage[0])
      } catch (error) {}
    }

    // Data fetch
    if ( !gotCottage ) {
      CottageDataService.get(params.id)
      .then(res => setData(res.data, res.error))
      .catch(err => console.log(err));
      
      setGotCottage(true);
    }

    if(cottage) {

    const formValues = [firstName, lastName, email, homeAddress, postalCode, postalDistrict];

    setFormValues([
      {name: t("cottageId"), value: cottage.id},
      {name: t("cottageName"), value: cottage.cottageName}, 
      {name: t("firstName"), value: firstName}, 
      {name: t("lastName"), value: lastName}, 
      {name: t("email"), value: email}, 
      {name: t("homeAddress"), value: homeAddress}, 
      {name: t("postalCode"), value: postalCode}, 
      {name: t("postalDistrict"), value: postalDistrict}, 
      {name: t("cleanUp"), value: cleanUp ? "Kyllä" : "Ei"},
      {name: t("bookingDuration"), value: startDate.toLocaleDateString(t('dateLocale')) + " - " + endDate.toLocaleDateString(t('dateLocale'))},
      {name: t("finalPrice"), value: finalPrice}
    ]);
    
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
    setFinalPrice, 
    finalPrice,
    setFirstNameError, 
    setLastNameError, 
    setEmailError, 
    setHomeAddressError, 
    setPostalCodeError, 
    setPostalDistrictError,
    gotCottage, 
    params, 
    cottage, 
    data
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
                  <Typography variant="caption">{t('lastStep')}</Typography>
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
                    {index === steps.length - 1 ? t('confirmReservation') : t('continue')}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {t('goBack')}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>{t('sendingForm')}</Typography>
          <LinearProgress />
          {success && (
            <Navigate
              replace 
              to="/summary" 
              state={{
                formValues: formValues,
                primaryTitle: t('reservationSuccess'),
                secondaryTitle: t('reservationData')
              }}
            />
          )}
        </Paper>
      )}
      </form>
    </Box>
  );
}
