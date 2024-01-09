import "../../../../assets/css/Demo3/ServiceArea3.css";
const Content = ({ img, title }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-up">
      <div className="service_single_content text-left mb-100">
        <div className="service_icon">
          <img
            src={img}
            alt=""
            width={70}
            height={70}
            className="d-block m-auto"
          />
        </div>
        <h6 className="text-center">{title}</h6>
      </div>
    </div>
  );
};

export default Content;
