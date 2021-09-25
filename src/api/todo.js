import axios from "axios";

let DEV = true;

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: DEV ? "http://localhost:3333/api/v1" : "https://teobot-todo-api.herokuapp.com/api/v1",
    timeout: 5000,
  });

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();