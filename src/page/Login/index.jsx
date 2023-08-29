import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/ButtonField";
import { useWeb3React } from "@web3-react/core";
import { Modal } from "react-bootstrap";
import { Injected, WalletConnect } from "../../Helpers/Injected";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  WalletFilled,
  MailFilled,
  LockFilled,
  UsergroupAddOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Foegotpassword, Signin, Signup } from "../../Redux/authSlice";
import { toast } from "react-toastify";
import { Checkbox, Spin } from "antd";
import bep20Abi from "../../Helpers/bep20Abi.json";
import {
  WalletConnectModalAuth,
  useSignIn,
} from "@walletconnect/modal-auth-react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";
import Web3 from "web3";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
function Login() {
  const { signIn } = useSignIn({ statement: "Sign In to My Dapp" });
  const location = useLocation();
  console.log(location.search.split("?")[1]);
  const [type, settype] = useState(!location.search ? true : false);
  const [check, setcheck] = useState(true);
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const navigation = useNavigate();
  const projectId = "3c1bcc6fff554daf64cfdfe6e5d967db";
  useEffect(() => {
    localStorage.clear();
  }, []);

  const SignupUser = () => {
    const { active, account, library, connector, activate, deactivate, error } =
      useWeb3React();
    async function onSignIn() {
      try {
        const data = await signIn();
        console.info(data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    const [show, setShow] = useState(false);
    const [values, setValues] = React.useState({
      Walletaddress: "",
      Email: "",
      phone: "",
      username: "",
      Password: "",
      Reenterpassword: "",
      referralId: "",
    });

    const [wallet, setWallet] = React.useState("");
    const [eqxBalance, setEqxBalance] = React.useState(0);
    // const { auth, spinner } = props;
    const getWeb3 = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider);
        return web3;
      } catch (err) {
        console.log("error", err);
      }
    };

    const getBalance = async () => {
      try {
        console.log(account);
        if (account) {
          let web3 = await getWeb3();
          let contract = await new web3.eth.Contract(
            bep20Abi,
            "0xF3AA64D50dae6eB524c8DC4540e8fcB37ecc8386"
          );
          const decimal = await contract.methods.decimals().call();
          await contract.methods
            .balanceOf(account)
            .call()
            .then((balance) => {
              balance = balance / 10 ** decimal;
              console.log("balance", balance);
            });
        }
      } catch (error) {}
    };

    const [validations, setValidations] = React.useState({
      Walletaddress: "",
      Email: "",
      Password: "",
      phone: "",
      Reenterpassword: "",
      username: "",
      referralId: "",
    });

    const validateAll = () => {
      const { Walletaddress, Email, Password, referralId } = values;
      const validations = {
        Walletaddress: "",
        Email: "",
        Password: "",
        phone: "",
        Reenterpassword: "",
      };
      let isValid = true;

      if (!Walletaddress) {
        validations.Walletaddress = "Wallet Address is required!";
        isValid = false;
      }
      if (!phone) {
        validations.phone = "PhoneNumber is required!";
        isValid = false;
      }
      if (!Email) {
        validations.Email = "Email is required!";
        isValid = false;
      }
      if (!username) {
        validations.username = "Fullname is required!";
        isValid = false;
      }
      if (!referralId) {
        validations.referralId = "referralId is required!";
        isValid = false;
      }

      if (Email && !/\S+@\S+\.\S+/.test(Email)) {
        validations.Email = "Email format must be as example@mail.com!";
        isValid = false;
      }

      if (!Password) {
        validations.Password = "Password is required!";
        isValid = false;
      }
      if (!Reenterpassword) {
        validations.Reenterpassword = "Confirm Password is required!";
        isValid = false;
      }

      if (Reenterpassword && Reenterpassword !== Password) {
        validations.Reenterpassword = "Passwords must match!";
        isValid = false;
      }
      if (!referralId) {
        validations.referralId = "Referral id is required!";
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
        message = `${
          name === "Reenterpassword" ? "Confirm Password" : name
        } is required!`;
      }
      if (value && name === "Email" && !/\S+@\S+\.\S+/.test(value)) {
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const isValid = validateAll();

      if (!isValid) {
        return false;
      }
      console.log(values);
      const res = await dispatch(Signup(values));
      if (res.payload.data.isSuccess) {
        toast.success(res.payload.data.message);
        navigation("/login?login");
      } else {
        toast.error(res.payload.data.message);
      }
    };
    const {
      Walletaddress,
      Email,
      Password,
      Reenterpassword,
      referralId,
      username,
      phone,
    } = values;
    const {
      Walletaddress: WalletaddressVal,
      Email: EmailVal,
      Password: PasswordVal,
      Reenterpassword: ReenterpasswordVal,
      referralId: referralIdVal,
      username: usernameVal,
      phone: phoneVal,
    } = validations;
    useEffect(() => {
      setValues((vall) => {
        return { ...vall, Walletaddress: account };
      });
      getBalance();
    }, [account]);

    const handleShow = () => setShow(true);
    const connect = async () => {
      try {
        if (!account) {
          if (typeof window.ethereum !== "undefined") {
            handleShow();
          } else {
            handleShow();
          }
        } else {
          deactivate();
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    const handleClose = () => setShow(false);
    return (
      <>
        <div
          className="col-5 d-none d-xl-block col-md-5 p-5"
          style={{
            position: "relative",
          }}
        >
          <div className="p-4">
            <img
              src={require("../../assets/img/Logo.png")}
              alt=""
              width={200}
              onClick={() => {
                navigation("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              bottom: "19%",
              width: "100%",
              left: "0",
              padding: "5%",
            }}
          >
            <div className="px-5">
              <h1 className="text-light">
                Start-up <br /> your account
              </h1>
              <p
                className="text-light pe-5 me-5 py-2"
                style={{ fontSize: "18px" }}
              >
                Register on Infinity.AI platform easily. World’s topmost
                platform to generate revenue
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-7 px-0 px-lg-5">
          <div
            className="flex-column"
            style={{
              minHeight: "100vh",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "15px 7px",
            }}
          >
            <div
              className="Box"
              style={{
                height: "96vh",
                overflowX: "hidden",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div className="row px-2 px-sm-4">
                  <h1 className="px-4  pb-2 text-light">Sign up</h1>
                  <div className="col-12 col-md-9 py-md-1">
                    <InputField
                      type="text"
                      name="Walletaddress"
                      placeholder="Wallet address"
                      value={Walletaddress}
                      error={WalletaddressVal}
                      onChange={handleChange}
                      icons={<WalletFilled />}
                      onBlur={validateOne}
                      disabled={true}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-3 py-md-1">
                    <Button
                      className={" w-100 text-light mb-1"}
                      Stake={!false}
                      style={{
                        background: "#062156",
                        height: 60,
                        border: "none",
                      }}
                      label={"Connect"}
                      onClick={connect}
                    />
                  </div>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="text"
                      name="Email"
                      placeholder="Enter e-mail address"
                      value={Email}
                      error={EmailVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="text"
                      name="username"
                      placeholder="Enter your Full name"
                      value={username}
                      error={usernameVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>{" "}
                  <div className="col-12 py-md-1">
                    <div className="form-group  ">
                      <PhoneInput
                        name="phone"
                        value={phone}
                        defaultCountry="IN"
                        placeholder="Enter your Phone Number"
                        className={`form-control d-flex bg-transparent h-100 my-2 py-3`}
                        onChange={(e) => {
                          setValues({ ...values, ["phone"]: e });
                        }}
                        onBlur={validateOne}
                      />
                      {phoneVal ? (
                        <span className="error">
                          {"PhoneNumber is required!"}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 py-md-1">
                    <InputField
                      type="Password"
                      name="Password"
                      placeholder="Enter password"
                      value={Password}
                      error={PasswordVal}
                      icons={<LockFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6 py-md-1">
                    <InputField
                      type="Password"
                      name="Reenterpassword"
                      placeholder="Re-enter password"
                      icons={<LockFilled />}
                      value={Reenterpassword}
                      error={ReenterpasswordVal}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12 py-md-1">
                    <InputField
                      type="text"
                      name="referralId"
                      placeholder="Enter Referral Link"
                      value={referralId}
                      error={referralIdVal}
                      icons={<UsergroupAddOutlined />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />{" "}
                  </div>
                  <div
                    className="d-flex align-items-center  text-light"
                    style={{ alignItems: "center" }}
                  >
                    <Checkbox
                      className=" me-3"
                      style={{ fontSize: "20px" }}
                      checked={check}
                      onChange={(e) => {
                        setcheck(e.target.checked);
                      }}
                    />
                    <p className="mt-1 mb-0 ">
                      I have read and agree to the
                      <a
                        href="/Termsandconditions"
                        target="_blank"
                        className="px-1 text-dark"
                      >
                        Terms and Conditions
                      </a>
                      of Infinity.AI Token
                    </p>
                  </div>
                  <p className="">
                    <b>{!check && "Terms and conditions is required"}</b>
                  </p>
                  <div className="col-12 ">
                    <button
                      type="submit"
                      className={" w-100 text-light"}
                      disabled={!check}
                      style={{ background: "#062156", height: 55 }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div className=" px-2 px-sm-4 pt-3">
                <button
                  className={"text-light "}
                  onClick={() => {
                    settype(false);
                  }}
                  style={{ background: "#14389D", height: 55, width: "100%" }}
                >
                  Already Registered? Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <div
              className="p-3 d-flex align-items-center"
              onClick={() => {
                onSignIn();
                handleClose();
              }}
            >
              <img
                src={require("../../assets/img/partners/WalletConnect.13798276a43e02957131.png")}
                alt="Wallet Connect Logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "5px" }}
                borderRadius="3px"
              />
              <h6 className="text-light m-0">Wallet Connect</h6>
            </div>
            <div
              className="p-3 d-flex align-items-center"
              onClick={() => {
                activate(Injected);
                handleClose();
              }}
            >
              <img
                src={require("../../assets/img/partners/MetaMask Fox.900b5bef784601bc0be8.png")}
                alt="Metamask Logo"
                width={70}
                height={70}
                style={{ objectFit: "contain", margin: "5px" }}
                borderRadius="3px"
              />
              <h6 className="text-light m-0"> Metamask</h6>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  const SignInUser = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [values, setValues] = React.useState({
      Email:
        location.search.split("?")[1] === "login"
          ? ""
          : location.search.split("?")[1],
      username: "",
      Emailforgot: "",
      Password: location.search.split("?")[2],
    });
    const [validations, setValidations] = React.useState({
      Email: "",
      Emailforgot: "",
      username: "",
      Password: "",
    });

    const validateAll = () => {
      const { Email, Password, Emailforgot, username } = values;
      const validations = {
        Email: "",
        Password: "",
        username: "",
        Emailforgot: "",
      };
      let isValid = true;

      if (!Email) {
        validations.Email = "Email is required!";
        isValid = false;
      }

      if (!username) {
        validations.username = "Fullname is required!";
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
      e.preventDefault();

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
        const res = await dispatch(
          Foegotpassword({ email: values.Emailforgot })
        );
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
    const { Email, Emailforgot, Password, username } = values;
    const {
      Email: EmailVal,
      Emailforgot: EmailforgotVal,
      Password: PasswordVal,
      username: usernameVal,
    } = validations;

    return (
      <>
        <div
          className="col-5 d-none d-xl-block col-md-5 p-5"
          style={{
            position: "relative",
          }}
        >
          <div className="p-4">
            <img
              src={require("../../assets/img/Logo.png")}
              alt=""
              width={200}
              onClick={() => {
                navigation("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className=""
            style={{
              position: "absolute",
              bottom: "19%",
              width: "100%",
              left: "0",
              padding: "5%",
            }}
          >
            <div className="px-5">
              <h1 className="text-light">
                Start-up <br /> your account
              </h1>
              <p
                className="text-light pe-5 me-5 py-2"
                style={{ fontSize: "18px" }}
              >
                Register on Infinity.AI platform easily. World’s topmost
                platform to generate revenue
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-7 px-0 px-lg-5">
          <div
            className="flex-column"
            style={{
              minHeight: "100vh",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "15px 7px",
            }}
          >
            <div className="Box">
              <form onSubmit={handleSubmit}>
                <div className="row px-2 px-sm-4">
                  <h1 className="px-4  pb-2 text-light">Login</h1>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="text"
                      name="Email"
                      placeholder="Enter E-Mail Or Username"
                      value={Email}
                      error={EmailVal}
                      icons={<MailFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12  py-md-1">
                    <InputField
                      type="Password"
                      name="Password"
                      placeholder="Enter password"
                      value={Password}
                      error={PasswordVal}
                      icons={<LockFilled />}
                      onChange={handleChange}
                      onBlur={validateOne}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                  </div>
                  <div className="col-12 pt-4">
                    <button
                      type="submit"
                      className={" w-100 text-light"}
                      style={{ background: "#062156", height: 55 }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <div className=" px-2 px-sm-4 pt-4">
                <button
                  className={"text-light "}
                  onClick={() => {
                    settype(!false);
                  }}
                  style={{ background: "#14389D", height: 55, width: "100%" }}
                >
                  Don’t have an account? Sign up
                </button>
              </div>
              <button
                className="text-light px-4 pt-3"
                onClick={() => setModal2Open(true)}
              >
                Forgot password?
              </button>
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
      </>
    );
  };

  return (
    <Spin spinning={!authSlice.isLoader}>
      <div className="container-fluid">
        <div
          className="row loginbackimg"
          style={{ minheight: "100vh", height: "100%" }}
        >
          {type ? <SignupUser /> : <SignInUser />}
        </div>
      </div>
      <WalletConnectModalAuth
        projectId={projectId}
        metadata={{
          name: "My Dapp",
          description: "My Dapp description",
          url: "https://my-dapp.com",
          icons: ["https://my-dapp.com/logo.png"],
        }}
      />
    </Spin>
  );
}

export default Login;
