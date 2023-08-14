import SectionHeading from '../../../components/SectionHeading'
import SecVideoArea from './SecVideoArea'

const SecDemoVideo = ({img}) => {

  return (
    <section className="demo-video section-before section-padding-100">
        <div className="container">
	        <SectionHeading
	            title='Watch Infinity.AI Promo Video'
	            text='Infinity.AI community is growing stronger day by day. We have more than 4000 active users on our platform who are enjoying benifits of our plans. '
	        />
            <SecVideoArea img={img} />
        </div>
    </section>
  );
}

export default SecDemoVideo;