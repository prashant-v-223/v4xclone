import CountUp from "react-countup";

const SecWelcomeMeter = ({ img }) => {
  return (
    <div className="col-12 col-lg-6" data-aos="fade-up">
      <div className="welcome-meter">
        <img
          src={
            "https://themes.templatescoder.com/cryptoz/wp/demo-01/wp-content/uploads/2023/02/about-img.svg"
          }
          className="img-responsive center-block "
          alt=""
        />
      </div>
    </div>
  );
};

export default SecWelcomeMeter;
