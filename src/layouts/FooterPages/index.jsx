import { FooterLogo, FooterPattern, FooterBg1 } from "../../utils/allImgs";

import "./footer.css";

import SecContact from "./SecContact";
import SecIco from "./SecIco";
import SecContent from "./SecContent";

const Footer = () => {
  return (
    <footer className="footer-area bg-img">
      <SecContact />
      <div
        className="footer-content-area "
        style={{
          background: "#192057",
        }}
      >
        <div className="container">
          <div className="row align-items-end">
            <SecIco logo={FooterLogo} />
            <SecContent />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
