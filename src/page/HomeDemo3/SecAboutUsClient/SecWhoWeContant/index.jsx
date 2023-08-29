import { useNavigate } from "react-router-dom";
const Span = () => <span></span>;

const SecWhoWeContant = () => {
  const navigation = useNavigate();
  return (
    <div className="col-12 col-lg-6">
      <div className="who-we-contant">
        <div className="dream-dots" data-aos="fade-up">
          {Array(7)
            .fill()
            .map((key) => (
              <Span />
            ))}
        </div>
        <p data-aos="fade-up m-0" style={{ color: "#01E7FE" }}>
          WHY CHOOSE US
        </p>
        <h1 data-aos="fade-up m-0 pb-4" className="text-light">
          Secure and <br /> profitable.
        </h1>{" "}
        <div className="ps-4">
          <ul>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">Infinity.AI is  a Secure System</p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">
                Infinity.AI provide 24/7 Support
              </p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">
                Infinity.AI Token Play to earn & Utility Application
              </p>
            </li>
            <li
              style={{
                listStyle: "inherit !important",
                color: "#fff !important",
              }}
            >
              <p data-aos="fade-up m-0">
                Infinity.AI Token Entertainment in Metaverse
              </p>
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
                Infinity.AI Token Own Decentralised Wallet to make Crypto
                Transaction More fast, secure & cheaper.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecWhoWeContant;
