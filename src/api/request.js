import axios from "axios";
export const API = {
  request: endpoint => {
    return axios.get(endpoint);
  }
};
