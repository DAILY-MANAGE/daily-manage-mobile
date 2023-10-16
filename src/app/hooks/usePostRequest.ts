/* import axios, { AxiosResponse } from "axios";
import ResponseType from "../interfaces/RequestType";
import { useState } from "react";

const usePostRequest = (url: string, data: {}) => {
  const [response, setResponse] = useState<AxiosResponse<any, any>>(undefined);

  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleSubmit = async () => {
    const response = await instance.post(url, data);
    setResponse(response)
  };

  return {
    response,
    handleSubmit,
  };
};

export default usePostRequest; */