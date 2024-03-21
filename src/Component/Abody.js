import '../ComponentStyle/Abody.css';
import '../ComponentStyle/SubcomponentStyle/Path.css'
import FamilyTree from './Subcomponent/FamilyTree';
import Path from './Subcomponent/Path';

import { motion } from 'framer-motion';

import Capsule from "../Logos/Capsule.svg";

export default function Abody(reflist){
    return(
      <div className="App-body">
        <FamilyTree/>
        <div className="App-body-history">
          <Path/>
          <img className="Capsule" src={Capsule} alt="Capsule" />
        </div>
        <motion.button className='mobility' initial={{x:-900}} whileHover={{opacity:0.4}} animate={{x:340, y:-110, transition: {duration:5}}}>Learn more</motion.button>
      </div>
    );
}