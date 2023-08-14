import { useNavigate } from "react-router-dom";
const Span = () => <span></span>;

const SecWhoWeContant = () => {
  const navigation = useNavigate();
  return (
    <div className="col-12 col-lg-6 mt-5 pt-5">
      <div className="who-we-contant">
        <div className="dream-dots" data-aos="fade-up">
          {Array(7) 
            .fill()
            .map((key) => (
              <Span />
            ))}
        </div>
        <h4 data-aos="fade-up m-0">What is the vision of Infinity.AI?</h4>{" "}
        <p data-aos="fade-up m-0" style={{color:"#01E7FE"}}>
          Infinity.AI Coin has come in the market, with the vision to Create a
          Decentralised platform using
        </p>
        <div className="ps-4">
          <ul>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">Infinity.AI blockchain Development</p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">Infinity.AI Centralised Exchange Development</p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">
                Infinity.AI Coin Play to earn & Utility Application
              </p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">Infinity.AI Coin Entertainment in Metaverse</p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">Infinity.AI hotel chain Industry</p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">
                Infinity.AI Coin Own Decentralised Wallet to make Crypto Transaction
                More fast, secure & cheaper.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecWhoWeContant;
