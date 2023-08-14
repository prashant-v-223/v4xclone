import SectionHeading from "../../../components/SectionHeading";

const SecPartners = ({ data }) => {
  return (
    <section className="partners pt-5">
      <SectionHeading
        title="Infinity.AI Partners"
        text="We have some of our faithful partners in the cryptocurrency market, who has been getting benifits of Infinity.AI digital platforms and services."
      />
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/METAMASK.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/NOMICS.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/PANCAKESWAP.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/TRUST.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>{" "}
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/UNISWAP_.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/UNISWAP.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/WALLETCONNECT.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/BSCSCAN.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/cmm logo.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/COINGECKO.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/COINSTORE.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="partner-box">
              <img
                src={require("../../../assets/img/partners/DEXSCREENER.png")}
                alt=""
                class="center-bock  px-5 px-md-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecPartners;
