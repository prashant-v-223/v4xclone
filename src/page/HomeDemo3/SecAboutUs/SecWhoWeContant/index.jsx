const Span = () => <span></span>;

const SecWhoWeContant = () => {
  return (
    <div className="col-12 col-lg-6">
      <div className="who-we-contant">
        <div className="dream-dots" data-aos="fade-up">
          {Array(7)
            .fill()
            .map((key) => (
              <Span />
            ))}
        </div>
        <h4 data-aos="fade-up">What is Infinity.AI platform and what we do?</h4>
        <p data-aos="fade-up">
          Infinity.AI COIN is a WEB 3.0 platform UAE based decentralized cryptocurrency
          . Which is working on development of Infinity.AI coin blockchain,
          decentralised wallet, NFT marketplace, Gaming platform, Infinity.AI coin
          exchange, and multi utility application for instant use of Infinity.AI coin.
        </p>
        <p data-aos="fade-up">
          Infinity.AI Coin has come in the market, with the vision to Create a
          Decentralised platform using Infinity.AI blockchain Development and other
          useful Web3.0 projects.
        </p>
      </div>
    </div>
  );
};

export default SecWhoWeContant;
