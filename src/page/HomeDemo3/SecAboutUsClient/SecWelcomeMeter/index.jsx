import CountUp from "react-countup";

const SecWelcomeMeter = ({ img }) => {
  return (
    <div className="col-12 col-lg-6" data-aos="fade-up">
      <div className="welcome-meter">
        <img
          src={require("../../../../assets/img/Bitcoin-Security-e1621840459196.png")}
          className="img-responsive center-block "
          alt=""
        />
      </div>
    </div>
  );
};

export default SecWelcomeMeter;
