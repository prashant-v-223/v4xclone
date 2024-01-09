import { useEffect } from "react";
import "./style/HomeDemo3.css";
import { Modal } from "react-bootstrap";
import { Button, Input, Select } from "antd";
import Web3 from "web3";
import { Injected, WalletConnect } from "../../Helpers/Injected";
import "../../assets/css/General.css";
import { TbArrowsLeftRight } from "react-icons/tb";
import { BsFillBagFill } from "react-icons/bs";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  VerticalSocial,
  HowItWorksInfo,
  SingleCoolFact,
  service_single_content,
  timelineInfo,
  ServiceBlock,
  SocialListIco,
  FQAInfo,
  DocElementTitle,
  TokenText,
  TeamMember,
  PartnersData,
} from "../../data/data-containers/data-HomeDemo3.js";

import {
  HomeDemo3About1,
  HomeDemo3Solution,
  HomeDemo3VideoBg4,
  HomeDemo3ImgPhone,
  HomeDemo3RingsBg,
  HomeDemo3Allocation,
  HomeDemo3BgRoadmap,
} from "../../utils/allImgs";

import { handelTitle } from "../../utils";
import Header from "../../layouts/Header";
import Footer from "../../layouts/FooterPages";
import { Spin, Table, Tooltip } from "antd";
import SecWelcomeArea from "./SecWelcomeArea";
import SecVerticalSocial from "./SecVerticalSocial";
import SecHowItWorks from "./SecHowItWorks";
import SecTrust from "./SecTrust";
import SecAboutUsClient from "./SecAboutUsClient";
import SecAboutUs from "./SecAboutUs";
import SecDemoVideo from "./SecDemoVideo";
import SecOurServices from "./SecOurServices";
import SecOurRoadmap from "./SecOurRoadmap";
import SecOurFeatures from "./SecOurFeatures";
import SecSubscribe from "./SecSubscribe";
import SecFAQ_Timeline from "./SecFAQ_Timeline";
import axios from "axios";
import SecDistribution from "./SecDistribution";
import SecTeam from "./SecTeam";
import SecPartners from "./SecPartners";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useState } from "react";
const BASECOINGEKO = "https://api.coingecko.com/api/v3";
function Rodemap() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [coinstList, setCoinstList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Amount, setAmount] = useState(0);
  const [values, setValues] = React.useState({
    Cryptoname: "BNB",
    purchasedAmount: null,
    AmountTopay: 0,
  });

  const [validations, setValidations] = React.useState({
    Cryptoname: "",
    purchasedAmount: "",
  });
  useEffect(() => {
    setAmount(values.Cryptoname === "BNB" ? 100 / 0.01 : 100 / 20);
  }, [values.Cryptoname]);
  console.log(values);
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
  useEffect(() => {
    loadCoinsList();
  }, []);

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
  ];
  return (
    <>
      <SecOurRoadmap data={timelineInfo} img={HomeDemo3BgRoadmap} />
    </>
  );
}

export default Rodemap;
