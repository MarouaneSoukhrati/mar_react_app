import "../ComponentStyle/Abody.css";

import marouaneLogo from "../Logos/marouane-logo.svg";
import FrFlagLogo from "../Logos/FrFlag.svg";

let aboutPara = ["I am interested in understanding and articulating everything via code."];
aboutPara.push(" Whatever be the problem, if it involves challenges in formally representing it and its associated metrics, count me in.");
aboutPara.push(" I also like solving the actual problem through programming and elegant design (Trust me its beautiful when done right)."); 
aboutPara.push(" In short, I like exploring ways to enhance computers so that they can better serve human creativity and prosperity.");       
aboutPara.push(" I'm also an engineering student at ENSISA who is currently looking for a co-op position");
aboutPara.push(" I'm from Tangier but I have setteled in Mulhouse for the moment.");

export default function Abody() {
  
  const experienceList = [1,2,3,4].map(e => { 
    return <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", width:"120px"}}><img src={FrFlagLogo} style={{width:"20px"}} alt="img-cv"/><span>Design</span><span>Code</span></div>
            <h1>Senior</h1>
            <p>In short, I like exploring ways to enhance computers so that they can better serve human creativity and prosperity</p>
          </div>})

  const skillsListLeft = [1,2,3,4].map(e => { 
    return <li>Code</li>})      
  
  const skillsListRight = [1,2,3,4].map(e => { 
    return <li>Design</li>})     

  const educationList = [1,2,3,4].map(e => { 
    return <div>
              <div style={{display: "flex", flexDirection: "row", justifyContent:"space-between", width:"120px"}}><span>2021</span><span>Present</span></div>
              <h2>MIT - Massachusetts Institute of Technology</h2>
              <h3>Engineering</h3>
           </div>})      

  return (
    <div className="App-body">
      <div className="body-left">
        <img src={marouaneLogo} alt="img-cv"/>
        <h1>Marouane Soukhrati</h1>
        <h2>Computer Science Student</h2>
        <div><img src={FrFlagLogo} style={{width:"20px"}} alt="img-cv"/> soukhratimarouane@gmail.com</div>
        <div><img src={FrFlagLogo} style={{width:"20px"}} alt="img-cv"/> +33667569678</div>
        <h1>About Me</h1>
        <p style={{textAlign:"center", width:"700px"}}>{aboutPara}</p>
        <h1>Skills</h1>
        <div className="skills-area">
          <ul>
            {skillsListLeft}
          </ul>
          <ul>
            {skillsListRight}
          </ul>
        </div>
      </div>
      <div className="body-right">
        <h1>Past Experience</h1>
        {experienceList}
        <h1>Education</h1>
        {educationList}
      </div>
    </div>
  );
}
