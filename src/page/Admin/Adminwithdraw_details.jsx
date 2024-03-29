import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbaradmin from "../../components/Navbaradmin/Navbaradmin";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import { Button, Modal, Select, Spin, Table, Tooltip } from "antd";
import { getTransferdata } from "../../Redux/TranfarSlice";
import {
  Adminprice,
  Adminuserdata,
  Alltranfordata,
  userdatablock,
  AdminsendAmount,
  Admintranfor,
  Withdrdatadata,
  Withdrdatadata12,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";

function Adminwithdraw_details() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const [Alldata, setAlldata] = React.useState([]);
  const [activeid, setactiveid] = React.useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const [values, setValues] = React.useState({
    username: "",
    Amount: "",
    note: "",
    Walletname: "Main Wallet",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  useEffect(() => {
    getalldata();
  }, []);
  const handleCancel = () => {
    setIsModalOpen(false);
    setValues({
      note: "",
    });
  };
  const getalldata = async () => {
    const res = await dispatch(
      Withdrdatadata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
  };
  const handleSubmit = async (e) => {
    if (values.username !== "" || values.Amount > 0) {
      const res = await dispatch(
        Withdrdatadata({
          Token:
            JSON.parse(localStorage.getItem("data")) &&
            JSON.parse(localStorage.getItem("data")).data.token,
        })
      );
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
      } else {
        toast.error(res.payload.data.message);
      }
    }
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "80px",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip
          placement="topLeft"
          title={`${record.username}(${record.Fullname})`}
        >
          {`${record.username}(${record.Fullname})`}
        </Tooltip>
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.email}>
          {record.email}
        </Tooltip>
      ),
    },
    {
      title: "walletaddress",
      dataIndex: "walletaddress",
      key: "walletaddress",
      ellipsis: {
        showTitle: false,
      },
      width: "400px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.walletaddress}>
          {record?.walletaddress}
        </Tooltip>
      ),
    },
    {
      title: "withdrawalAmount",
      dataIndex: "withdrawalAmount",
      key: "withdrawalAmount",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record?.withdrawalAmount}>
          {record?.withdrawalAmount}
        </Tooltip>
      ),
    },
    {
      title: "Admincharges",
      dataIndex: "Admincharges",
      key: "Admincharges",
      ellipsis: {
        showTitle: false,
      },
      width: "230px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          {record.Admincharges}
        </Tooltip>
      ),
    },
    {
      title: "startus",
      dataIndex: "transactionshsh",
      key: "transactionshsh",
      ellipsis: {
        showTitle: false,
      },
      width: "140px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          <p
            className={
              record.transactionshsh === "no"
                ? "btn btn-danger p-2 text-center"
                : record.transactionshsh === "yes"
                ? "btn btn-success p-2  text-center"
                : "btn btn-warning p-2  text-center"
            }
            style={{ width: 90 }}
          >
            {record.transactionshsh === "no"
              ? "failed"
              : record.transactionshsh === "yes"
              ? "success"
              : "pending"}
          </p>
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "350px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
          {new Date(address).toLocaleString()}
        </Tooltip>
      ),
    },
    {
      title: "update startus",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "350px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <p
          className={
            record.transactionshsh === "no"
              ? "d-none"
              : record.transactionshsh === "yes"
              ?"d-none"
              : ""
          }
        >
          <button
            className="btn btn-success mx-2"
            onClick={async () => {
              const res = await dispatch(
                Withdrdatadata12({
                  _id: record._id,
                  transactionshsh: "yes",
                  Token:
                    JSON.parse(localStorage.getItem("data")) &&
                    JSON.parse(localStorage.getItem("data")).data.token,
                })
              );
              await getalldata();
            }}
          >
            accept
          </button>
          <button
            className="btn btn-danger mx-2"
            onClick={async () => {
    setIsModalOpen(!isModalOpen);
    setactiveid(record)
            }}
          >
            reject{" "}
          </button>
        </p>
      ),
    },
  ];
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const res = await dispatch(
      Withdrdatadata12({
        _id: activeid._id,
        transactionshsh: "no",
        note:values.note,
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    await getalldata();
    if (res.payload.data.isSuccess) {
      setValues({
        note: "",
      });
    }
  };
  return (
    <>
      <Spin spinning={StackingbounsSlice && !StackingbounsSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Alldata}
                  bordered={true}
                  title={() => "Withdraw Report"}
                  scroll={{ x: "1500px " }}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["25", "50", "75", "100"],
                    showPageSizeOptions: true,
                    current: page,
                    onChange: (page, pageSize) => onTabChange(page, pageSize),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <Modal
          title="Basic Modal"
          centered
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <InputField
            type="text"
            placeholder="note"
            name="note"
            value={values.note}
            disabled={!true}
            onChange={onChange}
            style={{
              color: "#000 !important",
            }}
          />
        </Modal>
      </Spin>
    </>
  );
}

export default Adminwithdraw_details;
