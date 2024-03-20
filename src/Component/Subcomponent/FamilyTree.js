import '../../ComponentStyle/SubcomponentStyle/FamilyTree.css';
import { motion } from 'framer-motion';

import familyTree from "../../Logos/familyTree.svg";

let Desctext = "The term Moor is an exonym first used by Christian Europeans to designate the Muslim populations of the Maghreb, al-Andalus (Iberian Peninsula), Sicily and Malta during the Middle Ages.";

export default function FamilyTree() {
  return (
    <div className="fam-wrapper">
        <img className="fam-tree" src={familyTree} alt="Family-tree" />
        <div className="fam-txt">
            <p className="moorparag">{Desctext}</p>
            <motion.a whileHover={{opacity:0.4}} className="moorbutton" href="https://en.wikipedia.org/wiki/Moors" target="_blank" rel="noopener noreferrer">Learn more</motion.a>
      </div>
    </div>
  );
}
