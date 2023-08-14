const SecWelcomeMeter = ({img}) => {

  return (
    <div className="col-12 col-lg-6" data-aos="fade-up">
        <div className="welcome-meter">
            <img src={require('../../../../assets/img/icon.png')} className="center-block" alt="" width={250} />
        </div>
    </div>
  );
}

export default SecWelcomeMeter;