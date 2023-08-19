import React, { useEffect, useState } from "react";
import Navbar1 from "../../components/Navbar/Navbar";
import { Button, Modal, Select, Spin, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { AdminBuystcking } from "../../Redux/admin";
import { toast } from "react-toastify";

function StakingActive() {
  const [values, setValues] = React.useState({
    username: "",
    Amount: "",
    Walletname: "Main Wallet",
  });
  const [loding, setloding] = React.useState(!true);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async () => {
    setloding(true);
    const res = await dispatch(
      AdminBuystcking({
        ...values,
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      toast.success(res.payload.data.message);
      setloding(!true);
    } else {
      toast.error(res.payload.data.message);
      setloding(!true);
    }
  };
  return (
    <Spin spinning={loding}>
      <div>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div className="row p-4">
              <div className="col-6">
                <Select
                  style={{ width: "100%" }}
                  name="Walletname"
                  defaultValue={"Main Wallet"}
                  placeholder="Select Wallet To Transfer From"
                  size="large"
                  className="my-2"
                  options={[
                    {
                      value: "Main Wallet",
                      label: `Main Wallet`,
                    },
                    { value: "E-Wallet", label: "E-Wallet" },
                    { value: "Dapp-Wallet", label: "Dapp-Wallet" },
                  ]}
                  onChange={(e) => {
                    setValues({ ...values, Walletname: e });
                  }}
                />
              </div>
              <div className="col-6">
                <InputField
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-6">
                <InputField
                  type="number"
                  name="Amount"
                  min={0}
                  placeholder="Enter Amount to Stack"
                  value={values.Amount}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="col-12 py-4">
                <button
                  style={{
                    background: "#02a2c4",
                    color: "#fff",
                    height: 60,
                    width: 180,
                    border: "none",
                  }}
                  className="d-block m-auto"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default StakingActive;
