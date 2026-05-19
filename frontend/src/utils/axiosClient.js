import axios from 'axios'
import { ENVConstants } from '../constant/Env.Constants'

export const axiosClient=axios.create({
  baseURL:`${ENVConstants.VITE_APP_BACKEND_URI}/api/v1`,
  withCredentials: true
})
