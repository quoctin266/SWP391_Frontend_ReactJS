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

export { getAllNews, getAllServicesIntro, getAllShippingCondition };
