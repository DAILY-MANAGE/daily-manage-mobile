import { AxiosResponse } from 'axios'

export interface CustomResponse extends AxiosResponse {
  errors?: string[]
}