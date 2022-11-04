import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Cottage from "./components/Cottage/Cottage";
import ReserveCottage from "./components/ReservationPage/ReserveCottage";
import ReservationSummary from "./components/ReservationPage/ReservationSummary";
import HomePage from "./components/HomePage/HomePage";
import PhotoPostForm from "./components/PhotoPostForm";
import Navbar from "./components/AppBar/Navbar";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PostTestData from "./components/PostTestData";
import NewCottage from "./components/NewCottage/NewCottage";

export default function RentalCottages() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#FF461E",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 745,
        md: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
    dialogi_ikkuna: {
      padding: "20px"
    },
    cottageCardMedia: {
      height: "300px",
      display:"flex",
      justifyContent: "space-between",
    },
    paginationBox:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "20px",
      marginBottom: "20px",
    },
    topJumbo:{
      // backgroundImage: "url('/img/jarvi.jpg')",
      backgroundSize:"cover",
      backgroundPosition:"0px 1300px",
      backgroundAttachment:"fixed",
      textAlign: "center",
      margin:0,
    },
    bottomJumboText:{
      paddingBottom:"80px",
      paddingTop:"80px",
    },
    appBar:{
      margin:0,
    },
    appBarDesktop:{
      
    },
    cottageCardButtons:{
      height: "300px",
      display:"flex",
      justifyContent: "space-between",
      position:"absolute",
      
    }
  });

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<HomePage/>} />
        <Route path={'/city/:cityId'} element={<HomePage/>} />
        <Route path={'/region/:regionId'} element={<HomePage/>} />
        <Route path={'/cottage/:id'} element={<Cottage />} />
        <Route path={'/reserve/:id'} element={<ReserveCottage />} />
        <Route path={'/summary'} element={<ReservationSummary />} />
        <Route path={'/photopostform'} element={<PhotoPostForm /> } />
        <Route path={'/posttestdata'} element={<PostTestData /> } />
        <Route path={'/newcottage'} element={<NewCottage/>} />
      </Routes>
    </ThemeProvider>
    </div>
  );
}