import SectionHeading from "../../../components/SectionHeading";

const SecPartners = ({ data }) => {
  return (
    <section className="partners pt-5">
      <SectionHeading
        title="Infinity AI Partners"
        text="We have some of our faithful partners in the cryptocurrency market, who has been getting benifits of Infinity AI digital platforms and services."
      />
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/METAMASK.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/NOMICS.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/PANCAKESWAP.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/TRUST.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/UNISWAP_.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/UNISWAP.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box d-flex justify-content-center align-content-center">
              <img
                src={require("../../../assets/img/partners/WalletConnect.13798276a43e02957131.png")}
                alt=""
                className="center-bock  w-25"
              />
              <h5 className=" m-0 d-flex align-items-center text-light">
                <b>WalletConnect</b>
              </h5>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/BSCSCAN.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/cmm logo.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/COINGECKO.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/COINSTORE.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="partner-box">
              <img
                src={require("../../../assets/img/partners/DEXSCREENER.png")}
                alt=""
                className="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecPartners;
