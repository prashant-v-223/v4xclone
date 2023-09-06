import SectionHeading from '../../../components/SectionHeading'
import Content from './Content'

const SecOurServices = ({data}) => {

  return (
    <section className="our_services_area section-padding-100-70 clearfix" id="UpcomingProjects">
        <div className="container">
            
            <SectionHeading
                title='Infinity AI Upcoming Projects '
                text='Infinity AI has always been focusing on bringing more and more useful utilities and applications for our users. Some of our upcoming products are listed below.'
            />
                

            <div className="row">
                {data && data.map((item , key) => (
                    <Content
                        key={key}
                        img={item.img}
                        title={item.title}
                    />
                ))}
            </div>
        </div>
    </section>
  );
}

export default SecOurServices;