import '../../ComponentStyle/SubcomponentStyle/Path.css';

export default function Path({stopList, pathLogo, pathLogoStyle}) {       
  return (
    <div className="path-wrapper">
      <div className="path-img">
        <img className={pathLogoStyle} src={pathLogo} alt="path"/>
        {stopList}
      </div>
    </div>
  );
}