import "../../../assets/css/Demo3/demo-video3.scss";
const Li_A = ({ nameIco, links }) => (
  <li>
    <a href={links} target="_blank">
      <i className={nameIco} aria-hidden="true"></i>
    </a>
  </li>
);

const SecVerticalSocial = ({ data }) => {
  return (
    <div className="vertical-social">
      <ul>
        {data &&
          data.map((item, key) => (
            <Li_A nameIco={item.nameIco} links={item.link} />
          ))}
      </ul>
    </div>
  );
};

export default SecVerticalSocial;
