import getBaseURL from "./getBaseURL";
import axios from "axios";

export default axios.create({
  baseURL: getBaseURL() + '/api',
  headers: {
    "Content-type": "application/json"
  }
});