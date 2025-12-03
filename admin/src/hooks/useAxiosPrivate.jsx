import axiosPrivate from "../axios.js";

function useAxiosPrivate() {
  axiosPrivate.interceptors.response.use()

  return axiosPrivate
}

export default useAxiosPrivate