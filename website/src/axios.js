import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: "https://b-api.kresnawan.com/api/v1"
})

export default axiosPrivate;