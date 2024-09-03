import axios from 'axios';
const axiosApi = axios.create({
    baseURL: "http://localhost:8038"
});
export default axiosApi;