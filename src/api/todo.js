import axios from "axios";

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:3333/api/v1",
    timeout: 5000,
  });

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();