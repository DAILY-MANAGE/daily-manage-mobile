import axios from "axios";
import { BASEURL } from "./endpoints";

export const axiosInstance = axios.create({
 baseURL: BASEURL
})