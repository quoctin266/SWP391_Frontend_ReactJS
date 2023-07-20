import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { getNewsContent } from "../../../service/APIservice";

const Blog = () => {
  const { id } = useParams();
  const location = useLocation();
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchNewsContent = async () => {
      let data = await getNewsContent(id);
      if (data && data.EC === 0) {
        setContentList(data.DT);
      }
    };

    fetchNewsContent();
  }, [id]);

  return (
    <Container className="blog-outer">
      <div className="Blog-Container">
        <div className="Blog-Box">
          <div className="Blog-Header">
            <h1 className="Header">{location?.state?.blog?.title}</h1>
            <p className="Subtext">{location?.state?.blog?.sub_title}</p>
            <img
              src={location?.state?.blog?.banner}
              className="Blog-Banner"
              alt="Banner"
            />
          </div>

          <div className="Blog-Content">
            <div className="Introduction">
              <p className="Introduction-Header">
                <VscDebugBreakpointLog />
                Introduction
              </p>
              <p className="Introduction-Content">
                {location?.state?.blog?.intro}
              </p>
            </div>
            {contentList &&
              contentList.length > 0 &&
              contentList.map((item, index) => {
                return (
                  <div className="Content" key={item.content_id}>
                    <p className="Content-Header">
                      {index + 1}. {item.content_title}
                    </p>
                    <p className="Content-Content">{item.content_body}</p>
                  </div>
                );
              })}
            <div className="Conclusion">
              <p className="Conclusion-Header">
                <VscDebugBreakpointLog />
                Conclusion:
              </p>
              <p className="Conclusion-Content">
                {location?.state?.blog?.conclusion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Blog;
