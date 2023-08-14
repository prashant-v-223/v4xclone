const ServiceBlock = ({ classIco, img, title, subtitle = "" }) => {
  return (
    <div className="services-block-four">
      <div className="inner-box" style={{ position: "relative" }}>
        <div className="icon-box">
          <img
            src={img}
            alt=""
            className="img-fluid m-0  mb-3"
            width={50}
            height={50}
            style={{ position: "absolute", zIndex: 99, top: "25%", left: "25%" }}
          />
          {/* <span className={classIco}></span> */}
        </div>
        <h3>
          <a href="#">{title}</a>
        </h3>
        <div className="text">{subtitle}</div>
      </div>
    </div>
  );
};

export default ServiceBlock;
