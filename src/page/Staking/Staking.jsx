import InputField from "../../components/InputField";
import React, { useEffect } from "react";
import { Spin, Table, Tooltip } from "antd";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/ButtonField";
import "./Staking.scss";
import drop from "../../assets/img/Vector (25).svg";
import { Allstacking, BuyStacking } from "../../Redux/StackingSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Wallatedata } from "../../Redux/WallatedatSlice";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import v4x from "../../Helpers/v4x.json";
import bep20Abi from "../../Helpers/bep20Abi.json";
import { ExportToExcel } from "../../ExportToExcel";
import { Col, DatePicker, Row, Select, Input, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { Injected, WalletConnect } from "../../Helpers/Injected";
const { RangePicker } = DatePicker;
function Staking() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [v4xBalance, setv4xBalance] = React.useState(null);
  const [modal2Open, setModal2Open] = React.useState(false);
  const [Wallet1, setWallet1] = React.useState("");
  const [Alldata, setAlldata] = React.useState([]);
  const [loding, setloding] = React.useState(!true);
  const [Fillter, setFillter] = React.useState([]);
  const [page, setpage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const [values, setValues] = React.useState({
    Mainwalletstacking: 40,
    ewalletstacking: 40,
    dappwalletstacking: 40,
  });
  const [validations, setValidations] = React.useState({
    Mainwalletstacking: "",
    ewalletstacking: "",
    dappwalletstacking: "",
  });
  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React();
  const [show, setShow] = React.useState(false);
  const getWeb3 = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider);
      return web3;
    } catch (err) {
      console.log("error", err);
    }
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      let data = Alldata.filter((truck) => {
        return (
          truck.WalletType.toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.TotaldaysTosendReword.toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.DailyReword.toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.Amount.toString().toLowerCase().match(value.toLowerCase()) ||
          truck.TotalRewordRecived.toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.bonusAmount
            .toString()
            .toLowerCase()
            .match(value.toLowerCase()) ||
          truck.TotalRewordsend.toString()
            .toLowerCase()
            .match(value.toLowerCase())
        );
      });
      setFillter(data);
    } else {
      getalldata();
    }
  };
  const getBalance = async () => {
    try {
      console.log(account);
      if (account) {
        let web3 = await getWeb3();
        let contract = await new web3.eth.Contract(
          v4x,
          "0x55d398326f99059fF775485246999027B3197955"
        );
        const decimal = await contract.methods.decimals().call();
        await contract.methods
          .balanceOf(account)
          .call()
          .then((balance) => {
            balance = balance / 10 ** decimal;
            setv4xBalance(balance);
          });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getBalance();
    setWallet1(account);
  }, [account]);
  const handleShow = () => setShow(true);
  const connect = async () => {
    try {
      if (!account) {
        if (typeof window.ethereum !== "undefined") {
          handleShow();
        } else {
          await activate(WalletConnect);
        }
      } else {
        deactivate();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const StackingSlice = useSelector((state) => state.StackingSlice);
  useEffect(() => {
    getalldata();
  }, [location.pathname]);
  useEffect(() => {
    setloding(!StackingSlice.isLoader);
  }, [StackingSlice]);
  const WallatedatSlice = useSelector(
    (state) => state.WallatedatSlice.Wallatedata
  );
  const handleClose = () => setShow(false);
  const getalldata = async () => {
    const res = await dispatch(
      Allstacking({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
    setAlldata(res.payload.data.data);
    setFillter(res.payload.data.data);
  };
  const onTabChange = (page, pageSize) => {
    setpage(page);
    setpageSize(pageSize);
  };
  const getalldata1 = async () => {
    const res = await dispatch(
      Wallatedata({
        Token:
          JSON.parse(localStorage.getItem("data")) &&
          JSON.parse(localStorage.getItem("data")).data.token,
      })
    );
  };
  const validateAll = () => {
    const { Mainwalletstacking, ewalletstacking, dappwalletstacking } = values;
    const validations = {
      Mainwalletstacking: "",
      ewalletstacking: "",
      dappwalletstacking: "",
    };
    let isValid = true;
    console.log({ Mainwalletstacking, ewalletstacking, dappwalletstacking });
    if (!Mainwalletstacking) {
      validations.Mainwalletstacking =
        "Main Wallet Stacking Amount is required!";
      isValid = false;
    } else if ((Mainwalletstacking / 40).toString().includes(".")) {
      validations.Mainwalletstacking =
        "You must stake the amount in the multiple of 40..!!!";
      isValid = false;
    } else if (Mainwalletstacking <= 39) {
      validations.Mainwalletstacking =
        "You must stake the amount in the Greater than  of 40..!!!";
      isValid = false;
    }
    if (!ewalletstacking) {
      validations.ewalletstacking = "E-Wallet Stacking Amount is required!";
      isValid = false;
    } else if ((ewalletstacking / 40).toString().includes(".")) {
      validations.ewalletstacking =
        "You must stake the amount in the multiple of 40..!!!";
      isValid = false;
    } else if (ewalletstacking <= 39) {
      validations.ewalletstacking =
        "You must stake the amount in the Greater than  of 40..!!!";
      isValid = false;
    }
    if (!dappwalletstacking) {
      validations.dappwalletstacking =
        "dapp Wallet Stacking Amount is required!";
      isValid = false;
    } else if ((dappwalletstacking / 40).toString().includes(".")) {
      validations.dappwalletstacking =
        "You must stake the amount in the multiple of 40..!!!";
      isValid = false;
    } else if (dappwalletstacking <= 39) {
      validations.dappwalletstacking =
        "You must stake the amount in the Greater than of 40..!!!";
      isValid = false;
    }
    if (!isValid) {
      setValidations(validations);
    }

    return validations;
  };
  const Mainwalletstacking = async (e) => {
    validateAll();
    if (validateAll()[e] === "") {
      if (e === "dappwalletstacking") {
        if (account) {
          setloding(true);
          let web3 = await getWeb3();
          let contract = await new web3.eth.Contract(
            v4x,
            "0x55d398326f99059fF775485246999027B3197955"
          );
          const decimal = await contract.methods.decimals().call();
          await contract.methods
            .transfer(
              process.env.REACT_APP_OWNER_ADDRESS,
              web3.utils.toBN(values[e] * Math.pow(10, decimal))
            )
            .send({
              from: account,
              gasPrice: web3.utils.toWei("5", "gwei"), // Set gas price to 5 Gwei (adjust as needed)
            })
            .on("receipt", async (receipt) => {
              const res = await dispatch(
                BuyStacking({
                  WalletType: e.toString(),
                  Amount: values[e],
                  V4xTokenPrice: livaratev4xtoken,
                  Token:
                    JSON.parse(localStorage.getItem("data")) &&
                    JSON.parse(localStorage.getItem("data")).data.token,
                  transactionHash: receipt.transactionHash,
                })
              );
              if (res.payload.data.isSuccess) {
                toast.success(res.payload.data.message);
                getalldata();
                getalldata1();
                setloding(!true);
              } else {
                toast.error(res.payload.data.message);
                setloding(!true);
              }
            })
            .on("error", (error) => {
              setloding(!true);
              console.error("Transaction Error:", error);
            });
        } else {
          await connect();
        }
      } else {
        const res = await dispatch(
          BuyStacking({
            WalletType: e.toString(),
            Amount: values[e],
            V4xTokenPrice: livaratev4xtoken,
            Token:
              JSON.parse(localStorage.getItem("data")) &&
              JSON.parse(localStorage.getItem("data")).data.token,
          })
        );
        if (res.payload.data.isSuccess) {
          toast.success(res.payload.data.message);
          getalldata();
          getalldata1();
        } else {
          toast.error(res.payload.data.message);
          getalldata();
        }
      }
      setValidations({
        Mainwalletstacking: "",
        ewalletstacking: "",
        dappwalletstacking: "",
      });
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: Number(value) });
  };
  const handleChange2 = (value) => {
    if (value) {
      var startDate = new Date(value[0]).toLocaleDateString();
      var endDate = new Date(value[1]).toLocaleDateString();
      var resultProductData = Alldata.filter((a) => {
        return (
          new Date(a.createdAt) >= new Date(startDate) &&
          new Date(a.createdAt) <= new Date(endDate)
        );
      });
      console.log(resultProductData);
      setFillter(resultProductData);
    } else {
      getalldata();
    }
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "100px",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "Wallet Type",
      dataIndex: "WalletType",
      key: "age",
      width: "250px",
      render: (address) => {
        return (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        );
      },
    },
    {
      title: "Days",
      dataIndex: "TotaldaysTosendReword",
      key: "address 1",
      width: "100px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        var date1 = new Date(record.createdAt);
        var date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (
          <Tooltip placement="topLeft" title={diffDays}>
            {diffDays}
          </Tooltip>
        );
      },
    },
    {
      title: "Daily Reward",
      dataIndex: "DailyReword",
      key: "DailyReword",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address.toFixed(4)}
        </Tooltip>
      ),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address.toFixed(3)}
        </Tooltip>
      ),
    },
    {
      title: "Total Reward",
      dataIndex: "TotalRewordRecived",
      key: "TotalRewordRecived",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => {
        return (
          <Tooltip placement="topLeft" title={730 * record.DailyReword}>
            {730 * record.DailyReword}
          </Tooltip>
        );
      },
    },
    {
      title: "Infinity.AI Coin Price",
      dataIndex: "V4xTokenPrice",
      key: "V4xTokenPrice",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address.toFixed(3)}
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "200px",
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
      title: "Locked Token Amount",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (text, record, index) => (
        <Tooltip
          placement="topLeft"
          title={record.Amount / record.V4xTokenPrice}
        >
          {record.Amount / record.V4xTokenPrice}
        </Tooltip>
      ),
    },
    {
      title: "Locked Token Withdraw",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "200px",
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={new Date(address).toLocaleString()}>
          <button
            className="text-light p-2"
            style={{
              background: "#1e1e1e",
              border: "none",
            }}
            onClick={async () => {
              toast.error(
                "you will withdrawal your local amount after 42 month ."
              );
            }}
          >
            Withdraw
          </button>{" "}
        </Tooltip>
      ),
    },
  ];

  const livaratev4xtoken = StackingSlice?.data?.data?.V4Xtokenprice;
  return (
    <>
      <Spin spinning={loding}>
        <Navbar />
        {WallatedatSlice !== undefined && (
          <div className="container-fluid blackbg">
            <div className="mainsection">
              <div className="row px-3 pt-4">
                <div className="col-12 col-md-6 col-lg-4 text-light p-2 p-lg-3">
                  <div className="Boxcard p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <div className="">
                          <img
                            src={require("../../assets/img/Vector (25).svg")}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="px-3">
                          <p className="m-0"> Main wallet Staking</p>
                        </div>
                      </div>
                      <div className="">
                        <button
                          className="Viewslab"
                          onClick={() => setModal2Open(!modal2Open)}
                        >
                          View slab
                        </button>
                      </div>
                    </div>
                    <div className="stakingbox px-3 py-4 my-3 d-flex">
                      <div className="w-25 d-flex justify-content-center align-items-center">
                        <img src={drop} alt="" className="img-fluid" />
                      </div>
                      <div className="w-75">
                        Your tokens will be staked for a period of 24 months.
                      </div>
                    </div>
                    <div className="stakingbox p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                          <h5 className="m-0">Balance Available</h5>
                        </div>
                        <h5 className="m-0">
                          {WallatedatSlice &&
                            WallatedatSlice?.data?.data[0].mainWallet.toFixed(
                              2
                            )}
                        </h5>
                      </div>
                    </div>
                    <h6 className="pt-3 ps-1">Amount in USDT</h6>
                    <InputField
                      type="number"
                      name="Mainwalletstacking"
                      placeholder="Wallet address"
                      value={values.Mainwalletstacking}
                      error={validations.Mainwalletstacking}
                      onChange={handleChange}
                      min={40}
                      defaultValue={40}
                      step={40}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                    <div className=" mt-3 d-flex align-items-center">
                      <Button
                        className={" w-100 text-light"}
                        Stake={false}
                        style={{
                          background: "#02a2c4",
                          height: 52,
                          border: "none",
                        }}
                        onClick={() => Mainwalletstacking("Mainwalletstacking")}
                        label={"Stake Using Main wallet"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-light p-2 p-lg-3">
                  <div className="Boxcard p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <div className="">
                          <img
                            src={require("../../assets/img/Vector (25).svg")}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="px-3">
                          <p className="m-0"> E-Wallet Staking</p>
                        </div>
                      </div>
                      <div className="">
                        <button
                          className="Viewslab"
                          onClick={() => setModal2Open(!modal2Open)}
                        >
                          View slab
                        </button>
                      </div>
                    </div>
                    <div className="stakingbox px-3 py-4 my-3 d-flex">
                      <div className="w-25 d-flex justify-content-center align-items-center">
                        <img src={drop} alt="" className="img-fluid" />
                      </div>
                      <div className="w-75">
                        Your tokens will be staked for a period of 24 months.
                      </div>
                    </div>
                    <div className="stakingbox p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                          <h6 className="m-0">Balance Available</h6>
                        </div>
                        <h5 className="m-0">
                          {WallatedatSlice &&
                            WallatedatSlice?.data?.data[0].v4xWallet.toFixed(2)}
                        </h5>
                      </div>
                    </div>
                    <h6 className="pt-3 ps-1">Amount in USDT</h6>
                    <InputField
                      type="number"
                      name="ewalletstacking"
                      placeholder="Wallet address"
                      value={values.ewalletstacking}
                      error={validations.ewalletstacking}
                      onChange={handleChange}
                      min={40}
                      defaultValue={40}
                      step={40}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />

                    <div className=" mt-3 d-flex align-items-center">
                      <Button
                        className={" w-100 text-light"}
                        Stake={false}
                        style={{
                          background: "#02a2c4",
                          height: 52,
                          border: "none",
                        }}
                        onClick={() => Mainwalletstacking("ewalletstacking")}
                        label={"Stake Using E-Wallet"}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 text-light p-2 p-lg-3">
                  <div className="Boxcard p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex">
                        <div className="">
                          <img
                            src={require("../../assets/img/Vector (25).svg")}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <div className="px-3">
                          <p className="m-0">DAPP-Wallet Staking</p>
                        </div>
                      </div>
                      <div className="">
                        <button
                          className="Viewslab"
                          onClick={() => setModal2Open(!modal2Open)}
                        >
                          View slab
                        </button>
                      </div>
                    </div>
                    <div className="stakingbox px-3 py-4 my-3 d-flex">
                      <div className="w-25 d-flex justify-content-center align-items-center">
                        <img src={drop} alt="" className="img-fluid" />
                      </div>
                      <div className="w-75">
                        Your tokens will be staked for a period of 24 months.
                      </div>
                    </div>
                    <div className="stakingbox p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="">
                          <h5 className="m-0">Balance Available</h5>
                        </div>
                        <h5 className="m-0">
                          {v4xBalance === null ? (
                            <h5 className="m-0" onClick={connect}>
                              Check Your Balance
                            </h5>
                          ) : (
                            v4xBalance.toFixed(2)
                          )}
                        </h5>
                      </div>
                    </div>
                    <h6 className="pt-3 ps-1">Amount in USDT</h6>
                    <InputField
                      type="number"
                      name="dappwalletstacking"
                      placeholder="Wallet address"
                      value={values.dappwalletstacking}
                      error={validations.dappwalletstacking}
                      onChange={handleChange}
                      min={40}
                      defaultValue={40}
                      step={40}
                      style={{
                        border: "1px solid #fff",
                      }}
                    />
                    <div className=" mt-3 d-flex align-items-center">
                      <Button
                        className={" w-100 text-light"}
                        Stake={false}
                        style={{
                          background: "#02a2c4",
                          height: 52,
                          border: "none",
                        }}
                        onClick={() => {
                          Mainwalletstacking("dappwalletstacking");
                        }}
                        label={"Stake Using DAPP Wallet"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row px-4">
                <Col className="px-3" xs={24} lg={12}>
                  <div className="">
                    <Text>Source</Text>
                    <br />
                    <Input
                      showSearch
                      style={{ width: "100%", maxWidth: "300px" }}
                      placeholder="Search"
                      className="mb-4"
                      name="serch"
                      onChange={handleChange1}
                    />
                  </div>
                </Col>
                <Col
                  className="px-3 mb-4 d-flex  justify-content-end align-items-center py-3"
                  xs={24}
                  lg={12}
                >
                  <RangePicker size="large" onChange={handleChange2} />
                  <ExportToExcel
                    apiData={Fillter}
                    fileName={"StakingDetails"}
                  />
                </Col>
                <Table
                  columns={columns}
                  dataSource={Fillter}
                  bordered={true}
                  title={() => "Your Staking Details"}
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["25", "50", "75", "100"],
                    showPageSizeOptions: true,
                    current: page,
                    onChange: (page, pageSize) => onTabChange(page, pageSize),
                  }}
                  scroll={{ x: "1500px " }}
                  exportable
                />
              </div>
            </div>
          </div>
        )}
        <Modal show={modal2Open} onHide={() => setModal2Open(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Slab Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Your % return will be calculated based on amount of tokens staked.
              You can see the Infinity.Ai slab details below.
            </p>
            <div className="d-flex">
              <div className="w-50">
                <h6 className="m-0 py-2 text-light text-center">
                  Range in USDT
                </h6>
                <p className="m-0 py-1 text-center">40 - 2000</p>
                <p className="m-0 py-1 text-center">2040 - 8000</p>
                <p className="m-0 py-1 text-center">8040 - 20000</p>
                <p className="m-0 py-1 text-center">20040 - Above</p>
              </div>
              <div className="w-50">
                <h6 className="m-0 py-2 text-light text-center">
                  % Return in 24 Months
                </h6>
                <p className="m-0 py-1 text-center">200%</p>
                <p className="m-0 py-1 text-center">225%</p>
                <p className="m-0 py-1 text-center">250%</p>
                <p className="m-0 py-1 text-center">300%</p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            {/* <div
              className="p-3 d-flex align-items-center"
              onClick={() => {
                activate(WalletConnect);
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
            </div> */}
            <div
              className="p-3 d-flex align-items-center"
              onClick={() => {
                activate(Injected);
                handleClose();
                getBalance();
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
      </Spin>
    </>
  );
}

export default Staking;
