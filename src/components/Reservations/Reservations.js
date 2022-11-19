import { Container, Typography } from "@mui/material";

export default function ReservationSummary() {
  
  return(
  <Container 
    maxWidth="md"
    sx={{
      textAlign: "center",
      mt:"90px"
    }}
    >
    <Typography variant="h2" mb={"50px"}>Varaukset</Typography>

    
  </Container>
  );
}