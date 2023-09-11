import { AxiosResponse } from 'axios'

export interface RequestType extends AxiosResponse<any, any> {
  errors?: string[]
}