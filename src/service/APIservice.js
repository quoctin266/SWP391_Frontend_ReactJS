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

const postSignup = async (email, username, password) => {
  return await axios.post("api/v1/register", {
    email: email,
    username: username,
    password: password,
  });
};

const getAllStation = async () => {
  return await axios.get("api/v1/station");
};

const putUpdateProfile = async (
  account_id,
  email,
  username,
  birthday,
  phone,
  address
) => {
  return await axios.put("api/v1/update-profile", {
    account_id: account_id,
    email: email,
    username: username,
    birthday: birthday,
    phone: phone,
    address: address,
  });
};

export {
  getAllNews,
  getAllServicesIntro,
  getAllShippingCondition,
  postLogin,
  postSignup,
  getAllStation,
  putUpdateProfile,
};
