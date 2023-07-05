import { Button } from "react-bootstrap";
import "./ManageAccount.scss";
import Table from "react-bootstrap/Table";
import {
  getAllAccount,
  putUpdateAccount,
  postCreateAccount,
} from "../../../service/APIservice";
import { useState } from "react";
import { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import ReactPaginate from "react-paginate";
import { validateEmail } from "../../../utils/reuseFunction";
import { useTranslation } from "react-i18next";

const ManageAccount = () => {
  const { t } = useTranslation();
  const [accountList, setAccountList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addRole, setAddRole] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidRole, setInvalidRole] = useState(false);
  const [invalidConfirmPW, setInvalidConfirmPW] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_LIMIT = 6;

  const handlePageClick = (event) => {
    const newOffset = (+event.selected * PAGE_LIMIT) % filterList.length;
    setItemOffset(newOffset);
    setCurrentPage(+event.selected + 1);
  };

  useEffect(() => {
    let newPageCount = Math.ceil(filterList.length / PAGE_LIMIT);
    const endOffset = itemOffset + PAGE_LIMIT;
    setCurrentItems(filterList.slice(itemOffset, endOffset));
    setPageCount(newPageCount);
  }, [itemOffset, filterList]);

  useEffect(() => {
    let newPageCount = Math.ceil(filterList.length / PAGE_LIMIT);
    if (newPageCount < pageCount) {
      const newOffset = 0;
      const endOffset = newOffset + PAGE_LIMIT;
      setCurrentItems(filterList.slice(newOffset, endOffset));
      setItemOffset(newOffset);
      setCurrentPage(1);
    }
  }, [currentPage, pageCount, filterList]);

  const handleChangeRole = (value) => {
    let cloneList = _.cloneDeep(accountList);
    if (value !== "all") {
      cloneList = cloneList.filter((account) => account.role === value);
    }
    setFilterList(cloneList);
  };

  const handleShowEdit = (item) => {
    setEditItem(item);
    setEditRole(item.role);
    setEditStatus(item.account_status);
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleUpdateAccount = async () => {
    let data = await putUpdateAccount(
      editRole,
      editStatus,
      editItem.account_id
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllAccount();
      handleCloseEdit();
    } else toast.error(data.EM);
  };

  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setAddEmail("");
    setAddPassword("");
    setAddRole("");
    setAddUsername("");
    setConfirmPassword("");
    setInvalidEmail(false);
    setInvalidPassword(false);
    setInvalidRole(false);
    setInvalidUsername(false);
    setInvalidConfirmPW(false);
    setShowAdd(false);
  };

  const handleOnchangeEmail = (event) => {
    setAddEmail(event.target.value);
    setInvalidEmail(false);
  };

  const handleOnchangePassword = (event) => {
    setAddPassword(event.target.value);
    setInvalidPassword(false);
  };

  const handleOnchangeUsername = (event) => {
    setAddUsername(event.target.value);
    setInvalidUsername(false);
  };

  const handleOnchangeConfirmPW = (event) => {
    setConfirmPassword(event.target.value);
    setInvalidConfirmPW(false);
  };

  const handleChangeAddRole = (event) => {
    setAddRole(event.target.value);
    setInvalidRole(false);
  };

  const handleAddNew = async (event) => {
    event.preventDefault();

    if (!addEmail) {
      setInvalidEmail(true);
      toast.error(`${t("manageAccount.toast1")}`);
      return;
    }

    if (!addUsername) {
      setInvalidUsername(true);
      toast.error(`${t("manageAccount.toast2")}`);
      return;
    }

    if (!validateEmail(addEmail)) {
      setInvalidEmail(true);
      toast.error(`${t("manageAccount.toast3")}`);
      return;
    }

    if (!addPassword) {
      setInvalidPassword(true);
      toast.error(`${t("manageAccount.toast4")}`);
      return;
    }

    if (!confirmPassword) {
      setInvalidConfirmPW(true);
      toast.error(`${t("manageAccount.toast5")}`);
      return;
    }

    if (confirmPassword !== addPassword) {
      setInvalidConfirmPW(true);
      toast.error(`${t("manageAccount.toast6")}`);
      return;
    }

    if (!addRole) {
      toast.error(`${t("manageAccount.toast7")}`);
      setInvalidRole(true);
      return;
    }

    let data = await postCreateAccount(
      addEmail,
      addUsername,
      addPassword,
      addRole
    );

    if (data && data.EC === 0) {
      toast.success(data.EM);
      fetchAllAccount();
      handleCloseAdd();
    } else toast.error(data.EM);
  };

  const fetchAllAccount = async () => {
    let data = await getAllAccount();
    if (data && data.EC === 0) {
      setAccountList(data.DT);
      setFilterList(data.DT);
    }
  };

  useEffect(() => {
    fetchAllAccount();
  }, []);

  return (
    <div className="manage-account-container">
      <div className="title">{t("manageAccount.header")}</div>
      <div className="account-list">
        <Col className="col-5">
          <Form.Label className="filter-title">
            {t("manageAccount.title")}
          </Form.Label>
          <Form.Select
            defaultValue=""
            aria-label="Default select example"
            className="mt-2 mb-4"
            onChange={(e) => handleChangeRole(e.target.value)}
          >
            <option value="" disabled hidden>
              {t("manageAccount.note")}
            </option>
            <option value="all">All</option>
            <option value="customer">Customer</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </Form.Select>
        </Col>

        <Button variant="primary" className="mb-3" onClick={handleShowAdd}>
          {t("manageAccount.addBtn")}
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{t("manageAccount.field1")}</th>
              <th>{t("manageAccount.field2")}</th>
              <th>{t("manageAccount.field3")}</th>
              <th>{t("manageAccount.field4")}</th>
              <th>{t("manageAccount.field5")}</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item) => {
                return (
                  <tr key={item.account_id}>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>{item.account_status}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleShowEdit(item)}
                      >
                        {t("manageAccount.editBtn")}
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Modal
          show={showAdd}
          onHide={handleCloseAdd}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("manageAccount.addTitle")}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddNew}>
            <Modal.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Label>{t("manageAccount.label1")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t("manageAccount.note1")}
                    isInvalid={invalidEmail}
                    value={addEmail}
                    onChange={(e) => handleOnchangeEmail(e)}
                  />
                </Col>

                <Col>
                  <Form.Label>{t("manageAccount.label2")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("manageAccount.note2")}
                    isInvalid={invalidUsername}
                    value={addUsername}
                    onChange={(e) => handleOnchangeUsername(e)}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>{t("manageAccount.label3")}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t("manageAccount.note3")}
                    pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[@*#!?$%^&+=_\-]).{8,}$"
                    title="Must contain at least one digit, one letter, one special character and at least 8 characters, spacing is not allowed"
                    isInvalid={invalidPassword}
                    value={addPassword}
                    onChange={(e) => handleOnchangePassword(e)}
                  />
                </Col>

                <Col>
                  <Form.Label>{t("manageAccount.label4")}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t("manageAccount.note4")}
                    isInvalid={invalidConfirmPW}
                    value={confirmPassword}
                    onChange={(e) => handleOnchangeConfirmPW(e)}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>{t("manageAccount.label5")}</Form.Label>
                  <Form.Select
                    defaultValue=""
                    aria-label="Default select example"
                    isInvalid={invalidRole}
                    onChange={(e) => handleChangeAddRole(e)}
                  >
                    <option value="" disabled hidden>
                      {t("manageAccount.note5")}
                    </option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                  </Form.Select>
                </Col>

                <Col></Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdd}>
                {t("manageAccount.closeBtn")}
              </Button>
              <Button variant="primary" type="submit">
                {t("manageAccount.confirmBtn")}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal
          show={showEdit}
          onHide={handleCloseEdit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("manageAccount.editTitle")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col className="mb-3">
              <Form.Label>{t("manageAccount.label5")}</Form.Label>
              <Form.Select
                defaultValue={editRole}
                aria-label="Default select example"
                onChange={(e) => setEditRole(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
                <option value="manager">Manager</option>
              </Form.Select>
            </Col>

            <Col className="mb-3">
              <Form.Label>{t("manageAccount.label6")}</Form.Label>
              <Form.Select
                defaultValue={editStatus}
                aria-label="Default select example"
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </Form.Select>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              {t("manageAccount.closeBtn")}
            </Button>
            <Button variant="primary" onClick={handleUpdateAccount}>
              {t("manageAccount.confirmBtn")}
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="d-flex justify-content-center mt-5">
          <ReactPaginate
            nextLabel={t("manageAccount.next")}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={t("manageAccount.pre")}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={pageCount !== 0 ? currentPage - 1 : -1} //if there is user data to be fetch, display current page as active
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;
