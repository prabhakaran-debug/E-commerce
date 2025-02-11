import React from "react";

function PaymentButton({ productId, addressId ,productDetail ,cartData,cartIds,totalprice}) {
  const handleCheckout = async () => {
    console.log("handleCheckout method is run")
    const date = new Date();
    const currentdate = date.toISOString().slice(0, 10); // Formats to YYYY-MM-DD
    console.log("date " + currentdate);
    
    const requestBody = cartIds && cartIds.length > 0 
    ? { cartIds, addressId ,totalprice}  
    : { productId, addressId }; 

try {
    const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody), 
    });

    console.log("totalprice "+totalprice);
    
    console.log("Product ID:", productId);
    console.log("Cart IDs:", cartIds);
    console.log("Address ID:", addressId);
    console.log("Cart Data:", cartData);

    const data = await response.json();
    if (data.url) {
       window.location.href = data.url;
    } else {
        console.error("Error creating checkout session", data);
    }
} catch (error) {
    console.error("Fetch error:", error.message); 
}

 
    fetch("http://localhost:5000/api/order/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: JSON.stringify(cartIds || productId) ,
        address_id: addressId,
        status: "pending",
        date:currentdate
      }),

    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.order_id);
        localStorage.setItem("price",productDetail.price);
        // console.log('Order ID stored:', data.order_id);
        // console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    
      <button 
          className="btn btn-primary d-block mx-auto "
          style={{ width: "150px" }}
          onClick={handleCheckout}
      >
          Place Order
      </button>
 
  
);
}

export default PaymentButton;
