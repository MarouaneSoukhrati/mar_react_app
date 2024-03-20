import '../ComponentStyle/Aheader.css';
import '../ComponentStyle/SubcomponentStyle/Navbar.css'
import Navbar from './Subcomponent/Navbar';

import MoorLogo from "../Logos/MoorLogo.svg";

export default function Aheader(){
    return(
      <header className="App-header">
        <Navbar/>
        <img className="App-logo" src={MoorLogo} alt="logo" />
        <h2 className='header-title'>The Path to Moorish independance.</h2>
      </header>
    );
}