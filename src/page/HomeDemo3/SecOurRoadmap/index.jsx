import SectionHeading from "../../../components/SectionHeading";
import Timeline from "./Timeline";
import "../../../assets/css/Demo3/roadmap3.css";

const SecOurRoadmap = ({ data, img }) => {
  return (
    <div className="aaa">
      <section
        className="roadmap section-padding-100"
        style={{
          background: `url(${img}) center center / cover no-repeat`,
          backgroundSize: "cover",
          paddingTop: "100px",
          paddingBottom: "172px",
          margin: "0px",
          width: "100vw !important",
          left: "0px !important",
          top: "0px !important",
        }}
        id="roadmap"
      >
        <SectionHeading
          title="Infinity AI Project Roadmap"
          text="Infinity AI Has planned its roadmap till the year March 2025. Users will get multiple platforms to invest, trade and earn using Infinity AI Token."
        />
        <div className="container-fluid">
          <div className="row">
            <div className="section_5-content">
              <div className="section_5-slider-trumb" />
              <div id="section_5-slider-circle">
                {data &&
                  data.map((item, key) => (
                    <Timeline
                      key={key}
                      left={item.left}
                      ClassName={item.ClassName}
                      date={item.date}
                      IsSpan={item.IsSpan}
                      TextSpan={item.TextSpan}
                      IsTowLi={item.IsTowLi}
                      TextTowLi1={item.TextTowLi1}
                      TextTowLi2={item.TextTowLi2}
                      IsThreeLi={item.IsThreeLi}
                      TextThreeLi1={item.TextThreeLi1}
                      TextThreeLi2={item.TextThreeLi2}
                      TextThreeLi3={item.TextThreeLi3}
                      IsFourLi={item.IsFourLi}
                      TextFourLi1={item.TextFourLi1}
                      TextFourLi2={item.TextFourLi2}
                      TextFourLi3={item.TextFourLi3}
                      TextFourLi4={item.TextFourLi4}
                      TextFourLi5={item.TextFourLi5}
                      TextFourLi6={item.TextFourLi6}
                      TextFourLi7={item.TextFourLi7}
                      img={item.img}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecOurRoadmap;
