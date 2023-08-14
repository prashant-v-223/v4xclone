import "../../../assets/css/Demo3/welcomeArea3.scss";
import { Modal } from "react-bootstrap";
import React from "react";
import imgs from "../../../assets/img/3e623efe-4542-4228-a0a5-e48a3ab01f1c.jpg";
import { toast } from "react-toastify";
const DIV = () => <div className="dream-blip blip1"></div>;

const SecWelcomeArea = () => {
  const [modal2Open, setModal2Open] = React.useState(false);
  return (
    <section
      className="welcome_area clearfix dzsparallaxer auto-init ico fullwidth"
      data-options={{ direction: "normal" }}
      id="home"
    >
      <div className="divimage dzsparallaxer--target Home1WelcomeAreaIMG"></div>

      <div className="hero-content dark-blue">
        {Array(4)
          .fill()
          .map((item, key) => (
            <DIV />
          ))}

        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 col-lg-6 col-md-12">
              <div className="welcome-content">
                <div className="promo-section">
                  <div className="integration-link d-flex align-items-center">
                    <span className="integration-icon">
                      <img
                        src={require("../../../assets/img/icon.png")}
                        alt="logo"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span className="integration-text">
                      World's Topmost Revenue Generation Crypto Platform
                    </span>
                  </div>
                </div>
                <h1>World's Topmost Digital Cryptocurrency Infinity.AI Is here</h1>
                <p>
                  Infinity.AI is a web3 platform which is focused  Infinity.AI
                  Coin Blockchain, Decentralised Wallet, NFT Marketplace, P2E
                  Gaming, Infinity.AI Centralised Exchange & Multi-utility Applications.
                </p>
                <div className="dream-btn-group">
                  <div class="copytehcode">
                    <div class="parent">
                      <span class="tlt">Copt to Clipboard</span>
                      <div class="left">
                        0xffF17D90Fe37E9933407fD11c9a64A3dA2D69781
                      </div>
                      <div
                        class="right copy-tooltip"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "https://bscscan.com/token/0xfff17d90fe37e9933407fd11c9a64a3da2d69781"
                          );
                          toast.success("contract address copy successfully.");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#000"
                          stroke-width="2"
                          stroke-linecap="square"
                          stroke-linejoin="arcs"
                        >
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect
                            x="8"
                            y="2"
                            width="8"
                            height="4"
                            rx="1"
                            ry="1"
                          ></rect>
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* <a href="#" className="btn dream-btn mr-3">Contract</a> */}
                  <a
                    className="btn dream-btn mt-3 mx-2"
                    onClick={() => {
                      setModal2Open(!modal2Open);
                    }}
                  >
                    QR code
                  </a>
                  <a className="btn dream-btn mt-3 mx-2" href="#BuyInfinity.AICoins">
                    Buy Infinity.AI Coin
                  </a>
                  {/* {modal2Open && (
                    <div className="modal1">
                      <div
                        className="aaa"
                        onClick={() => {
                          setModal2Open(!modal2Open);
                        }}
                      >
                        X
                      </div>
                      <div className="AA">
                        <img
                          src={imgs}
                          alt=""
                          className="my-4 img-fluid"
                          style={{
                            objectFit: "contain",
                            display: "block",
                            margin: "auto",
                          }}
                        />
                      </div>
                      <div className="">
                        <button
                          className="p-4 d-block m-auto mx-4"
                          style={{
                            background:
                              "linear-gradient(105.15deg, rgba(42, 203, 214, 0.88) 6.43%, rgba(145, 63, 250, 0.8448) 60.65%)",
                            borderRadius: "10px",
                          }}
                        >
                          <p className="m-0">
                            Scan this QR to import <br /> Infinity.AI Coins to your
                            wallet
                          </p>
                        </button>
                      </div>
                    </div>
                  )}  */}
                  <Modal
                    show={modal2Open}
                    onHide={() => {
                      setModal2Open(!modal2Open);
                    }}
                    centered
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <div className="AA">
                        <img
                          src={imgs}
                          alt=""
                          className="my-4 img-fluid"
                          style={{
                            objectFit: "contain",
                            display: "block",
                            margin: "auto",
                          }}
                        />
                      </div>
                      <div className="">
                        <button
                          className="px-4 py-3 d-block m-auto mx-4"
                          style={{
                            background:
                              "linear-gradient(105.15deg, rgba(42, 203, 214, 0.88) 6.43%, rgba(145, 63, 250, 0.8448) 60.65%)",
                            borderRadius: "10px",
                            width: "250px",
                          }}
                        >
                          <p className="m-0 text-center">
                            Scan this QR to import <br /> Infinity.AI Coins to your
                            wallet
                          </p>
                        </button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-12 d-none d-lg-block ">
              {/* <div className="main-ilustration"></div> */}
              <div class="banner-img ps-4 py-5">
                <img
                  decoding="async"
                  src="https://themes.templatescoder.com/cryptoz/wp/demo-01/wp-content/uploads/2023/02/banner-img.svg"
                  title="banner-img"
                  alt="banner-img"
                  className="img-animation"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecWelcomeArea;
