import { useEffect } from "react";
import "./style/HomeDemo3.scss";
import { Modal } from "react-bootstrap";
import Web3 from "web3";
import { Injected, WalletConnect } from "../../Helpers/Injected";
import "../../assets/css/General.css";
import { toast } from "react-toastify";
import {
  service_single_content,
  FQAInfo,
  DocElementTitle,
  TokenText,
} from "../../data/data-containers/data-HomeDemo3.js";

import { HomeDemo3About1, HomeDemo3Allocation } from "../../utils/allImgs";

import Header from "../../layouts/Header";
import Footer from "../../layouts/FooterPages";
import { Spin, Table, Tooltip } from "antd";
import SecWelcomeArea from "./SecWelcomeArea";
import SecAboutUsClient from "./SecAboutUsClient";
import SecOurServices from "./SecOurServices";
import Slider from "react-slick";
import SecFAQ_Timeline from "./SecFAQ_Timeline";
import axios from "axios";
import SecDistribution from "./SecDistribution";
import SecPartners from "./SecPartners";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useState } from "react";
import SectionHeading from "../../components/SectionHeading";
const BASECOINGEKO = "https://www.coingecko.com/api/";
function Homepage3() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [coinstList, setCoinstList] = useState([]);
  const [show, setShow] = useState(false);
  const [alldata, setalldata] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Amount, setAmount] = useState(0);
  const [loding, setloding] = useState(true);
  const [values, setValues] = React.useState({
    Cryptoname: "BNB",
    purchasedAmount: "",
    AmountTopay: 0,
  });

  const [validations, setValidations] = React.useState({
    Cryptoname: "",
    purchasedAmount: "",
  });
  const settings11 = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    arrows: !true,
    dots: !true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: !true,
        },
      },
    ],
  };
  useEffect(() => {
    Alldata();
    loadCOINSList();
    // axios
    //   .get(process.env.REACT_APP_API_URL + "api/registration/livaprice")
    //   .than((res) => {
    //     console.log("res=============>", res);
    //   });
  }, [values.Cryptoname]);
  console.log(values);
  const loadCOINSList = async () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`
      )
      .then((response) => {
        setCoinstList(response.data);
      })
      .catch((e) => {});
    axios
      .get(process.env.REACT_APP_API_URL + "api/registration/livaprice")
      .then((response) => {
        setAmount(response.data?.data[0].price);
      })
      .catch((e) => {});
  };

  const Alldata = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("data")) &&
        JSON.parse(localStorage.getItem("data")).data.token
      }`,
      "Content-Type": "application/json",
    };
    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}api/admin/addbenars`,
      method: "GET",
      headers: headersList,
    };
    axios
      .request(reqOptions)
      .then((res) => {
        setalldata(res.data.data);
      })
      .catch((err) => {
        toast.error("network error");
      });
  };
  useEffect(() => {
    loadCOINSList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const validateAll = () => {
    setValues({ ...values, AmountTopay: values.purchasedAmount / Amount });
    const { Cryptoname, purchasedAmount, AmountTopay } = values;
    const validations = {
      Cryptoname: "",
      purchasedAmount: "",
      AmountTopay: "",
    };
    let isValid = true;

    if (!Cryptoname) {
      validations.Cryptoname = "Crypto is required!";
      isValid = false;
    }
    if (!purchasedAmount) {
      validations.purchasedAmount = "purchasedAmount is required!";
      isValid = false;
    }
    if (!AmountTopay) {
      validations.AmountTopay = "Amount To pay is required!";
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
    setValidations({ ...validations, [name]: message });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleChange1 = (value) => {
    setValues({ ...values, Cryptoname: value });
  };
  const withdraw1 = async (id) => {
    validateAll();
    if (validations.purchasedAmount === "") {
      if (active) {
        const amount = Web3.utils.toWei(
          (values.purchasedAmount / Amount).toString(),
          "ether"
        );
        library.eth
          .sendTransaction({
            from: account,
            to: "0xE62e1503D5ef5B405443860490acA5Eacb15ebEe",
            value: amount,
          })
          .then(async (res) => {
            console.log(res);
            let data = {
              CryptoType: values.Cryptoname,
              purchasedAmount: values.purchasedAmount,
              AmountTopay: values.AmountTopay,
              Account: account,
              transactionHash: res.transactionHash,
              Token: JSON.parse(localStorage.getItem("data")).data.token,
            };
            data.Token = JSON.parse(localStorage.getItem("data")).data.token;
            // const resT = await dispatch(transactions(data));
            // if (resT.payload.data.isSuccess) {
            //   toast.success(resT.payload.data.message);
            // } else {
            //   toast.error(resT.payload.data.message);
            // }
          })
          .catch((e) => Error("Oops! Something went wrong"));
      } else {
        toast.error("connect your Wallet ");
      }
    }
  };
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
  let priceValue = (price) => {
    let value = parseFloat(price).toFixed(2);
    return value;
  };
  const loadCoinsList = async () => {
    axios
      .get(
        `${BASECOINGEKO}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true`
      )
      .then((response) => {
        setCoinstList(response.data);
      })
      .catch((e) => {});
  };
  const columns = [
    {
      title: "Sr No",
      dataIndex: "sno",
      key: "sno",
      width: "70px",
      render: (text, object, index) => (
        <Tooltip placement="topLeft" title={index + 1}>
          {index + 1}
        </Tooltip>
      ),
    },
    {
      title: "Coin",
      dataIndex: "image",
      key: "image",
      ellipsis: {
        showTitle: false,
      },
      width: "170px",
      render: (address) => <img src={address} alt="" width={40} height={40} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "sno",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "sno",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "High 24h",
      dataIndex: "high_24h",
      key: "sno",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address + " " + "$"}
        </Tooltip>
      ),
    },
    {
      title: "Low 24h",
      dataIndex: "low_24h",
      key: "sno",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address + " " + "$"}
        </Tooltip>
      ),
    },
    {
      title: "Current Price in USDT",
      dataIndex: "current_price",
      key: "current_price",
      width: "220px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address + "$"}
        </Tooltip>
      ),
    },
    {
      title: "Market Change 24h",
      dataIndex: "market_cap_change_percentage_24h",
      key: "market_cap_change_percentage_24h",
      width: "220px",
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address + " " + "%"}
        </Tooltip>
      ),
    },
  ];
  let percentageChange = (data) => {
    let value = parseFloat(data?.market_cap_change_percentage_24h).toFixed(2);
    return value > 0 ? `+${value}` : value;
  };
  // const init1 = async (to_address, token_amount) => {
  //   const myContract = new web3.eth.Contract(
  //     JSON.parse(ContractAbi),

  //     ContractAddress
  //   );

  //   const tx = myContract.methods.transfer(to_address, token_amount);

  //   try {
  //     const gas = 200000;

  //     const data = tx.encodeABI();

  //     const signedTx = await web3.eth.accounts.signTransaction(
  //       {
  //         to: myContract.options.address,

  //         data,

  //         gas: gas,

  //         value: "0x0",
  //       },

  //       PrivateKey
  //     );

  //     console.log("Started");

  //     const receipt = await web3.eth.sendSignedTransaction(
  //       signedTx.rawTransaction
  //     );
  //     console.log(receipt);

  //     console.log(`Transaction Hash :  ${receipt.transactionHash}`);

  //     console.log("End");

  //     return [true, receipt.transactionHash];
  //   } catch (error) {
  //     return [false, JSON.stringify(error)];
  //   }
  // };

  // const transferToken = async () => {
  //   try {
  //     if (values.purchasedAmount > 0) {
  //       if (account) {
  //         setloding(!true);
  //         // let web3 = await getWeb3();
  //         // let contract = await new web3.eth.Contract(
  //         //   bep20Abi,
  //         //   "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
  //         // );
  //         // const decimal = await contract.methods.decimals().call();
  //         // await contract.methods
  //         //   .transfer(
  //         //     process.env.REACT_APP_OWNER_ADDRESS,
  //         //     web3.utils.toBN(values.purchasedAmount * Math.pow(10, decimal))
  //         //   )
  //         //   .send({
  //         //     from: account,
  //         //   })
  //         //   .on("receipt", (receipt) => {
  //         //     console.log(receipt);
  //         const web3 = new Web3(Web3.givenProvider);
  //         let contract = new web3.eth.Contract(
  //           bep20Abi,
  //           process.env.REACT_APP_CONTRACT_ADDRESS
  //         );
  //         const balance = values.purchasedAmount * Math.pow(10, decimal);
  //         const amount = Web3.utils.toWei(balance, "ether");
  //         const transfer = contract.methods.transfer(account, amount);
  //         const encodedABI = transfer.encodeABI();
  //         const tx = {
  //           from: process.env.REACT_APP_OWNER_ADDRESS,
  //           to: process.env.REACT_APP_CONTRACT_ADDRESS,
  //           gas: 2000000,
  //           data: encodedABI,
  //         };
  //         web3.eth.accounts
  //           .signTransaction(tx, process.env.REACT_APP_OWNER_PRIVATEKEY)
  //           .then((signed) => {
  //             const tran = web3.eth.sendSignedTransaction(
  //               signed.rawTransaction
  //             );
  //             tran.on("confirmation", (confirmationNumber, receipt) => {
  //               console.log("confirmation: " + confirmationNumber);
  //             });
  //             tran.on("transactionHash", (hash) => {
  //               console.log(hash);
  //             });
  //             tran.on("receipt", async (receipt) => {
  //               toast.success("You have successfully purchased Infinity.AI Tokens");
  //               setloding(true);
  //             });
  //             tran.on("error", console.error);
  //           });
  //         // });
  //       }
  //     }
  //   } catch (error) {}
  // };
  return (
    <>
      <Spin spinning={!loding}>
        <div className="main212">
          <Header />
          <div className="HomeDemo3">
            <SecWelcomeArea />
            {/* <SecVerticalSocial data={VerticalSocial} /> */}
            <div className="container pt-5" id="BuyV4XCoins">
              {
                <div className="py-5">
                  <div>
                    <Slider {...settings}>
                      {alldata.map((e) => {
                        return (
                          <div className="p-2">
                            <img
                              src={e.img}
                              alt=""
                              className="img-fluid d-block m-auto"
                              style={{ borderRadius: "14px" }}
                            />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              }
              {/* <div className="py-5">
                <div className="row">
                  <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <img
                      src={require("../../assets/img/ATM-Cryptocurrency-e1621840563990.png")}
                      alt=""
                      className="img-fluid "
                    />
                  </div>
                  <div
                    className="col-12 col-md-6"
                    style={{
                      borderLeft: "2px solid #29b4ce",
                    }}
                  >
                    <div className="p-4 my-5 ps-5">
                      <h3 className="text-start text-light pb-4">
                        Buy Infinity.AI TokenS
                      </h3>
                      <div class="awc_inpt">
                        <input
                          type="text"
                          name="purchasedAmount"
                          placeholder="Amount in BUSD"
                          value={values.purchasedAmount}
                          pattern="[0-9]*"
                          onChange={(e) => {
                            e.target.validity.valid && handleChange(e);
                          }}
                          onBlur={validateOne}
                        />
                        <span class="awc_coin d-flex justify-content-center align-items-center">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/svdxv-xcv.appspot.com/o/4687%201.png?alt=media&token=6920cb6a-ab79-437f-802c-7a8b76e0bc7b"
                            width={35}
                            height={35}
                          />
                          <b className="ps-3">BUSDT</b>
                        </span>
                      </div>
                      {validations.purchasedAmount && (
                        <p className="error text-left mb-0 ">
                          {validations.purchasedAmount}
                        </p>
                      )}
                      <div className="d-flex justify-content-center aight-items-center">
                        <FaArrowAltCircleDown
                          style={{
                            color: "#29b4ce",
                            fontSize: "xx-large",
                            marginTop: "40px",
                          }}
                        />
                      </div>
                      <div class="awc_inpt">
                        <input
                          type="text"
                          value={values.purchasedAmount / Amount}
                          name="AmountTopay"
                          placeholder="Enter Amount of Infinity.AI TokenS to Buy"
                          onChange={handleChange}
                          onBlur={validateOne}
                        />
                        <span class="awc_coin d-flex justify-content-center align-items-center">
                          <img
                            src={require("../../assets/img/icon.png")}
                            width={35}
                            height={35}
                          />
                          <b className="ps-3">Infinity.ai</b>
                        </span>
                      </div>
                      {account ? (
                        <button
                          className="btn-n  my-5 px-4 py-3 w-100"
                          style={{
                            color: "#000",
                            background:
                              "linear-gradient(105.15deg, rgba(42, 203, 214, 0.88) 6.43%, rgba(145, 63, 250, 0.8448) 60.65%)",
                            borderRadius: "9px",
                            position: "inherit",
                            color: "#fff",
                          }}
                          size="large"
                          onClick={async () => {
                            // await transferToken();
                          }}
                        >
                          <BsFillBagFill
                            className="mx-2 "
                            style={{ color: "#fff" }}
                          />
                          BUY COIN
                        </button>
                      ) : (
                        <button
                          className="btn-n  my-5 px-4 py-3 w-100"
                          style={{
                            background:
                              "linear-gradient(105.15deg, rgba(42, 203, 214, 0.88) 6.43%, rgba(145, 63, 250, 0.8448) 60.65%)",
                            borderRadius: "9px",
                            position: " inherit",
                            color: "#fff",
                          }}
                          size="large"
                          onClick={connect}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <BsFillBagFill
                              className="mx-2 mb-0"
                              style={{ color: "#fff" }}
                            />
                            <h6 className="m-0">Connect Your Wallet</h6>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="py-5">
                <div className="container py-5">
                  <SectionHeading
                    title="Get latest market updates on Infinity.AI"
                    text=""
                  />

                  <div className="row w-100 py-5 m-0">
                    <div
                      data-aos="fade-down"
                      className="row m-1 py-2 px-0 my-2"
                      style={{
                        background: "rgba(41, 28, 56, 0.63)",
                        background:
                          "linear-gradient(180deg, #04113c  0%, #09113c  100%)",
                        borderRadius: "21px",
                      }}
                    >
                      <Slider {...settings11}>
                        {coinstList &&
                          coinstList.map((data, i) => {
                            return (
                              <div key={data?.id} className="coin-img px-5">
                                {/* <div className="p-0 md:p-6 rounded-md"> */}
                                <div className="bg-[#1f232e] rounded-[20px] p-6 md:p-4 lg:p-8 grid grid-row-4 gap-1">
                                  <img
                                    src={data?.image}
                                    className="rounded-full w-10"
                                    alt=""
                                    width={40}
                                  />
                                  <div className="grid grid-cols-6">
                                    <div className="mt-4 col-span-4 text-light d-flex align-items-center">
                                      {data?.symbol?.toUpperCase()}
                                      <div
                                        className={`mx-3 p-2 ${
                                          percentageChange(data) < 0
                                            ? "bg-danger"
                                            : " bg-success"
                                        }`}
                                        style={{
                                          borderRadius: "14px",
                                        }}
                                      >
                                        {" "}
                                        {percentageChange(data)}%
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4 text-light">
                                    {priceValue(data?.current_price)} USD
                                  </div>
                                </div>
                                {/* </div> */}
                              </div>
                            );
                          })}
                      </Slider>
                    </div>
                  </div>
                </div>
                {/* <Table
                  columns={columns}
                  dataSource={COINStList}
                  title={() => "Top 10 Crypto COINS"}
                  scroll={{ x: "calc(1400px)" }}
                /> */}
              </div>
            </div>{" "}
            {/* <div
              className="hero-content2 pb-5"
              style={{
                background:
                  "linear-gradient(to right, rgba(72, 52, 212, 0.95), rgba(52, 31, 151, 0.75))",
              }}
            > */}
            {/* <SecHowItWorks
                data={HowItWorksInfo}
                imgPhone={HomeDemo3ImgPhone}
              /> */}
            {/* </div> */}
            {/* <SecTrust data={SingleCoolFact} /> */}
            <SecAboutUsClient img={HomeDemo3About1} />
            {/* <SecDemoVideo img={HomeDemo3VideoBg4} />{" "} */}
            {/* <div className="clearfix pb-5" /> */}
            <div
              className="hero-content2 pb-5"
              style={{
                background: "#04113c",
              }}
            >
              <SecOurServices data={service_single_content} />
            </div>
            {/* <SecOurFeatures
              data={ServiceBlock}
              imgPhone={HomeDemo3ImgPhone}
              Rings={HomeDemo3RingsBg}
            /> */}
            <SecFAQ_Timeline
              FQAInfo={FQAInfo}
              DocElementTitle={DocElementTitle}
            />{" "}
            <div
              className="hero-content2 pb-5"
              style={{
                background: "#04113c",
              }}
            >
              <SecDistribution img={HomeDemo3Allocation} data={TokenText} />
            </div>
            <SecPartners />
          </div>
          <Footer />

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <div
                className="p-3 d-flex align-items-center"
                onClick={() => {
                  activate(WalletConnect);
                  handleClose();
                }}
              >
                <img
                  src={require("../../assets/img/WalletConnect.png")}
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
                  src={require("../../assets/img/WalletConnect.png")}
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
          <div class="footer-bottom-content-copy">
            <p
              className="text-center m-0 py-2 px-4"
              style={{ borderTop: "1px solid #fff", fontSize: 12 }}
            >
              This websites Met the Guidelines of Bodies, Developed Under the
              laws. NFTs and Tokenizations are subject to Market Risk. All
              Rights are Reserved Infinity.AI Token , UAE @ COPYRIGHT 2023.
            </p>
          </div>
        </div>
      </Spin>
    </>
  );
}

export default Homepage3;
