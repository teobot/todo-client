import axios from "axios";

let DEV = false;

const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: DEV ? "http://localhost:3333/api/v1" : "https://teobot-todo-api.herokuapp.com/api/v1",
    timeout: 10000,
  });

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();
