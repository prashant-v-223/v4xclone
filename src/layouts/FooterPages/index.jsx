import { FooterLogo, FooterPattern, FooterBg1 } from "../../utils/allImgs";

import "./footer.css";

import SecContact from "./SecContact";
import SecIco from "./SecIco";
import SecContent from "./SecContent";
import { useState } from "react";

const Footer = () => {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [Description, setDescription] = useState("");
  const [Timetocontact, setTimetocontact] = useState("");
  const [budget, setbudget] = useState("");

  function sendEmail() {
    var recipient = "infinityai759@gmail.com";
    var subject = "Talk to us";
    var body = `name : ${name}, number: ${number},Description: ${Description}, Timetocontact:${Timetocontact},budget:${budget}`;
    console.log(body);

    var mailtoLink =
      "mailto:" +
      recipient +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailtoLink;
  }
  return (
    <footer className="footer-area bg-img">
      {/* <SecContact /> */}

      <div className="" id="contact">
        <div className="Contact_us">
          <div className="container py-5">
            <div className="contact_us_title mt-4">
              <h3 className="py-5">
                <span className="call_icon">
                  <i
                    className="fa fa-phone"
                    aria-hidden="true"
                    style={{ fontSize: "50px" }}
                  ></i>{" "}
                </span>
                Talk to us
              </h3>
              <p
                style={{
                  color: "rgb(1, 231, 254)",
                }}
              >
                Leave your details below and we’ll contact you to discuss
                purchasing Infinity AI .
              </p>
            </div>

            <div className="contact_form">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-4">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>

                <div className="col-lg-4 col-md-4">
                  <input
                    type="text"
                    placeholder="Mobile number"
                    onChange={(e) => {
                      setnumber(e.target.value);
                    }}
                  />
                </div>

                <div className="col-lg-4 col-md-4">
                  <input
                    type="text"
                    placeholder="Description / suggestion"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>

                <div className="col-lg-4 col-md-4">
                  <select
                    onChange={(e) => {
                      setTimetocontact(e.target.value);
                    }}
                  >
                    <option>Best Time to contact</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>

                <div className="col-lg-4 col-md-4">
                  <select
                    onChange={(e) => {
                      setbudget(e.target.value);
                    }}
                  >
                    <option>Investment budget</option>
                    <option> 1000IAT-5000IAT</option>
                    <option> 5000IAT-10000IAT</option>
                    <option> 10000IAT-25000IAT</option>
                    <option> 25000IAT-50000IAT</option>
                    <option> 50000IAT+</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck"
                  />
                  <label className="custom-control-label" for="customCheck">
                    By submitting this form,I agree to the terms and privacy of
                    Infinity AI
                  </label>
                </div>
              </div>

              <div className="submit_btn_contact">
                <button
                  onClick={() => {
                    sendEmail();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer-content-area "
        style={{
          background: "#030c2a",
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
