import axios from "../utils/axiosCustomize";

const getAllNews = async () => {
  return await axios.get("api/v1/news");
};

const getAllServicesIntro = async () => {
  return await axios.get("api/v1/services-intro");
};

const getAllShippingCondition = async () => {
  return await axios.get("api/v1/shipping-condition");
};

const postLogin = async (email, password) => {
  return await axios.post("api/v1/login", {
    email: email,
    password: password,
    delay: 1000,
  });
};

export { getAllNews, getAllServicesIntro, getAllShippingCondition, postLogin };
