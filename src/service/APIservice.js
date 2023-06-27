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

const getListOrder = async () => {
  return await axios.get(`api/v1/list-order`);
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

const putAssignOrder = async (orderList, tripID) => {
  return await axios.put("api/v1/assign-order", {
    orderList: orderList,
    tripID: tripID,
  });
};

const getOrderByTrip = async (tripID) => {
  return await axios.get(`api/v1/order-by-trip/${tripID}`);
};

const getCustomerByAccount = async (accountID) => {
  return await axios.get(`api/v1/customers/${accountID}`);
};

const postCreateRoute = async (routeDetail, description) => {
  return await axios.post("api/v1/create-route", {
    routeDetail: routeDetail,
    description: description,
  });
};

const putUpdateRoute = async (routeDetail, description, routeID) => {
  return await axios.put("api/v1/update-route", {
    routeDetail: routeDetail,
    description: description,
    routeID: routeID,
  });
};

const getAllVehicle = async () => {
  return await axios.get(`api/v1/allvehicle`);
};

const getAllDriver = async () => {
  return await axios.get(`api/v1/alldriver`);
};

const postCreateTrip = async (routeID, driverInfo, depart, vehicleID) => {
  return await axios.post("api/v1/create-trip", {
    routeID: routeID,
    driverInfo: driverInfo,
    depart: depart,
    vehicleID: vehicleID,
  });
};

const getEstimateCost = async (cageID, birdCount, distance) => {
  return await axios.post("api/v1/estimate-cost", {
    cageID: cageID,
    birdCount: birdCount,
    distance: distance,
  });
};

const postCreateSender = async (accountID, name, address, phone) => {
  return await axios.post("api/v1/sender", {
    accountID: accountID,
    name: name,
    address: address,
    phone: phone,
  });
};

const postCreateFeedback = async (
  accountID,
  title,
  description,
  createTime
) => {
  return await axios.post("api/v1/create-feedback", {
    accountID: accountID,
    title: title,
    description: description,
    createTime: createTime,
  });
};

const getAllFeedback = async () => {
  return await axios.get("api/v1/all-feedback");
};

const postCreatePayment = async (type, name) => {
  return await axios.post("api/v1/create-payment", {
    type: type,
    name: name,
  });
};

const putUpdatePayment = async (id, name, type) => {
  return await axios.put("api/v1/update-payment", {
    id: id,
    name: name,
    type: type,
  });
};

const deletePayment = async (id) => {
  return await axios.delete(`api/v1/delete-payment/${id}`);
};

const postCreatePrice = async (min, max, initCost, addition, unitCost) => {
  return await axios.post("api/v1/create-price", {
    min: min,
    max: max,
    initCost: initCost,
    addition: addition,
    unitCost: unitCost,
  });
};

const putUpdatePrice = async (min, max, initCost, addition, unitCost, id) => {
  return await axios.put("api/v1/update-price", {
    min: min,
    max: max,
    initCost: initCost,
    addition: addition,
    unitCost: unitCost,
    id: id,
  });
};

const deletePrice = async (id) => {
  return await axios.delete(`api/v1/delete-price/${id}`);
};

const postCreatePackage = async (name, type, healthcare, pickup, price) => {
  return await axios.post("api/v1/create-package", {
    name: name,
    type: type,
    healthcare: healthcare,
    pickup: pickup,
    price: price,
  });
};

const putUpdatePackage = async (name, type, healthcare, pickup, price, id) => {
  return await axios.put("api/v1/update-package", {
    name: name,
    type: type,
    healthcare: healthcare,
    pickup: pickup,
    price: price,
    id: id,
  });
};

const deletePackage = async (id) => {
  return await axios.delete(`api/v1/delete-package/${id}`);
};

const postCreateVehicle = async (name, capacity) => {
  return await axios.post("api/v1/create-vehicle", {
    name: name,
    capacity: capacity,
  });
};

const putUpdateVehicle = async (name, capacity, id) => {
  return await axios.put("api/v1/update-vehicle", {
    name: name,
    capacity: capacity,
    id: id,
  });
};

const deleteVehicle = async (id) => {
  return await axios.delete(`api/v1/delete-vehicle/${id}`);
};

const postCreateStation = async (name, address) => {
  return await axios.post("api/v1/create-station", {
    name: name,
    address: address,
  });
};

const putUpdateStation = async (name, address, id) => {
  return await axios.put("api/v1/update-station", {
    name: name,
    address: address,
    id: id,
  });
};

const deleteStation = async (id) => {
  return await axios.delete(`api/v1/delete-station/${id}`);
};

const getCustomerOrder = async (accountID) => {
  return await axios.get(`api/v1/order-by-customer/${accountID}`);
};

const putCancelOrder = async (orderID) => {
  return await axios.put("api/v1/cancel-order", {
    orderID: orderID,
  });
};

const getAllAccount = async () => {
  return await axios.get(`api/v1/all-account`);
};

const putUpdateAccount = async (role, status, id) => {
  return await axios.put("api/v1/update-account", {
    role: role,
    status: status,
    id: id,
  });
};

const postCreateAccount = async (email, username, password, role) => {
  return await axios.post("api/v1/create-account", {
    email: email,
    username: username,
    password: password,
    role: role,
  });
};

const getDashboard = async () => {
  return await axios.get(`api/v1/dashboard`);
};

const deleteRoute = async (id) => {
  return await axios.delete(`api/v1/delete-route/${id}`);
};

const deleteTrip = async (id) => {
  return await axios.delete(`api/v1/delete-trip/${id}`);
};

const getAllTrip = async () => {
  return await axios.get(`api/v1/alltrip`);
};

const putUpdateTrip = async (tripID, driverInfo, depart, vehicleID) => {
  return await axios.put("api/v1/update-trip", {
    tripID: tripID,
    driverInfo: driverInfo,
    depart: depart,
    vehicleID: vehicleID,
  });
};

const deleteSender = async (customerID) => {
  return await axios.delete(`api/v1/delete-sender/${customerID}`);
};

const putUpdateSender = async (customerID, name, address, phone) => {
  return await axios.put("api/v1/update-sender", {
    customerID: customerID,
    name: name,
    address: address,
    phone: phone,
  });
};

const postRecoverPW = async (email) => {
  return await axios.post("api/v1/recover-pw", {
    email: email,
  });
};

const putChangePW = async (email, newPassword) => {
  return await axios.put("api/v1/change-pw", {
    email: email,
    newPassword: newPassword,
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
  postCreateRoute,
  putUpdateRoute,
  getAllVehicle,
  getAllDriver,
  postCreateTrip,
  getEstimateCost,
  postCreateSender,
  postCreateFeedback,
  getAllFeedback,
  postCreatePayment,
  putUpdatePayment,
  deletePayment,
  postCreatePrice,
  putUpdatePrice,
  deletePrice,
  postCreatePackage,
  putUpdatePackage,
  deletePackage,
  postCreateVehicle,
  putUpdateVehicle,
  deleteVehicle,
  postCreateStation,
  putUpdateStation,
  deleteStation,
  getCustomerOrder,
  putCancelOrder,
  getAllAccount,
  putUpdateAccount,
  postCreateAccount,
  getDashboard,
  deleteRoute,
  deleteTrip,
  getAllTrip,
  putUpdateTrip,
  deleteSender,
  putUpdateSender,
  postRecoverPW,
  putChangePW,
};
