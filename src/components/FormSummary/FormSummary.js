import { Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function FormSummary() {

  const location = useLocation();
  const { t } = useTranslation();
  
  return(
  <Container 
    maxWidth="md"
    sx={{
      textAlign: "center",
      mt:"90px",
      pb:"100px"
    }}
    >
    <Typography 
      variant="h2" 
      mb={"50px"}
      >{location.state.primaryTitle ? location.state.primaryTitle : null}
    </Typography>

    <Paper
      sx={{
        mb:"30px",
      }}
    >
    <Typography 
      variant="h4" 
      p={"20px"} 
      >{location.state.secondaryTitle ? location.state.secondaryTitle : null}
    </Typography>
    
      {location.state.formValues 
        ? location.state.formValues.map((formValue, idx) => {
          return(
            <Grid container
              sx={{
                textAlign:"left",
                pl:"10px"
              }}
              key={`ListItem${idx}`}
              >
              <Grid item
                xs={6} 
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
                >{formValue.name}: </Typography>
              </Grid>

              <Grid item 
                xs={6}
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
                >{formValue.value}</Typography>
              </Grid>

              {idx !== location.state.formValues.length - 1 
              ? <Grid item xs={12} > 
                  <Divider /> 
                </Grid>
              : null
              }
            </Grid>
          );
        })
      : null
      }
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
      >{t('returnHome')}
    </Button>

  </Container>
  );
}