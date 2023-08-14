import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbaradmin from "../../components/Navbaradmin/Navbaradmin";
import { Stackingbouns } from "../../Redux/Stackingbouns";
import { Button, Modal, Spin, Table, Tooltip } from "antd";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { getTransferdata } from "../../Redux/TranfarSlice";
import {
  Adminuserdata,
  Alltranfordata,
  userdatablock,
} from "../../Redux/admin";
import InputField from "../../components/InputField";
import { toast } from "react-toastify";
import Navbar1 from "../../components/Navbar/Navbar";

function Adminwithdraw_details() {
  const StackingbounsSlice = useSelector((state) => state.Adminuserdata);
  const [Fillter, setFillter] = React.useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const [Alldata, setAlldata] = React.useState([]);
  const [Allreciveddata, setAllreciveddata] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    note: "",
    usename: "",
  });
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  const showModal = (e) => {
    setValues({ ...values, usename: e });
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const res = await dispatch(
      Alltranfordata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      toast.success(res.payload.data.message);
      setValues({
        note: "",
        usename: "",
      });
      getalldata();
    } else {
      toast.error(res.payload.data.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setValues({
      note: "",
    });
  };
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      Alltranfordata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
    setFillter(res.payload.data.data);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "120px",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "User Name",
      dataIndex: "toaccunt",
      key: "toaccunt",
      ellipsis: {
        showTitle: false,
      },
      minwidth: "200px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <>
          <Tooltip placement="topLeft" title={address.toString()}>
            <p className="">{address ? address.toString() : ""}</p>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Transaction Id",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <>
          <Tooltip placement="topLeft" title={address.toString()}>
            <p className="">{address ? address.toString() : ""}</p>
          </Tooltip>
        </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
        {new Date(address).toLocaleString()}
        </Tooltip>
      ),
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
          truck?.walletaddress.toString().toString().toLowerCase().match(value) ||
          truck?.email.toString().toString().toLowerCase().match(value) ||
          truck?.username.toString().toString().toLowerCase().match(value) ||
          truck?.leval.toString().toString().toLowerCase().match(value) ||
          truck?.isActive.toString().toString().toLowerCase().match(value) ||
          truck?.email.toString().toString().toLowerCase().match(value) ||
          truck?.teamtotalstack.toString().toString().toLowerCase().match(value)
        );
      });
      console.log(data);
      setFillter(data);
    } else {
      getalldata();
    }
  };
  return (
    <>
      <Spin spinning={StackingbounsSlice && !StackingbounsSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <Col className="px-3" xs={24} lg={15}>
                <div className="">
                  <Text>Source</Text>
                  <br />
                  <Input
                    showSearch
                    style={{ width: "100%", maxWidth: "300px" }}
                    placeholder="Search"
                    name="serch"
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <div className="col-12 p-2 p-lg-3">
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  title={() => "Wallet withdraw Report"}
                  bordered={true}
                  scroll={{ x: "calc(500px + 50%)" }}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    current: page,
                    onChange: (page, pageSize) => onTabChange(page, pageSize),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Adminwithdraw_details;
