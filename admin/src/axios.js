import axios from "axios";

const axiosPrivate = axios.create({
    baseURL: "http://localhost:3032/api/v1"
});

export default axiosPrivate