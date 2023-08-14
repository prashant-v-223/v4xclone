import SectionHeading from "../../../components/SectionHeading";
import ServiceBlock from "./ServiceBlock";

const SecOurFeatures = ({ data, imgPhone, Rings }) => {
  return (
    <section className="features section-padding-100">
      <SectionHeading
        title="Infinity.AI Centralised Exchange"
        text="Infinity.AI Centralised Exchange is built with superfast trading matching engine, where users can trade their Infinity.AI Coins in Spot, Limit, Market, Stop-Limit features."
      />
      <div className="container-fluid">
        <div className="row">
          <div className="services-column col-lg-5 col-lg-offset-1 col-md-10 offset-md-1 col-xs-10 offset-xs-1">
            {data &&
              data.map((item, key) => (
                <ServiceBlock
                  key={key}
                  classIco={item.classIco}
                  title={item.title}
                  subtita={item.subtita}
                  img={item.img}
                  subtitle={item.subtitle}
                />
              ))}
          </div>
          <div
            className="service-img-wrapper col-lg-6 col-md-12 "
            style={{ minHeight: "233px" }}
          >
            <div className="image-box">
              <img
                src={require("../../../assets/img/exchngimg.PNG")}
                className="center-block img-responsive "
                alt=""
                style={{ maxWidth: "600px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecOurFeatures;
