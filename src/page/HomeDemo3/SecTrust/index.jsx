import SectionHeading from '../../../components/SectionHeading'
import SecSingleCoolFact from './SecSingleCoolFact'
import "../../../assets/css/Demo3/trust-section3.scss";

const SecTrust = ({data}) => {

  return (
    <section className="trust-section section-padding-100">

        <SectionHeading
            title='Infinity AI Is certified and Audited'
            text='Smart contracts and codes on which Infinity AI platform runs are completely secure and audited. Smart Contracts are audited by Techrate.'
        />

        <div className="container">
            <div className="row">
                <SecSingleCoolFact data={data}/>
            </div>
        </div>
    </section>
  );
}

export default SecTrust;