import SectionHeading from "../../../components/SectionHeading";
import "../../../assets/css/Demo3/features3.css";

const SecHowItWorks = ({ data, imgPhone }) => {
  console.log(data);
  return (
    <section className="features section-padding-100-0">
      <SectionHeading
        title="Features of Infinity AI Platform"
        text="Infinity AI Offers number of benifits to their users and investors, in terms of rewards, returns and security, along with daily withdrawals."
      />
      <div className="container">
        <div className="row">
          <div className="service-img-wrapper how col-lg-6 col-md-12 col-sm-12">
            <div className="image-box pe-0 pe-lg-5">
              <img
                src={imgPhone}
                className="center-block img-responsive phone-img  me-0 me-lg-5 "
                alt=""
              />
            </div>
          </div>
          <div className="services-column col-lg-6 offset-lg-0 col-md-10 offset-md-1 col-xs-10 offset-xs-1">
            {/*Services Block Four*/}
            {data &&
              data.map((item, key) => (
                <div className="services-block-four how" key={key}>
                  <div className="inner-box d-flex p-0 m-0">
                    <div className="pe-4">
                      <img src={item.img} alt="" className="img-fluid" width={140} height={140} />
                    </div>
                    <div className="">
                      <h3>
                        <a href="#">{item.title}</a>
                      </h3>
                      <div className="text">{item.subtita}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecHowItWorks;
