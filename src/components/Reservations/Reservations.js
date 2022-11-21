import { CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReservationDataService from "../../services/reservation.service"

export default function Reservations() {

  const [reservations, setReservations] = useState()

  const { t } = useTranslation();

  // Get all reservations
  const getAllReservations = async () => {
    ReservationDataService.getAll()
    .then(response => {
      setReservations(response.data);
    })
  }

  useEffect(() => {
    getAllReservations();
  }, [])
  
  return(
  <Container 
    maxWidth="xl"
    sx={{
      textAlign: "center",
      mt:"90px"
    }}
    >
    <Typography variant="h2" mb={"50px"}> {t('reservations')} </Typography>

    <TableContainer component={Paper}>
      <Table sx={{ width:"100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> {t('reservation')} </TableCell>
            <TableCell align="right"> {t('cottageId')} </TableCell>
            <TableCell align="right"> {t('firstName')} </TableCell>
            <TableCell align="right"> {t('lastName')} </TableCell>
            <TableCell align="right"> {t('email')} </TableCell>
            <TableCell align="right"> {t('homeAddress')} </TableCell>
            <TableCell align="right"> {t('postalCode')} </TableCell>
            <TableCell align="right"> {t('postalDistrict')} </TableCell>
            <TableCell align="right"> {t('cleanUp')} </TableCell>
            <TableCell align="right"> {t('finalPrice')} </TableCell>
            <TableCell align="right"> {t('startDate')} </TableCell>
            <TableCell align="right"> {t('endDate')} </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations ? reservations.map((reservation) => {
            
            const startDate = moment(reservation.startDate).format(t('dateFormat'))
            const endDate = moment(reservation.endDate).format(t('dateFormat'))

            return(
            <TableRow
              key={reservation.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell 
                component="th" 
                scope="reservation"
                >
                {reservation.id}
              </TableCell>
              <TableCell align="right">{reservation.cottageId}</TableCell>
              <TableCell align="right">{reservation.firstName}</TableCell>
              <TableCell align="right">{reservation.lastName}</TableCell>
              <TableCell align="right">{reservation.email}</TableCell>
              <TableCell align="right">{reservation.homeAddress}</TableCell>
              <TableCell align="right">{reservation.postalCode}</TableCell>
              <TableCell align="right">{reservation.postalDistrict}</TableCell>
              <TableCell align="right">{reservation.cleanUp ? t('yes') : t('no') }</TableCell>
              <TableCell align="right">{reservation.finalPrice}</TableCell>
              <TableCell align="right">{startDate}</TableCell>
              <TableCell align="right">{endDate}</TableCell>
            </TableRow>
            )
          }) : <CircularProgress /> }
        </TableBody>
      </Table>
    </TableContainer>
    
  </Container>
  );
}