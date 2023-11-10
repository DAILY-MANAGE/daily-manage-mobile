import axios from "axios";
import { ENDPOINT } from "./endpoints";

export const axiosInstance = axios.create({
 baseURL: ENDPOINT
})