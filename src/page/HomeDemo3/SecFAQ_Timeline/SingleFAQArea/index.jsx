
const SingleFAQArea = ({text , ID}) => {

  return (
  	<>
	    <dt className="wave" data-toggle="collapse" data-target={`#${ID}`}>{text}</dt>
	    <dd data-aos="fade-up" id={ID} className="collapse">
	        <p>Infinity.AI Token is a decentralised coin developed and deployed on Binance Smart Chain Network. Smart Contract is written in solidity</p>
	    </dd>
  	</>
  );
}

export default SingleFAQArea;