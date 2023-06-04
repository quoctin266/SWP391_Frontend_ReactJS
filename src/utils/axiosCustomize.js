import axios from "axios";
import nprogress from "nprogress";

nprogress.configure({ showSpinner: false, trickleSpeed: 40 }); //config loading bar

const instance = axios.create({
  baseURL: "http://localhost:8080/",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    nprogress.start(); //start running loading bar
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nprogress.done();

    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
