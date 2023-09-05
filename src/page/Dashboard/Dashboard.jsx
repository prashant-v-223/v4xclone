import "./Dashboard.scss";
import Navbar from "../../components/Navbar/Navbar";
import { MdContentCopy } from "react-icons/md";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {
  Wallatedata,
  getdappWallatedata,
  getdappWallatedata1,
} from "../../Redux/WallatedatSlice";
import { FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../../components/ButtonField";
import { Spin } from "antd";
import { Tree, TreeNode } from "react-organizational-chart";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Allstacking } from "../../Redux/StackingSlice";
const Dashboard = () => {
  const location = useLocation();
  const StackingSlice = useSelector((state) => state.WallatedatSlice);
  const [address, setaddress] = React.useState("");
  const [open, setopen] = React.useState(false);
  const [Alldata, setAlldata] = React.useState([]);
  const [otp, setotp] = React.useState("");
  const [Profile, setProfile] = React.useState({});
  const [wallet, setWallet] = React.useState("");
  const [lockeddate, setlockeddate] = React.useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  useEffect(() => {
    getalldata();
    getalldata1();
  }, []);

  const getalldata1 = async () => {
    const res = await dispatch(
      Allstacking({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
  };
  const getalldata = async () => {
    const res = await dispatch(
      Wallatedata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    if (res.payload.data.isSuccess) {
      setProfile(res.payload.data.profile);
      setAlldata(res.payload.data.data);
      const currentDate = new Date(
        StackingSlice.Wallatedata?.data?.data[0].createdAt
      );
      setlockeddate(currentDate.setMonth(currentDate.getMonth() + 42));
    } else {
      navigation("/");
    }
  };

  return (
    <>
      <Spin spinning={!StackingSlice.isLoader}>
        <Navbar />
        <div className="container-fluid blackbg">
          <div className="mainsection ">
            <div className="row px-3  py-3 justify-content-lg-center">
              <div className="col-12 col-lg-4  text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/username 1.png")}
                      alt=""
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h4 className="pt-2 pt-lg-0 mb-2 text-center text-lg-left">
                      username
                    </h4>
                    <p className="text-center text-lg-left">
                      <b>{Profile[0]?.username}</b>
                    </p>
                    <button
                      className="text-light d-flex justify-content-center align-items-center px-4 py-2 "
                      style={{ background: "#02a2c4", position: "inherit" }}
                      onClick={() => {
                        navigator.clipboard.writeText(Profile[0]?.username);
                        toast.success("username copy successfully.");
                      }}
                    >
                      <MdContentCopy
                        className="me-2"
                        style={{ color: "#FFF", fontSize: "23px" }}
                      />
                      Click to copy
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4  text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/username 1.png")}
                      alt=""
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h4 className="pt-2 pt-lg-0 mb-2 text-center text-lg-left">
                      Fullname
                    </h4>
                    <p className="text-center text-lg-left">
                      <b>{Profile[0]?.Fullname}</b>
                    </p>
                    <button
                      className="text-light d-flex justify-content-center align-items-center px-4 py-2 "
                      style={{ background: "#02a2c4", position: "inherit" }}
                      onClick={() => {
                        navigator.clipboard.writeText(Profile[0]?.Fullname);
                        toast.success("Fullname copy successfully.");
                      }}
                    >
                      <MdContentCopy
                        className="me-2"
                        style={{ color: "#FFF", fontSize: "23px" }}
                      />
                      Click to copy
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4  text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/infinityiat.io.png")}
                      alt=""
                      style={{ width: 120, hight: 120 }}
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h4 className="pt-2 pt-lg-0  mb-2 text-center text-lg-left">
                      Locked IAT Token
                    </h4>
                    <p className="text-center text-lg-left">
                      <b>
                        {Number(
                          StackingSlice.Wallatedata?.data?.profile[0]
                            ?.lockamount
                        ).toFixed(3) + " IAT"}
                      </b>
                    </p>
                    <p className="text-center">
                      {"Release Data: " + new Date(lockeddate).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3  py-3 justify-content-lg-center">
              <div
                className="col-12 col-lg-4 text-light py-2"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigation("/Totaltrem");
                }}
              >
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100 ">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/myteam 1.png")}
                      alt=""
                    />
                  </div>
                  <div
                    className=" d-flex h-50 h-md-100 flex-column justify-content-center"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigation("/Totaltrem");
                    }}
                  >
                    <h4 className="pt-2 pt-lg-0 pb-4 mb-2 text-center text-lg-left">
                      My Team
                    </h4>
                    <h4 className="text-center text-lg-left">
                      {StackingSlice?.Wallatedata?.data &&
                        StackingSlice.Wallatedata?.data?.ReffData1.length}
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-lg-4 text-light py-2"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigation("/daireactterm");
                }}
              >
                {" "}
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/totalteam 1.png")}
                      alt=""
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h4 className="pt-2 pt-lg-0 pb-4 mb-2 text-center">
                      Total Team
                    </h4>
                    <h4 className="text-center text-lg-left">
                      {StackingSlice.Wallatedata?.data?.ReffData}
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-lg-4  text-light py-2"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigation("/mian/Withdrawal");
                }}
              >
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <FaDollarSign
                      className="ms-2 me-3"
                      style={{ color: "#02a2c4", fontSize: "55px" }}
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h4 className="pt-2 pt-lg-0 pb-4 mb-2 text-center text-lg-left">
                      Total Income
                    </h4>
                    <p className="text-center text-lg-left m-0">
                      StakingBonusIncome :
                      {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                        2
                      )}
                      $
                    </p>
                    <p className="text-center text-lg-left m-0">
                      ReferandEarnIncome :
                      {StackingSlice.Wallatedata?.data?.income[0]?.ReferandEarn?.toFixed(
                        2
                      )}
                      $
                    </p>
                    <p className="text-center text-lg-left m-0">
                      CommunitiesIncome :
                      {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                        2
                      )}
                      $
                    </p>
                    <p className="text-center text-lg-left m-0">
                      PassivesIncome :
                      {StackingSlice.Wallatedata?.data?.income[0]?.passives?.toFixed(
                        2
                      )}
                      $
                    </p>
                    <p className="text-center text-lg-left m-0">
                      AchivementsIncome :
                      {StackingSlice.Wallatedata?.data?.income[0]?.achivements?.toFixed(
                        2
                      )}
                      $
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3 py-3 justify-content-lg-center">
              <div className="col-12 col-lg-3 text-light py-2">
                <div
                  className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 "
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigation("/mian/Withdrawal");
                  }}
                >
                  <div className="pb-2 pb-lg-0 d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/totalteaminvestment 1.png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h6 className="pt-3 text-center">Team Total Investment</h6>
                    <h6 className="text-center">
                      {StackingSlice.Wallatedata?.data?.teamtotalstack
                        ? StackingSlice.Wallatedata?.data?.teamtotalstack
                        : 0}
                      $
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 text-light py-2">
                <div
                  className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 "
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigation("/mian/Withdrawal");
                  }}
                >
                  <div className="pb-2 pb-lg-0 d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/Myinvestment 1.png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h6 className="pt-3 text-center">My Investment</h6>
                    <h6 className="text-center">
                      {StackingSlice.Wallatedata?.data?.mystack
                        ? StackingSlice.Wallatedata?.data?.mystack
                        : 0}
                      $
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 ">
                  <div className="pb-2 pb-lg-0 d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/airdroptokens 1.png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h6 className="pt-0 text-center">Airdrop Coins</h6>
                    <h6 className="text-center">
                      {StackingSlice.Wallatedata?.data?.mystack > 120
                        ? Profile[0]?.Airdropped
                        : 0}{" "}
                      USDT
                    </h6>
                    {StackingSlice.Wallatedata?.data?.mystack > 120 && (
                      <button
                        className="text-light"
                        style={{
                          background: "#02a2c4",
                          height: 60,
                          border: "none",
                        }}
                        onClick={async () => {
                          const res = await dispatch(
                            getdappWallatedata({
                              Token:
                                JSON.parse(localStorage.getItem("data")) &&
                                JSON.parse(localStorage.getItem("data")).data
                                  .token,
                            })
                          );
                          if (res.payload.data.isSuccess) {
                            toast.success(res.payload.data.message);
                            setotp("");
                            setopen(!false);
                          } else {
                            toast.error(res.payload.data.message);
                          }
                        }}
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 ">
                  <div className="pb-2 pb-lg-0 d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/increase.png")}
                      alt=""
                      className="img-fluid"
                      width={75}
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h6 className="pt-3 text-center">
                      You Transfer coin CURRENT PRICE
                    </h6>
                    <h6 className="text-center">
                      {StackingSlice.Wallatedata?.data?.V4Xtokenprice}$
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-light py-2 px-4">
                <div
                  className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 "
                  style={{ overflowX: "scroll" }}
                >
                  <Tree
                    lineWidth={"2px"}
                    lineHeight={"35px"}
                    lineColor={"#fff"}
                    lineBorderRadius={"10px"}
                    label={
                      <div className="d-flex justify-content-center align-items-center my-2">
                        <FaUserAlt
                          style={{
                            color: "#fff",
                            fontSize: 22,
                          }}
                        />
                        <h6
                          className="my-0 mx-3"
                          style={{
                            color: "#fff",
                            fontSize: 18,
                          }}
                        >
                          {Profile && Profile[0]?.username}
                        </h6>
                      </div>
                    }
                  >
                    <div className="py-5 d-flex">
                      {StackingSlice?.Wallatedata?.data &&
                        StackingSlice.Wallatedata?.data?.ReffData1.map((e) => {
                          return (
                            <>
                              <TreeNode
                                label={
                                  <div className="d-flex justify-content-center align-items-center my-2">
                                    <FaUserAlt
                                      style={{
                                        color: "#fff",
                                        fontSize: 22,
                                      }}
                                    />
                                    <h6
                                      className="my-0 mx-3"
                                      style={{
                                        color: "#fff",
                                        fontSize: 18,
                                      }}
                                    >
                                      {e.username}
                                    </h6>
                                  </div>
                                }
                              />
                            </>
                          );
                        })}
                    </div>
                  </Tree>
                </div>
              </div>
            </div>

            <Modal show={open} onHide={() => setopen(!open)} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h6 className="text-light m-0"></h6>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputField
                  type="number"
                  name="Amount1"
                  value={otp}
                  placeholder="Enter Your OTP"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                  style={{ border: "1px solid #fff" }}
                />
                <InputField
                  type="text"
                  name="Amount1"
                  value={address}
                  placeholder="Enter Your Wallate Address"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  style={{ border: "1px solid #fff" }}
                />
                <Button
                  className={" w-100 text-light"}
                  Stake={!false}
                  style={{
                    background: "#1a1a1a",
                    height: 60,
                    border: "none",
                  }}
                  label={"Submit"}
                  onClick={async () => {
                    setopen(!open);
                    const res = await dispatch(
                      getdappWallatedata1({
                        otp: otp,
                        walletaddress: address,
                        Amount: 10,
                        Remark: "Airdrop wallate",
                        Token:
                          JSON.parse(localStorage.getItem("data")) &&
                          JSON.parse(localStorage.getItem("data")).data.token,
                      })
                    );
                    if (res.payload.data.isSuccess) {
                      getalldata();
                      toast.success(res.payload.data.message);
                    } else {
                      toast.error(res.payload.data.message);
                    }
                  }}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </Spin>
    </>
  );
};
export default Dashboard;
// import "./Dashboard.scss";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import {
//   MdContentCopy,
//   MdDashboard,
//   MdNotificationsActive,
//   MdSupportAgent,
// } from "react-icons/md";
// import {
//   FaDollarSign,
//   FaUserCircle,
//   FaUserFriends,
//   FaUsers,
//   FaWallet,
// } from "react-icons/fa";
// import { RiCoinsFill } from "react-icons/ri";
// import { BiLogInCircle, BiMenu, BiTransferAlt } from "react-icons/bi";
// import { BsDropletFill } from "react-icons/bs";
// import { AiFillEye } from "react-icons/ai";
// import { Dropdown } from "react-bootstrap";
// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// const Dashboard = () => {
//   const navigation = useNavigate();
//   let windowSize = useRef([window.innerWidth, window.innerHeight]);
//   useEffect(() => {}, [window]);

//   return (
//     <>
//       <div className="headermain">
//         <div
//           className="justify-content-between px-4 py-2 align-items-center d-lg-flex d-none hedar"
//           style={{ background: "#0a0a0a" }}
//         >
//           <div className="">
//             <div className="p-1 ">
//               <img
//                 src={require("../../assets/img/Logo.png")}
//                 alt=""
//                 width={110}
//                 height={75}
//               />
//             </div>
//           </div>
//           <div className="">
//             <MdNotificationsActive
//               className="mx-3"
//               style={{ color: "#02a2c4", fontSize: "28px" }}
//             />
//             <BiLogInCircle
//               className="mx-3"
//               style={{ color: "#02a2c4", fontSize: "28px", cursor: "pointer" }}
//               onClick={() => {
//                 navigation("/");
//               }}
//             />
//             <button className="Username m-2 py-2 px-3">
//               {/* Username : */}
//               Username :{" "}
//               {JSON.parse(localStorage.getItem("data")) &&
//                 JSON.parse(
//                   JSON.parse(localStorage.getItem("data"))?.config.data
//                 )?.email}
//             </button>
//             <button className="Username m-2 py-2 px-3">
//               <FaUserCircle
//                 className="me-2"
//                 style={{ color: "#02a2c4", fontSize: "23px" }}
//               />
//               Profile
//             </button>
//           </div>
//         </div>
//         <Navbar />
//         {/* <Navbar
//           collapseOnSelect
//           expand="lg"
//           bg="dark"
//           variant="dark"
//           className="hedar1"
//         >
//           <div className="">
//             <img
//               src={require("../../assets/img/Logo.png")}
//               alt=""
//               className="img-fluid d-lg-none d-block"
//               width={120}
//               height={"100%"}
//             />
//           </div>
//           <div className="p-1">
//             {windowSize.current[0] < 992 && (
//               <>
//                 <MdNotificationsActive
//                   className="mx-1 mx-lg-3"
//                   style={{ color: "#02a2c4", fontSize: "28px" }}
//                 />
//                 <BiLogInCircle
//                   className="mx-1 mx-lg-3"
//                   style={{
//                     color: "#02a2c4",
//                     fontSize: "28px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     navigation("/");
//                   }}
//                 />
//               </>
//             )}
//             <Navbar.Toggle
//               aria-controls="basic-navbar-nav"
//               className="mx-2 mx-lg-3"
//             >
//               <BiMenu style={{ color: "#02a2c4", fontSize: "28px" }} />
//             </Navbar.Toggle>
//           </div>
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="px-4 px-lg-0">
//               <Nav.Link
//                 href="#features"
//                 className="d-flex justify-content-start align-items-center py-3 text-light"
//               >
//                 <MdDashboard
//                   className="ms-2 me-3"
//                   style={{ color: "#02a2c4", fontSize: "20px" }}
//                 />
//                 Dashboard
//               </Nav.Link>
//               <Nav.Link
//                 href="#features"
//                 className="d-flex justify-content-start align-items-center  py-3 text-light"
//               >
//                 <FaWallet
//                   className="ms-2 me-3"
//                   style={{ color: "#02a2c4", fontSize: "20px" }}
//                 />
//                 Wallet & Withdrawal
//               </Nav.Link>
//               <Nav.Link
//                 href="#features"
//                 className="d-flex justify-content-start align-items-center  py-3 text-light"
//               >
//                 <RiCoinsFill
//                   className="ms-2 me-3"
//                   style={{ color: "#02a2c4", fontSize: "20px" }}
//                 />
//                 Stake You Transfer coin
//               </Nav.Link>
//               <Nav.Link
//                 href="#features"
//                 className="d-flex justify-content-start align-items-center  py-3 text-light"
//               >
//                 <FaUsers
//                   className="ms-2 me-3"
//                   style={{ color: "#02a2c4", fontSize: "20px" }}
//                 />
//                 My Infinity.AI Team
//               </Nav.Link>
//               <Nav.Link
//                 href="#features"
//                 className="d-flex justify-content-start align-items-center  py-3 text-light"
//               >
//                 <FaUserFriends
//                   className="ms-2 me-3"
//                   style={{ color: "#02a2c4", fontSize: "20px" }}
//                 />
//                 Infinity.AI Direct Team
//               </Nav.Link>
//               <Dropdown>
//                 <Dropdown.Toggle
//                   variant="none"
//                   id="dropdown-basic"
//                   className="d-flex justify-content-start align-items-center px-0  py-3 text-light"
//                   style={{ border: "none", color: "#fff" }}
//                 >
//                   <FaDollarSign
//                     className="ms-2 me-3"
//                     style={{ color: "#02a2c4", fontSize: "20px" }}
//                   />
//                   Dropdown Button
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-2">
//                     Another action
//                   </Dropdown.Item>
//                   <Dropdown.Item href="#/action-3">
//                     Something else
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//               <Nav.Link
//                 href="#features"
//                 className="d-flex justify-content-start align-items-center  py-2 text-light"
//               >
//                 <MdSupportAgent
//                   className="ms-2 me-3"
//                   style={{ color: "#02a2c4", fontSize: "20px" }}
//                 />
//                 Support
//               </Nav.Link>
//               {windowSize.current[0] < 992 && (
//                 <>
//                   <button className="Username m-2 py-2 px-3">
//                     Username : Infinity.AI10019
//                   </button>
//                   <button className="Username m-2 py-2 px-3">
//                     <FaUserCircle
//                       className="me-2"
//                       style={{ color: "#02a2c4", fontSize: "23px" }}
//                     />
//                     Profile
//                   </button>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Navbar> */}
//       </div>
//       <div className="container-fluid blackbg">
//         <div className="mainsection ">
//           <div className="row px-3 py-4">
//             <div className="col-12 col-md-6 col-lg-4 text-light py-2">
//               <div className="Boxcard p-4">
//                 <div className="d-flex px-3">
//                   <div className="w-75">
//                     <p>Infinity.AI Main Wallet</p>
//                     <h2>10000.00</h2>
//                   </div>
//                   <div className="w-25">
//                     <img
//                       src={require("../../assets/img/wallet (1) 1.png")}
//                       alt=""
//                       width={45}
//                       height={45}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex flex-wrap  ps-3">
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 m-1"
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <BsDropletFill
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "18px" }}
//                     />
//                     Stake
//                   </button>
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 m-1"
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <BiTransferAlt
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "23px" }}
//                     />
//                     Transfer
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-md-6 col-lg-4 text-light py-2">
//               <div className="Boxcard p-4">
//                 <div className="d-flex px-3">
//                   <div className="w-75">
//                     <p>Infinity.AI Main Wallet</p>
//                     <h2>5000.00</h2>
//                   </div>
//                   <div className="w-25">
//                     <img
//                       src={require("../../assets/img/e-wallet 1.png")}
//                       alt=""
//                       width={45}
//                       height={45}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex flex-wrap  ps-3">
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 m-1"
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <BsDropletFill
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "18px" }}
//                     />
//                     Stake
//                   </button>
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 m-1"
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <BiTransferAlt
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "23px" }}
//                     />
//                     Transfer
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-md-6 col-lg-4 text-light py-2">
//               <div className="Boxcard p-4">
//                 <div className="d-flex px-3">
//                   <div className="w-75">
//                     <p>Infinity.AI Dapp Wallet</p>
//                     <h2>2000.00</h2>
//                   </div>
//                   <div className="w-25">
//                     <img
//                       src={require("../../assets/img/hot-wallet (1) 1.png")}
//                       alt=""
//                       width={45}
//                       height={45}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex flex-wrap  ps-3">
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 m-1"
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <BsDropletFill
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "18px" }}
//                     />
//                     Stake
//                   </button>
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 m-1"
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <BiTransferAlt
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "23px" }}
//                     />
//                     Check on BSCscan
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row px-3">
//             <div className="col-12 col-md-6 text-light py-2">
//               <div className="Boxcard p-4 d-block d-lg-flex  justify-content-lg-between align-items-center">
//                 <div className=" pb-2 pb-lg-0">
//                   <h6 className="m-0">Copy Referral Link </h6>
//                 </div>
//                 <div className="">
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 "
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <MdContentCopy
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "23px" }}
//                     />
//                     Click to copy
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-md-6 text-light py-2">
//               <div className="Boxcard p-4 d-block d-lg-flex  justify-content-lg-between align-items-center">
//                 <div className=" pb-2 pb-lg-0">
//                   <h6 className="m-0">Copy Referral Link </h6>
//                 </div>
//                 <div className="">
//                   <button
//                     className="text-light d-flex align-items-center px-4 py-2 "
//                     style={{ background: "#02a2c4", position: "inherit" }}
//                   >
//                     <MdContentCopy
//                       className="me-2"
//                       style={{ color: "#FFF", fontSize: "23px" }}
//                     />
//                     Click to copy
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row px-3 py-4">
//             <div className="col-12 col-lg-6 text-light">
//               <div className="Boxcard p-4">
//                 <div className="d-flex">
//                   <div className="pe-4 ps-2">
//                     <img
//                       src={require("../../assets/img/Vector (19).png")}
//                       alt=""
//                       width={30}
//                       height={30}
//                     />
//                   </div>
//                   <div className="">
//                     <p>Investments</p>
//                   </div>
//                 </div>

//                 <button
//                   className="text-light d-flex align-items-center justify-content-between px-4 py-2 my-3 w-100"
//                   style={{ background: "#02a2c4", position: "inherit" }}
//                 >
//                   <div className="">
//                     <img
//                       src={require("../../assets/img/Vector (20).png")}
//                       alt=""
//                       width={30}
//                       height={30}
//                       className="me-3"
//                     />
//                     My Infinity.AI Investments
//                   </div>
//                   <div className="">
//                     <h2 className="m-0">35000 $</h2>
//                   </div>
//                 </button>
//                 <button
//                   className="text-light d-flex align-items-center justify-content-between px-4 py-2 mt-3 w-100"
//                   style={{ background: "#02a2c4", position: "inherit" }}
//                 >
//                   <div className="">
//                     <img
//                       src={require("../../assets/img/Vector (21).png")}
//                       alt=""
//                       width={30}
//                       height={30}
//                       className="me-3"
//                     />
//                     My Infinity.AI Team Investments
//                   </div>
//                   <div className="">
//                     <h2 className="m-0">705000 $</h2>
//                   </div>
//                 </button>
//               </div>
//             </div>
//             <div className="col-12 col-lg-6 text-light">
//               <div className="row pb-4">
//                 <div className="col-12 col-lg-6 text-light pt-4 pt-lg-0">
//                   <div className="Boxcard p-4">
//                     <div className="d-flex">
//                       <div className="pe-4 ps-2">
//                         <FaUsers
//                           className="me-0"
//                           style={{ fontSize: "30px" }}
//                         />
//                       </div>
//                       <div className="">
//                         <p>My Infinity.AI Team</p>
//                       </div>
//                     </div>
//                     <div className="d-flex flex-wrap justify-content-center align-items-center px-2">
//                       <div className="w-50">
//                         <h2>10</h2>
//                       </div>
//                       <div className="w-50">
//                         <button
//                           className="text-light d-flex align-items-center px-4 py-2 m-1"
//                           style={{ background: "#02a2c4", position: "inherit" }}
//                         >
//                           <AiFillEye
//                             className="me-2"
//                             style={{ color: "#FFF", fontSize: "23px" }}
//                           />
//                           View Tree
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-12 col-lg-6 text-light pt-4 pt-lg-0">
//                   <div className="Boxcard p-4">
//                     <div className="d-flex">
//                       <div className="pe-4 ps-2">
//                         <img
//                           src={require("../../assets/img/Vector (22).png")}
//                           alt=""
//                           width={30}
//                           height={30}
//                           className="me-3"
//                         />
//                       </div>
//                       <div className="">
//                         <p>Infinity.AI Live Rate</p>
//                       </div>
//                     </div>
//                     <div className="d-flex px-2">
//                       <h2>1.0000 $</h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-12 col-lg-6 text-light  pt-lg-0">
//                   <div className="Boxcard p-4">
//                     <div className="d-flex">
//                       <div className="pe-4 ps-2">
//                         <FaUsers
//                           className="me-0"
//                           style={{ fontSize: "30px" }}
//                         />
//                       </div>
//                       <div className="">
//                         <p>Total Team</p>
//                       </div>
//                     </div>
//                     <div className="d-flex flex-wrap justify-content-center align-items-center px-3">
//                       <div className="w-50">
//                         <h2>30</h2>
//                       </div>
//                       <div className="w-50">
//                         <button
//                           className="text-light d-flex align-items-center px-4 py-2 m-1"
//                           style={{ background: "#02a2c4", position: "inherit" }}
//                         >
//                           <AiFillEye
//                             className="me-2"
//                             style={{ color: "#FFF", fontSize: "23px" }}
//                           />
//                           View Tree
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-12 col-lg-6 text-light pt-4 pt-lg-0">
//                   <div className="Boxcard p-4">
//                     <div className="d-flex">
//                       <div className="pe-4 ps-2">
//                         <img
//                           src={require("../../assets/img/Vector (23).png")}
//                           alt=""
//                           width={30}
//                           height={30}
//                           className="me-3"
//                         />
//                       </div>
//                       <div className="">
//                         <p>Airdropped You Transfer coin</p>
//                       </div>
//                     </div>
//                     <div className="d-flex flex-wrap justify-content-center align-items-center">
//                       <div className="w-50">
//                         <h2>50.00</h2>
//                       </div>
//                       <div className="w-50">
//                         <button
//                           className="text-light d-flex align-items-center px-4 py-2 m-1"
//                           style={{ background: "#02a2c4", position: "inherit" }}
//                         >
//                           <BiTransferAlt
//                             className="me-2"
//                             style={{ color: "#FFF", fontSize: "23px" }}
//                           />
//                           Withdraw
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Dashboard;
