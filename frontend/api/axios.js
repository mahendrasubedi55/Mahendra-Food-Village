import axios from 'axios'

const defaultBackendUrl = `${window.location.protocol}//${window.location.hostname}:7000`
const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim() || defaultBackendUrl

const api = axios.create({
  baseURL: backendUrl.replace(/\/$/, ''),
  withCredentials: true,
})

export default api
