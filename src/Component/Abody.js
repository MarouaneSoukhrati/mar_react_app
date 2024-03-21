import '../ComponentStyle/Abody.css';
import '../ComponentStyle/SubcomponentStyle/Path.css'
import FamilyTree from './Subcomponent/FamilyTree';
import ImageCarousel from './Subcomponent/ImageCarousel';
import Path from './Subcomponent/Path';

export default function Abody(reflist){
    return(
      <div className="App-body">
        <FamilyTree/>
        <div className="App-body-history">
          <Path/>
          <ImageCarousel/>
        </div>
      </div>
    );
}