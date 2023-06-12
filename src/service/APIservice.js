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

const getListOrder = async (status) => {
  return await axios.get(`api/v1/list-order/${status}`);
};

const getCustomer = async (orderID) => {
  return await axios.get(`api/v1/customer/${orderID}`);
};

const getBirdList = async (orderID) => {
  return await axios.get(`api/v1/bird/${orderID}`);
};

const putUpdateOrderStatus = async (orderID, status, departDate) => {
  return await axios.put("api/v1/update-order-status", {
    orderID: orderID,
    status: status,
    departDate: departDate,
  });
};

const postCreateTransportStatus = async (
  orderID,
  orderStatus,
  birdCondition,
  date
) => {
  return await axios.post("api/v1/create-transport-status", {
    orderID: orderID,
    orderStatus: orderStatus,
    birdCondition: birdCondition,
    date: date,
  });
};

const deleteTransportStatus = async (id) => {
  return await axios.delete(`api/v1/delete-order-status/${id}`);
};

const putUpdateTransportStatus = async (
  id,
  orderStatus,
  birdCondition,
  date
) => {
  return await axios.put("api/v1/update-transport-status", {
    id: id,
    orderStatus: orderStatus,
    birdCondition: birdCondition,
    date: date,
  });
};

const getAllRoute = async () => {
  return await axios.get(`api/v1/all-route`);
};

const getRouteDetail = async (routeID) => {
  return await axios.get(`api/v1/route/${routeID}`);
};

const getTripList = async (routeID) => {
  return await axios.get(`api/v1/trips/${routeID}`);
};

const getVehicle = async (vehicleID) => {
  return await axios.get(`api/v1/vehicle/${vehicleID}`);
};

const getDriverList = async (tripID) => {
  return await axios.get(`api/v1/drivers/${tripID}`);
};

const getProgressList = async (tripID) => {
  return await axios.get(`api/v1/progress/${tripID}`);
};

const postCreateProgress = async (tripID, description, date) => {
  return await axios.post("api/v1/create-progress", {
    tripID: tripID,
    description: description,
    date: date,
  });
};

const deleteProgressInfo = async (progressID) => {
  return await axios.delete(`api/v1/delete-progress/${progressID}`);
};

const putUpdateProgress = async (progressID, description, date) => {
  return await axios.put("api/v1/update-progress", {
    progressID: progressID,
    description: description,
    date: date,
  });
};

const getOrderCapacity = async (tripID) => {
  return await axios.get(`api/v1/order/${tripID}`);
};

const putUpdateTripStatus = async (tripID, status) => {
  return await axios.put("api/v1/update-trip-status", {
    tripID: tripID,
    status: status,
  });
};

const putRemoveOrder = async (orderID) => {
  return await axios.put("api/v1/remove-order", {
    orderID: orderID,
  });
};

const getPendingOrder = async () => {
  return await axios.get(`api/v1/pending-order`);
};

const putAssignOrder = async (orderID, tripID) => {
  return await axios.put("api/v1/assign-order", {
    orderID: orderID,
    tripID: tripID,
  });
};

const getOrderByTrip = async (tripID) => {
  return await axios.get(`api/v1/order-by-trip/${tripID}`);
};

const getCustomerByAccount = async (accountID) => {
  return await axios.get(`api/v1/customers/${accountID}`);
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
  getListOrder,
  getCustomer,
  getBirdList,
  putUpdateOrderStatus,
  postCreateTransportStatus,
  deleteTransportStatus,
  putUpdateTransportStatus,
  getAllRoute,
  getRouteDetail,
  getTripList,
  getVehicle,
  getDriverList,
  getProgressList,
  postCreateProgress,
  deleteProgressInfo,
  putUpdateProgress,
  getOrderCapacity,
  putUpdateTripStatus,
  putRemoveOrder,
  getPendingOrder,
  putAssignOrder,
  getOrderByTrip,
  getCustomerByAccount,
};
