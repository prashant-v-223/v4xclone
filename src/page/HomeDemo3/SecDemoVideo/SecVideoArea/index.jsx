const SecVideoArea = ({ img }) => {
  return (
    <div
      className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-12"
      data-aos="fade-up"
    >
      <div className="welcome-video-area p-0">
        <div className="welcome-thumb p-0" style={{ overflow: "hidden" }}>
          <video
            controls
            style={{
              width: " 100%",
              height: "fit-content",
              padding: "10px",
              borderRadius: "27px",
            }}
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/svdxv-xcv.appspot.com/o/videoplayback%20(1).mp4?alt=media&token=0fd7ba33-52bb-4b7d-b922-5fa7dac59205"
              type="video/mp4"
            />
            <source
              src="https://firebasestorage.googleapis.com/v0/b/svdxv-xcv.appspot.com/o/videoplayback%20(1).mp4?alt=media&token=0fd7ba33-52bb-4b7d-b922-5fa7dac59205"
              type="video/ogg"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default SecVideoArea;
