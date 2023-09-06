import SectionHeading from "../../../components/SectionHeading";
import SingleFAQArea from "./SingleFAQArea";
import IcoCounter from "./IcoCounter";
import IcoDocs from "./IcoDocs";
import "../../../assets/css/Demo3/FAQ3.scss";

const SecFAQ_Timeline = ({ FQAInfo, DocElementTitle }) => {
  return (
    <section className="faq-timeline-area section-padding-100" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-12  col-md-12 mb-5">
            <SectionHeading
              title="Frequently Asked Questions"
              text="If you have any questions, here are some of our Frequently Asked Questions and Answers to solve your queries."
            />

            <div className="dream-faq-area">
              <div
                className="panel-group"
                id="accordionFourLeft"
                data-aos="fade-up"
              >
                <div class="accordion" id="accordionExample">
               
                  <div class="accordion-item py-3">
                    <h2 class="accordion-header" id="headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        WHO MANAGES THE PLATFORM?
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <strong>Infinity AI Token</strong> IS TOTALLY DECENTRALIZED AND
                        WORK THROUGH THE SMART CONTRACT WHERE NO INDIVIDUAL OR
                        GROUP OR ANY ADMIN INVOLVED. THIS PLATFORM IS HIGHLY
                        SECURE BECAUSE IT IS MADE THROUGH THE PROCESS OF
                        CRYPTOGRAPHY
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item py-3">
                    <h2 class="accordion-header" id="headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        DO WE HAVE WHITE PAPER?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        {" "}
                        YES, WE DO HAVE A WHITEPAPER WHERE ANYONE CAN HAVE A
                        BRIEF IDEA ABOUT<strong>Infinity AI Token</strong> THE{" "}
                        <strong>Infinity AI Token</strong> WHITEPAPER IS EXPLAINED IN
                        DETAIL ABOUT THE WHOLE PROJECT AS WELL AS THE UPCOMING
                        FEATURES AND PROVISIONS.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item py-3">
                    <h2 class="accordion-header" id="headingThree1">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree1"
                        aria-expanded="false"
                        aria-controls="collapseThree1"
                      >
                        DO WE HAVE STACKING PROGRAM?
                      </button>
                    </h2>
                    <div
                      id="collapseThree1"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingThree1"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        YES, WE DO HAVE STAKING PROGRAM WHERE A USER GETS RETURN
                        DAILY AND ITS START WITH REASONABLE AMOUNT.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item py-3">
                    <h2 class="accordion-header" id="headingThree122">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree122"
                        aria-expanded="false"
                        aria-controls="collapseThree1"
                      >
                        DO WE HAVE REFERRAL PROGRAM?
                      </button>
                    </h2>
                    <div
                      id="collapseThree122"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingThree122"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        YES, WE DO HAVE A REFERRAL PROGRAM WHERE A USER CAN
                        EASILY EARN REWARD BY BUILDING THE Infinity AI Token COMMUNITY.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-12 col-lg-5 offset-lg-0 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mt-5">

                    <IcoCounter />

                    <IcoDocs data={DocElementTitle} />
                    
                </div> */}
        </div>
      </div>
    </section>
  );
};

export default SecFAQ_Timeline;
