import { useState } from "react";

const Api_message = [
  { category: "Fruits", price: "1$", stocked: true, name: "Apple" },
  { category: "Fruits", price: "1$", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "2$", stocked: false, name: "Passionfruit" },
  { category: "Fruits", price: "1$", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "4$", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "1$", stocked: true, name: "Peas" },
];

let bycategory_message = function(category){return Api_message.filter( (element) => element.category === category )}
let items_list = function(category){return bycategory_message(category).map((element) => (
  <div className="class_item">
    {element.stocked ? element.name : <span style={{color:"red"}}>{element.name}</span>} 
    <span>{element.price}</span>
  </div>
));}

function Searchbar(search_function) {
  return (
    <input
      type="text"
      placeholder="Search..."
      search_function={search_function}
    />
  );
}

function search_function() {
  let element = Searchbar.value;
  if (element in Api_message) {
    return element;
  } else {
    return null;
  }
}

function Radiobutton({ className, text }) {

  const [classNamer, setClassNamer] = useState([className,text]);

  return (
    <button className={classNamer[0]} 
            onClick={() => setClassNamer([classNamer[0] === "redradio_button" ? "yellowradio_button" : "redradio_button"
                                        , classNamer[1] === "All products" ? "Products in stock" : "All products"])}>
      {classNamer[1]}
    </button>
  );
}

function Mylister({list}){
  return(    
  <div className="mybox">
    <div className="top_index">
      <Searchbar search_function={search_function} />
      <Radiobutton className="redradio_button" text="All products"/>
    </div>
    <div className="titre_index">
      <div>Name</div>
      <div>Price</div>
    </div>
    <div className="first_category">
      <div className="titre_item">Fruits</div>
      <div>{items_list("Fruits")}</div>
    </div>
    <div className="second_category">
      <div className="titre_item">Vegetables</div>
      <div>{items_list("Vegetables")}</div>
    </div>
  </div>
  );
}

export default function Myapp() {
  return (
    <Mylister list="Api_message"/>
  );
}
