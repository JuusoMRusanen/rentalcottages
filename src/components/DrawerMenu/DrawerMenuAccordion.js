import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box, Button, Grid } from '@mui/material';
import CityDataService from '../../services/city.service';
import RegionDataService from '../../services/region.service';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const Accordion = styled((props) => (

  <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const BoxDivider = () => {
 return(
  <Box
    sx={{
      width:"100%",
      m:"4px 0 0 4px",
    }}
  />
 ) 
}

export default function DrawerMenuAccordion({ toggleDrawer, baseURL }) {

  const [expanded, setExpanded] = useState('');

  const handleChange = (panel, listItemId, isFilter) => (event, newExpanded) => {

    setExpanded(newExpanded ? panel : false);

    toggleDrawer('left', false);

    if (panel === "panel1" && isFilter) {
      window.location.replace(`${baseURL+'city'}/${listItemId}`)
    }

    else if (panel === "panel2" && isFilter) {
      window.location.replace(`${baseURL+'region'}/${listItemId}`)
    }
  };

  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    
    // Get cities
    const GetCities = async () => {
      await CityDataService.getAll()
        .then(response => {
          setCities(response.data);
        })
    }

    // Get regions
    const GetRegions = async () => {
      await RegionDataService.getAll()
        .then(response => {
          setRegions(response.data);
        })
    }

    const timer = setTimeout(() => {

      // Get all cities
      if ( !cities.length > 0 ) {
        GetCities();
      }

      // Get all cities
      if ( !regions.length > 0 ) {
        GetRegions();
      }

    }, 500);
    return () => clearTimeout(timer);

  }, [ cities, regions ]);

  function ButtonList(props) {
    const listItems = props.listItems;
    const panelName = props.panelName;

    return(
      <Grid container>
        {listItems.map((listItem, idx) => {
          return(
            <Grid item xl={12} md={12} sm={12} xs={12} key={idx}>
              <Button variant="outlined"
                key={listItem.id}
                onClick={handleChange(panelName, listItem.id, true)}
                sx={{
                  width:"100%",
                  mt:"1px",
                  fontSize:"18px",
                }}
                > 
                {listItem.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <div>
      <BoxDivider />

      <Button
        variant="contained"
        component={Link}
        to={"/"}
        sx={{
          width:"100%",
          fontSize:"18px",
          p:"5px",
        }}
        onClick={ toggleDrawer('left', false) }
        >Etusivu
        <HomeIcon />
      </Button>

      <BoxDivider />

      <Button
        variant="contained"
        component={Link}
        to={"/createcottage"}
        sx={{
          width:"100%",
          m: "0 0 0 40px",
          fontSize:"18px",
          margin:0,
          p:"5px",
        }}
        onClick={ toggleDrawer('left', false) }
        >Lisää mökki
        <AddIcon />
      </Button>

      <BoxDivider />

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Kaupungit</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {cities ? <ButtonList listItems={cities} panelName={'panel1'} /> : null}
        </AccordionDetails>
      </Accordion>

      <BoxDivider />

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Alueet</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {regions ? <ButtonList listItems={regions} panelName={'panel2'} /> : null}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
