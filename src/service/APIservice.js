import axios from "../utils/axiosCustomize";

const getAllNews = async () => {
  return await axios.get("api/v1/news");
};

export { getAllNews };
