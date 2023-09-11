import axios from "react-native-axios"
import { useState } from "react";
import { RequestType } from "../interfaces/RequestType";
import { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
})

export const usePostRequest = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<string[]>();
  
  const post = async (payload: unknown) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(url, payload);
      setData(response.data);
    } catch (error) {
      const axiosError = (error as AxiosError).response as RequestType;
      if (axiosError) {
        setError(axiosError.data.errors);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    error,
    loading,
    post,
  }
}