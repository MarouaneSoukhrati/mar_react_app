//import { useState } from "react";

const Api_message = [
    {category: "Fruits", price: "1$", stocked: true, name:"Apple"},
    {category: "Fruits", price: "1$", stocked: true, name:"Dragonfruit"},
    {category: "Fruits", price: "2$", stocked: false, name:"Passionfruit"},
    {category: "Fruits", price: "1$", stocked: true, name:"Spinach"},
    {category: "Vegetables", price: "4$", stocked: false, name:"Pumpkin"},
    {category: "Vegetables", price: "1$", stocked: true, name:"Peas"}
];

function Searchbar(search_function){
    return(
        <input type="text" placeholder="Search..." search_function={search_function}/>
    );
}

function search_function(){
    let element = Searchbar.value;
    if( element in Api_message ){
        return element;
    }
    else{
        return null;
    }
}

function Radiobutton(text){
    return(
        <radio_button>Only show products in stock</radio_button>
    );
}

export default function Mybox(){
    return(
        <div className="mybox">
            <div className="top_index">
                <Searchbar search_function={search_function}/>
                <Radiobutton text="Only show products in stock"/>
            </div>
            <div className="titre_index">
                <div>Name</div>
                <div>Price</div>
            </div>
            <div className="first_category">
                <div className="titre_item">Fruits</div>
            </div>
            <div className="second_category">
                <div className="titre_item">Vegetables</div>
                <div className="class_item"><span>test</span><span>test</span></div>
                <div className="class_item"><span>test</span><span>test</span></div>
                <div className="class_item"><span>test</span><span>test</span></div>
            </div>
        </div>
    );
}