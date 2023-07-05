import "./ManageWebContent.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ManageFAQ from "./FAQ_CRUD/ManageFAQ";
import { getAllFAQ, getAllNews } from "../../../service/APIservice";
import { useState, useEffect } from "react";
import _ from "lodash";
import ManageNews from "./News_CRUD/ManageNews";
import moment from "moment";
import { useTranslation } from "react-i18next";

const ManageWebContent = () => {
  const { t } = useTranslation();
  const [faqList, setFaqList] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const fetchAllNews = async () => {
    let data = await getAllNews();
    if (data && data.length > 0) {
      let cloneList = _.cloneDeep(data);
      cloneList.forEach((item) => {
        item.date = moment(item.date).format("MMM DD YYYY").toString();
      });

      setNewsList(cloneList);
    }
  };

  const fetchAllFAQ = async () => {
    let data = await getAllFAQ();
    if (data && data.EC === 0) {
      let cloneFAQ = _.cloneDeep(data.DT);
      cloneFAQ.forEach((item, index) => {
        item.index = index + 1;
      });
      setFaqList(cloneFAQ);
    }
  };

  useEffect(() => {
    fetchAllFAQ();
    fetchAllNews();
  }, []);

  return (
    <div className="manage-webcontent-container">
      <div className="title">{t("manageWeb.header")}</div>
      <div className="webcontent-body">
        <Tabs
          defaultActiveKey="faq"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="faq" title={t("manageWeb.tab1")}>
            <ManageFAQ faqList={faqList} fetchAllFAQ={fetchAllFAQ} />
          </Tab>
          <Tab eventKey="news" title={t("manageWeb.tab2")}>
            <ManageNews newsList={newsList} fetchAllNews={fetchAllNews} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageWebContent;
