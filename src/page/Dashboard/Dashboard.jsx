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
import { daireactteam } from "../../Redux/daireactteam";
const Dashboard = () => {
  const StackingSlice = useSelector((state) => state.WallatedatSlice);
  const [address, setaddress] = React.useState("");
  const [open, setopen] = React.useState(false);
  const [otp, setotp] = React.useState("");
  const [Profile, setProfile] = React.useState({});
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [Alldata, setAlldata] = React.useState(0);
  const [todaystack, settodaystack] = React.useState(0);
  useEffect(() => {
    getalldata();
    getalldata1();
  }, []);
  const getalldata1 = async () => {
    const res = await dispatch(
      daireactteam({
        serch: "",
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    var resultProductData = res?.payload?.data.ReffData[0]?.referBY.filter(
      (a) => {
        return (
          a.mystack >= 40 &&
          new Date(a.createdAt).toLocaleDateString() ==
            new Date().toLocaleDateString()
        );
      }
    );
    setAlldata(resultProductData.length);
  };
  console.log("todaystack", todaystack);
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
            <div className="d-flex justify-content-between py-3 px-4">
              <h5 className="pt-2 pt-lg-0 mb-2 text-center text-lg-left text-light">
                Laval : {Profile[0]?.leval}
              </h5>{" "}
              <h5 className="pt-2 pt-lg-0 mb-2 text-center text-lg-left text-light">
                Rank : {Profile[0]?.Rank}
              </h5>{" "}
            </div>
            <div className="row px-3  pb-3 justify-content-lg-center">
              <div className="col-12 col-lg-4  text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/solar_user-bold (1).png")}
                      alt=""
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h4 className="pt-2 pt-lg-0 mb-2 text-center text-lg-left">
                      username
                    </h4>
                    <p className="text-center text-lg-left">
                      <b>Hi,{Profile[0]?.Fullname}</b> <br />
                      <b>{Profile[0]?.username}</b>
                    </p>
                    <button
                      className="text-light d-flex justify-content-center align-items-center px-4 py-2 "
                      style={{ background: "#389AE4", position: "inherit" }}
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
                    <p className="text-center text-lg-left">
                      {"Release Data: " +
                        StackingSlice.Wallatedata?.data?.lockeddate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 ">
                  <div className="pb-2 pb-lg-0 d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/SvgjsPath1210 (2).png")}
                      alt=""
                      className="img-fluid"
                      width={175}
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h6 className="pt-3 text-center">
                      Current Infinity Ai Token Live price
                    </h6>
                    <h6 className="text-center">
                      {StackingSlice.Wallatedata?.data?.V4Xtokenprice}$
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3  pb-3 justify-content-lg-center">
              <div
                className="col-12 col-lg-4 text-light py-2"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigation("/daireactterm");
                }}
              >
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100 ">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/Vector (74).png")}
                      alt=""
                      width={80}
                    />
                  </div>
                  <div
                    className=" d-flex h-50 h-md-100 flex-column justify-content-center"
                    style={{
                      cursor: "pointer",
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
                  navigation("/Totaltrem");
                }}
              >
                {" "}
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/game-icons_team-idea.png")}
                      alt=""
                      width={80}
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
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-25 h-md-100">
                    <FaDollarSign
                      className="ms-2 me-3"
                      style={{ color: "#389AE4", fontSize: "61px" }}
                    />
                  </div>
                  <div className=" d-flex h-50 h-md-100 flex-column justify-content-center ">
                    {/* <h4 className="pt-5 mt-3 mt-lg-3 pt-lg-0 pb-md-4 mb-md-2 text-center text-lg-left">
                      Income Details
                    </h4> */}
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0 pt-5 pt-md-0 ">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Airdrop Coins :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.mystack >= 120
                          ? (10).toFixed(2)
                          : 0}
                        $
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Referral & Earn :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.income[0]?.ReferandEarn?.toFixed(
                          2
                        )}
                        $
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {" "}
                        Staking Bonus :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.income[0]?.StakingBonusIncome?.toFixed(
                          2
                        )}
                        $
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Community reward :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.income[0]?.communities?.toFixed(
                          2
                        )}
                        $
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Passive club reward :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.income[0]?.passives?.toFixed(
                          2
                        )}
                        $
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {" "}
                        Achievement reward :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.income[0]?.achivements?.toFixed(
                          2
                        )}
                        $
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-3 py-3 justify-content-lg-center">
              <div className="col-12 col-lg-4 text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex  justify-content-space-around align-items-center h-100">
                  <div className=" pb-2 pb-lg-0  d-flex  justify-content-center align-items-center h-25 h-md-100">
                    <img
                      src={require("../../assets/img/totalteaminvestment 1.png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0 pt-5 pt-md-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Active AI Team :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {
                          StackingSlice.Wallatedata?.data?.aggregatedUserData
                            .refers_to1Size
                        }
                      </p>
                    </p>{" "}
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0 pt-md-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Today Active AI Team :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {Alldata}
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Date of registration :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {new Date(
                          StackingSlice.Wallatedata?.data?.profile[0].createdAt
                        ).toDateString()}
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {" "}
                        Date Activation :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {new Date(
                          StackingSlice.Wallatedata?.data?.activedate
                        ).toDateString()}
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Today Business :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.todayStackAmount}$
                      </p>
                    </p>
                    <p className="text-center text-lg-left m-0 d-flex justify-content-between justify-content-lg-start m-0">
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        Total Business :
                      </p>
                      <p className=" m-0" style={{ fontSize: "13px" }}>
                        {StackingSlice.Wallatedata?.data?.teamtotalstack}$
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 text-light py-2">
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
                      src={require("../../assets/img/bxs_badge-dollar.png")}
                      alt=""
                      width={80}
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
              <div className="col-12 col-lg-4 text-light py-2">
                <div className="Boxcard p-4 d-block d-lg-flex flex-column  justify-content-space-around align-items-center h-100 ">
                  <div className="pb-2 pb-lg-0 d-flex  justify-content-center align-items-center h-50 h-md-100">
                    <img
                      src={require("../../assets/img/Group (6).png")}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="d-flex h-50 h-md-100 flex-column justify-content-center">
                    <h6 className="pt-0 text-center">Airdrop Coins</h6>
                    <h6 className="text-center">
                      {StackingSlice.Wallatedata?.data?.mystack >= 120
                        ? Profile[0]?.Airdropped
                        : 0}{" "}
                      USDT
                    </h6>
                    {StackingSlice.Wallatedata?.data?.mystack >= 120 && (
                      <button
                        className="text-light"
                        style={{
                          background: "#389AE4",
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
                        <img
                          src={require("../../assets/img/solar_user-bold (1).png")}
                          alt=""
                          width={70}
                        />
                        <h6
                          className="my-0 mx-3"
                          style={{
                            color: "#fff",
                            fontSize: 18,
                          }}
                        >
                          {Profile && `${Profile[0]?.username} (${Profile[0]?.Fullname})`}
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
                                    <img
                                      src={require("../../assets/img/solar_user-bold (1).png")}
                                      alt=""
                                      width={50}
                                    />
                                    <h6
                                      className="my-0 mx-3"
                                      style={{
                                        color: "#fff",
                                        fontSize: 18,
                                      }}
                                    >
                                      {`${e.username} (${e?.Fullname})`}
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
              <Modal.Header>
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
