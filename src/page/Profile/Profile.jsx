import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import InputField from "../../components/InputField";
import { Foegotpassword, Signin, Signup } from "../../Redux/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { WalletFilled, MailFilled } from "@ant-design/icons";
import Navbar1 from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox, Spin } from "antd";
function Profile() {
  const authSlice = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [modal2Open, setModal2Open] = useState(false);
  const [values, setValues] = React.useState({
    Email: "",
    Emailforgot: JSON.parse(localStorage.getItem("data"))?.data?.profile?.email,
    Password: "",
  });
  const [validations, setValidations] = React.useState({
    Email: "",
    Emailforgot: "",
    Password: "",
  });

  const validateAll = () => {
    const { Email, Password, Emailforgot } = values;
    const validations = {
      Email: "",
      Password: "",
      Emailforgot: "",
    };
    let isValid = true;

    if (!Email) {
      validations.Email = "Email is required!";
      isValid = false;
    }

    if (Email && !/\S+@\S+\.\S+/.test(Email)) {
      validations.Email = "Email format must be as example@mail.com!";
      isValid = false;
    }

    if (!Emailforgot) {
      validations.Emailforgot = "Email is required!";
    }

    if (Emailforgot && !/\S+@\S+\.\S+/.test(Emailforgot)) {
      validations.Emailforgot = "Email format must be as example@mail.com!";
    }
    if (!Password) {
      validations.Password = "Password is required!";
      isValid = false;
    }
    if (!isValid) {
      setValidations(validations);
    }

    return isValid;
  };

  const validateOne = (e) => {
    const { name } = e.target;
    const value = values[name];
    let message = "";

    if (!value) {
      if (name !== "Emailforgot") {
        message = `${
          name === "Reenterpassword" ? "Confirm Password" : name
        } is required!`;
      } else {
        message = `Email is required!`;
      }
    }
    if (value && name === "Email" && !/\S+@\S+\.\S+/.test(value)) {
      message = "Email format must be as example@mail.com!";
    }
    if (value && name === "Emailforgot" && !/\S+@\S+\.\S+/.test(value)) {
      message = "Email format must be as example@mail.com!";
    }
    if (value && name === "Reenterpassword" && value !== values.Password) {
      message = "Passwords must match!";
    }
    setValidations({ ...validations, [name]: message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit1 = async (e) => {
    const validations = {
      Email: "",
      Password: "",
      Emailforgot: "",
    };
    if (!Emailforgot) {
      validations.Emailforgot = "Email is required!";
    }
    if (Emailforgot && !/\S+@\S+\.\S+/.test(Emailforgot)) {
      validations.Emailforgot = "Email format must be as example@mail.com!";
    }
    setValidations(validations);
    if (validations.Emailforgot === "") {
      setModal2Open(!modal2Open);
      const res = await dispatch(Foegotpassword({ email: values.Emailforgot }));
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
      } else {
        toast.error(res.payload.data.message);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateAll();

    if (!isValid) {
      return false;
    }
    const res = await dispatch(Signin(values));
    if (res.payload.data.isSuccess) {
      toast.success(res.payload.data.message);
      localStorage.setItem("data", JSON.stringify(res.payload));
      navigation("/dashboard");
    } else {
      toast.error(res.payload.data.message);
    }
  };
  const { Email, Emailforgot, Password } = values;
  const {
    Email: EmailVal,
    Emailforgot: EmailforgotVal,
    Password: PasswordVal,
  } = validations;

  return (
    <>
      <Spin spinning={!authSlice.isLoader}>
        <Navbar1 />
        <div className="container-fluid blackbg">
          <div className="mainsection">
            <div
              className="d-flex justify-content-between align-content-center"
              style={{
                minHeight: "81vh",
                height: "100%",
              }}
            >
              <div
                className="d-block m-auto w-100"
                style={{
                  maxWidth: "1080px",
                }}
              >
                <h4 className="text-light px-3 pb-4">My Profile</h4>
                <div className="row ">
                  <div
                    className="col-12 col-md-8 py-3"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/Vector (32).png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="email"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.email
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <div
                    className="col-12 col-md-4 py-3"
                    style={{
                      borderTop: "1px solid rgb(112 100 100)",
                      borderBottom: "1px solid rgb(112 100 100)",
                    }}
                  >
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/username 1.png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="username"
                        placeholder="Wallet address"
                        de
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.username
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    borderTop: "1px solid rgb(112 100 100)",
                    borderBottom: "1px solid rgb(112 100 100)",
                  }}
                >
                  <div className="col-12">
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/walletaddress 1.png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="walletaddress"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.walletaddress
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="row py-3"
                  style={{
                    borderTop: "1px solid rgb(112 100 100)",
                    borderBottom: "1px solid rgb(112 100 100)",
                  }}
                >
                  <div className="col-12">
                    <div class="inner-addon left-addon">
                      <img
                        src={require("../../assets/img/Vector (33).png")}
                        alt=""
                      />
                      <input
                        type="text"
                        class="form-control"
                        name="Rank"
                        placeholder="Wallet address"
                        value={
                          JSON.parse(localStorage.getItem("data"))?.data
                            ?.profile?.Rank
                        }
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-5">
                  <button
                    className="text-light d-flex align-items-center px-4 py-2"
                    style={{
                      background: "rgba(22, 111, 245, 0.91)",
                      color: "#fff",
                    }}
                    onClick={() => setModal2Open(true)}
                  >
                    Change Password
                  </button>
                </div>
                <Modal
                  show={modal2Open}
                  onHide={() => setModal2Open(false)}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <p>
                      Enter the email associated with your account and We will
                      send an email with instructions to reset your password.
                    </p>
                    <InputField
                      type="text"
                      name="Emailforgot"
                      placeholder="Enter e-mail address"
                      value={Emailforgot}
                      disabled={true}
                      error={EmailforgotVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </Modal.Body>

                  <Modal.Footer>
                    <button
                      type="submit"
                      className={" text-light px-4 py-2"}
                      loading={authSlice.isLoader}
                      onClick={() => handleSubmit1()}
                      style={{ background: "#062156" }}
                    >
                      Submit
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Profile;
