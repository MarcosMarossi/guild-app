import axios from "axios";
import { API_URL } from '@env';

const api = axios.create({
  baseURL: `http://${API_URL}:8000`,
});

export default api;