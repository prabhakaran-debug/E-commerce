// import { get } from "jquery";
import React, { useEffect, useState } from "react";
import {   useNavigate, useParams } from "react-router-dom";
 import '../Components/view.css'
// import PaymentButton from "./Paymentbutton";


function View(){
  const [product,setProduct]=useState('');
  const {id}=useParams();
  const navigate = useNavigate();
  const data = () => {
    fetch(`http://localhost:5000/api/product/${id}`)
    .then((Response)=> Response.json())
    .then(productdata=>{
      console.log(productdata)
      setProduct(productdata)
    })
  }
    useEffect(()=>{
       data()
       
    });
    const pidData = () =>{
      navigate('/address',{state:{product_id:product.id}})
      console.log("product_id :"+product.id)
    }


    return(
    <div className="viewdiv">
         <h2>Product Details</h2>
         <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    style={{ width: "300px", height: "200px" }}
         />         <h4>Product id  :{product.id}</h4>
         <h4>product name  :{product.name}</h4>
         <h4>product price  :{product.price}</h4>
         <h4>product category  :{product.category}</h4>

        
         <button className="btn btn-primary" onClick={pidData}>Next</button>
    </div>
       )
}
export default View