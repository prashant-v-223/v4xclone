import SectionHeading from "../../../components/SectionHeading";
import TokenInfo from "./TokenInfo";

const SecDistribution = ({ img, data }) => {
  return (
    <section className="token-distribution pt-5 mt-5" id="TOKENOMICS">
      <div className="container mt-5">
        <SectionHeading
          title="Infinity AI Tokenomics"
          text="Infinity AI Tokenomics are pre-decided with the help of crypto counseller and tokenomics expert in order to maintain the stability of the Infinity AI Cryptocurrency."
        />

        <div className="col-lg-6 col-md-6 col-sm-12">
          <h2 className="text-center mb-30">Token Allocation</h2>
          <div className="token-allocation">
            <img
              src={require("../../../assets/img/token.jpeg")}
              className="center-block img-fluid py-4 mt-3"
              alt=""
            />
            
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="token-info-wapper"></div>
          <h2 className="text-center mb-30">Tokenomics Details</h2>
          {data &&
            data.map((item, key) => (
              <TokenInfo key={key} text={item.text} img={item.img} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default SecDistribution;
