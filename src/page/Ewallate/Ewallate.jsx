import React, { useEffect, useState } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Spin, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Mainwallate123, Wallet123 } from "../../Redux/Mainwallate";

function Ewallate() {
  const [Alldata, setAlldata] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getalldata();
  }, []);
  const getalldata = async () => {
    const res = await dispatch(
      Wallet123({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "120px",
      render: (text, object, index) => (
        <Tooltip placement="topLeft" title={index + 1}>
          {index + 1}
        </Tooltip>
      ),
    },
    {
      title: "Credited/Debited",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: {
        showTitle: false,
      },
      width: "180px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Amount}>
          {record.type !== 0
            ? record.Amount + "  " + "Credited"
            : record.Amount + "  " + "Debited"}
        </Tooltip>
      ),
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.Note}>
          {record.Note + " "} {record.Usernameby}
        </Tooltip>
      ),
    },
    {
      title: "Balace",
      dataIndex: "balace",
      key: "balace",
      ellipsis: {
        showTitle: false,
      },
      width: "180px",
      render: (text, record, index) => (
        <Tooltip placement="topLeft" title={record.balace - record.Amount}>
          {record.type !== 0
            ? record.balace + record.Amount
            : record.balace - record.Amount}
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
  ];
  return (
    <div>
      <Navbar1 />
      <div className="container-fluid blackbg">
        <div className="mainsection">
          <div className="row p-4">
            <div className="col-12 p-2 p-lg-3">
              <Table
                columns={columns}
                dataSource={Alldata}
                title={() => "Infinity.AI Wallet Report"}
                scroll={{ x: "calc(500px + 50%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ewallate;
