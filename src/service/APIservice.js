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
  address,
  avatar
) => {
  const data = new FormData();
  data.append("account_id", account_id);
  data.append("email", email);
  data.append("username", username);
  data.append("birthday", birthday);
  data.append("phone", phone);
  data.append("address", address);
  data.append("avatar", avatar);
  return await axios.put("api/v1/update-profile", data);
};

const putResetPassword = async (account_id, oldPassword, newPassword) => {
  return await axios.put("api/v1/reset-password", {
    account_id: account_id,
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
};

const getAllFAQ = async () => {
  return await axios.get("api/v1/faq");
};

const getAllService = async () => {
  return await axios.get("api/v1/service");
};

const getAllCage = async () => {
  return await axios.get("api/v1/cage");
};

const getAllPackage = async () => {
  return await axios.get("api/v1/package");
};

const getAllPayment = async () => {
  return await axios.get("api/v1/payment");
};

const getTotalCost = async (data) => {
  return await axios.post("api/v1/total-cost", data);
};

const postCreateOrder = async (data) => {
  return await axios.post("api/v1/create-order", data);
};

const getTransportStatus = async (orderID) => {
  return await axios.get(`api/v1/transport-status/${orderID}`);
};

const getPricing = async () => {
  return await axios.get("api/v1/price");
};

export {
  getAllNews,
  getAllServicesIntro,
  getAllShippingCondition,
  postLogin,
  postSignup,
  getAllStation,
  putUpdateProfile,
  putResetPassword,
  getAllFAQ,
  getAllService,
  getAllCage,
  getAllPackage,
  getAllPayment,
  getTotalCost,
  postCreateOrder,
  getTransportStatus,
  getPricing,
};
