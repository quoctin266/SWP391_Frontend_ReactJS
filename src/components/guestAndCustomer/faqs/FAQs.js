import Accordion from "react-bootstrap/Accordion";
import "./FAQs.scss";
import { Container } from "react-bootstrap";
import { getAllFAQ } from "../../../service/APIservice";
import { useEffect, useState } from "react";

const FAQs = () => {
  const [faqList, setFaqList] = useState([]);

  const fetchAllFAQ = async () => {
    let data = await getAllFAQ();
    if (data && data.EC === 0) {
      setFaqList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllFAQ();
  }, []);

  return (
    <Container className="faqs-outer">
      <div className="faqs-container">
        <div className="faq-header">
          <h2 className="title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-body">
          <Accordion defaultActiveKey="0">
            {faqList &&
              faqList.length > 0 &&
              faqList.map((faq, index) => {
                return (
                  <Accordion.Item eventKey={index} key={faq.id}>
                    <Accordion.Header>
                      {index + 1}. {faq.question}
                    </Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </div>
      </div>
    </Container>
  );
};

export default FAQs;
