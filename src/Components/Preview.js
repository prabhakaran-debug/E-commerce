import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import './preview.css';
import PaymentButton from './Paymentbutton'

function Preview() {
    const [address, setAddress] = useState({});
    const [product, setProduct] = useState({});

    const location = useLocation();
    const address_id = location.state?.address_id;
    const product_id = location.state?.product_id;

    useEffect(() => {
        if (address_id) {
            fetch(`http://localhost:5000/api/address/${address_id}`)
                .then((response) => response.json())
                .then((addressdata) => {
                    setAddress(addressdata);
                    console.log("Address Data:", addressdata);
                })
                .catch((error) => console.error("Error fetching address data:", error));
        }

        if (product_id) {
            fetch(`http://localhost:5000/api/product/${product_id}`)
                .then((response) => response.json())
                .then((productdata) => {
                    setProduct(productdata);
                    console.log("Product Data:", productdata);
                })
                .catch((error) => console.error("Error fetching product data:", error));
        }
    }, [address_id, product_id]);

    return (
        <div className="container">
            <div className="m-auto text-center"><h2 className="h2 text-align-center">Preview Page</h2>
            <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    style={{ width: "200px", height: "150px" }}
         /> 
            </div>
            <div className="row p-5 mx-auto" >
                <div className="col-6 m-auto text-center">
                    <span className="Product text-right">
                        <h3>Product Details</h3>
                        <p>Product Name  : {product.name}</p>
                        <p>Product Price  : {product.price}</p>
                        <p>Product Category  : {product.category}</p>
                    </span>
                </div>
                <div className="col-6 mx-auto text-center">
                    <span className="Address m-auto text-left">
                        <h3>Address Details</h3>
                        <p>Street  : {address.houseNo}, {address.street}</p>
                        <p>City  : {address.city}</p>
                        <p>State  : {address.state},{address.country}</p>
                    </span>
                </div>
            </div>
            <div className="row p-5 mt-0">
            <PaymentButton productId={product_id} addressId={address_id} />
            </div>
        </div>
    );
}

export default Preview;
