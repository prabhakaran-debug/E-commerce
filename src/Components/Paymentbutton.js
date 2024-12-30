import React from "react";

function PaymentButton({ productId, addressId }) {
  const handleCheckout = async () => {
    console.log("handleCheckout method is run")
    const response = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }), 
    });
    console.log(productId);
    console.log(addressId);

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Error creating checkout session", data);
    }

    fetch("http://localhost:5000/api/order/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        address_id: addressId,
        status: "pending",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.order_id);
        // console.log('Order ID stored:', data.order_id);
        // console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return <button className="btn btn-primary m-auto" onClick={handleCheckout}>Place Order</button>;
}

export default PaymentButton;
