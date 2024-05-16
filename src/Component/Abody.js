import "../ComponentStyle/Abody.css";

import marouaneLogo from "../Logos/marouane-logo.svg";
import gmailLogo from "../Logos/gmailLogo.svg";
import phoneLogo from "../Logos/phoneLogo.svg";
import mbpLogo from "../Logos/mbpLogo.svg";
import daherLogo from "../Logos/daherLogo.svg";
import freelanceLogo from "../Logos/freelanceLogo.svg";
import uhaLogo from "../Logos/uhaLogo.svg";

let aboutPara = [
  "I am interested in understanding and articulating everything via code.",
];
aboutPara.push(
  " Whatever be the problem, if it involves challenges in formally representing it and its associated metrics, count me in.",
);
aboutPara.push(
  " I also like solving the actual problem through programming and elegant design (Trust me its beautiful when done right).",
);
aboutPara.push(
  " In short, I like exploring ways to enhance computers so that they can better serve human creativity and prosperity.",
);
aboutPara.push(
  " I'm also an engineering student at ENSISA who is currently looking for a co-op position",
);
aboutPara.push(
  " I'm from Tangier but I have setteled in Mulhouse for the moment.",
);

let ExpList = [
  {
    corp: "Mécanique Baumoise de Précision",
    logo: mbpLogo,
    date: "2020-2022",
    title: "Software Engineer",
    job: "Responsible for developing a user-friendly reporting application to deal with 3D reports for an optimised usage of in-house metrology software.",
  },
  {
    corp: "Daher Aerospace",
    logo: daherLogo,
    date: "2019",
    title: "Intern",
    job: "Discovery Internship",
  },
  {
    corp: "Freelance",
    logo: freelanceLogo,
    date: "2017",
    title: "Freelance Tutor",
    job: "Mathematics tutoring",
  },
];

let EduList = [
  {
    school: "École nationale supérieure d'ingénieurs Sud-Alsace (ENSISA)",
    loc: "Mulhouse",
    date: "2023-2027",
    description: "Computer Science",
  },
  {
    school: "Ecole Nationale Supérieure d’Electricité et de Mécanique (ENSEM)",
    loc: "Nancy",
    date: "2020-2022",
    description: "Energy systems engineering",
  },
  {
    school: "ENSEIRB-MATMECA",
    loc: "Bordeaux",
    date: "2018-2019",
    description: "Software Engineer",
  },
  {
    school: "CPGE Saint-Exupéry",
    loc: "Mantes-La-Jolie",
    date: "2017-2018",
    description:
      "Undergraduate studies to prepare for competitive entry exams to engineering schools",
  },
];

const experienceList = ExpList.map((e) => {
  return (
    <>
      <h3 className="Exp-List">
        <img
          src={e.logo}
          style={{ width: "40px", margin: "0px 10px 0px 0px" }}
          alt="img-cv"
        />{" "}
        {e.corp + " - "} {e.date}
      </h3>
      <h5>{e.title}</h5>
      <p>{e.job}</p>
    </>
  );
});

const educationList = EduList.map((e) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{e.school}</h2>
      <div className="Edu-List">
        {e.loc} {e.date}
      </div>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        {e.description}
      </div>
    </>
  );
});

const skillsListLeft = (
  <>
    <li>Web development</li>
    <li>Web Design</li>
    <li>Data analytics</li>
    <li>Marketing</li>
  </>
);

const skillsListRight = (
  <>
    <li>IT/Software developement</li>
    <li>Computation</li>
    <li>Energy systems design</li>
    <li>Complex Energy systems maintenance</li>
  </>
);

function Curiculum() {
  return (
    <>
      <h1 style={{ padding: "50px" }}>Curriculum Vitae</h1>
      <div className="body-wrapper">
        <div className="body-top">
          <img src={marouaneLogo} alt="img-cv" />
          <h1 style={{ margin: "90px 0px 60px 0px" }}>Marouane Soukhrati</h1>
          <h3>Computer Science Student</h3>
          <div style={{ marginBottom: "10px" }}>
            <img src={uhaLogo} style={{ width: "20px" }} alt="img-cv-uha" />{" "}
            marouane.soukhrati@uha.fr
          </div>
          <div style={{ marginBottom: "10px" }}>
            <img src={gmailLogo} style={{ width: "20px" }} alt="img-cv" />{" "}
            soukhratimarouane@gmail.com
          </div>
          <div>
            <img
              src={phoneLogo}
              style={{ width: "20px", margin: "-4px 0px" }}
              alt="img-cv"
            />{" "}
            +33745493327
          </div>
          <h1 style={{ margin: "90px 0px 30px 0px" }}>About Me</h1>
          <p style={{ textAlign: "center", width: "645px" }}>{aboutPara}</p>
          <h1 style={{ margin: "90px 0px 30px 0px" }}>Skills</h1>
          <div className="skills-area">
            <ul>{skillsListLeft}</ul>
            <ul>{skillsListRight}</ul>
          </div>
        </div>
        <div className="body-bottom">
          <h1 style={{ margin: "50px 0px 90px 0px" }}>Past Experience</h1>
          <div>{experienceList}</div>
          <h1 style={{ margin: "30px 0px 50px 0px" }}>Education</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {educationList}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Abody() {
  return (
    <div className="App-body">
      <Curiculum />
      {/*
          
            function DiffCard({ image, txt }) {
              return (
                <div className="diff-card">
                  <img className="diff-img" src={image} alt="img-cv" />
                  <p className="diff-txt">{txt}</p>
                </div>
              );
            }
            <DiffCard image={freelanceLogo} txt="Why I'm looking for a co-op position ..."/>;
          
          */}
    </div>
  );
}
