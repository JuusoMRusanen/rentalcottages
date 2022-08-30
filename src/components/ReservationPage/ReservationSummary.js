import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function ReservationSummary() {

  const location = useLocation();

  const valueNames = [
    "Varattu kohde",
    "Etunimi",
    "Sukunimi",
    "Sähköpostiosoite",
    "Kotiosoite",
    "Postinumero",
    "Postitoimipaikka",
    "Loppusiivous",
    "Loppuhinta(€)",
  ];
  
  return(
  <>
  <Container 
    maxWidth="md"
    sx={{
      textAlign: "center",
      mt:"90px"
    }}
    >
    <Typography variant="h2" mb={"50px"}>Varaus onnistui!</Typography>

    <Paper>
    <Typography variant="h4" p={"20px"} >Varauksen tiedot:</Typography>
    <Grid container
      sx={{
        textAlign:"left",
        mb:"30px",
      }}
      >
      {location.state.formValues 
      ?
      location.state.formValues.map((formValue, idx) => {
        return(
          <>
          <Grid item 
            xs={6} 
            key={idx}
            sx={{
              pt:"5px",
              pb:"5px",
            }}
            >

            <Typography
              variant="body1"
              sx={{
                pt:"10px",
                pb:"10px",
                pl:"5px",
                fontWeight:"bold",
              }}
            >{valueNames[idx]}: </Typography>
            
          </Grid>

          <Grid item 
            xs={6} 
            key={`${idx}${idx}`}
            sx={{
              pt:"5px",
              pb:"5px",
            }}
            >
            
            <Typography
              variant="body1"
              sx={{
                pt:"10px",
                pb:"10px",
              }}
            >{formValue}</Typography>
            
          </Grid>
          {idx !== location.state.formValues.length - 1 
          ? <Grid item xs={12} key={`${idx}${idx}${idx}`} > 
              <Divider /> 
            </Grid>
          : null
          }
          </>
        );
      })
      : null
      }
    </Grid>
    </Paper>
    <Button
      variant="contained"
      component={Link}
      to={'/'}
      sx={{
        width:"100%",
        height:"60px",
        fontSize:"20px"
      }}
    >Takaisin etusivulle</Button>
  </Container>
  <Box
    sx={{
      //backgroundImage: "url('/img/jarvi.jpg')",
      //backgroundSize:"cover",
      //backgroundPosition:"0px 300px",
      //backgroundAttachment:"fixed",
      background: "",
      textAlign: "center",
      margin:0,
      height:100,
    }}
    >
    <Typography variant="h1" component={"div"}></Typography>
  </Box>
  </>
  );
}