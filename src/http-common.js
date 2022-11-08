import axios from "axios";

export default axios.create({
  //baseURL: "https://rentalcottages.herokuapp.com/api", // PRODUCTION URL
  baseURL: "http://localhost:8080/api", // DEVELOPMENT URL
  headers: {
    "Content-type": "application/json"
  }
});