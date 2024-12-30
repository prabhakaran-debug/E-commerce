import React, { useEffect, useState } from "react";
import axios from "axios";

const Success = () => {
    const [paymentId, setPaymentId] = useState(null);
    const [status, setStatus] = useState(null);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get("session_id");

                if (sessionId) {
                    const response = await axios.post(
                        "http://localhost:5000/get-payment-intent",
                        { sessionId }
                    );

                    const { payment_intent, status } = response.data.session;
                    setPaymentId(payment_intent);
                    setStatus(status);
                    setOrderId(localStorage.getItem("orderId"));
                }
            } catch (error) {
                console.error("Error fetching payment details:", error);
            }
        };

        fetchPaymentDetails();
    }, []);

    useEffect(() => {
        if (orderId && status && paymentId) {
            const insertPayment = async () => {
                try {
                    await fetch("http://localhost:5000/api/payment/insert", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            order_id: orderId,
                            status,
                            payment_id: paymentId,
                        }),
                    });
                } catch (error) {
                    console.error("Error inserting payment details:", error);
                }
            };

            insertPayment();
        }
    }, [orderId, status, paymentId]);

    useEffect(() => {
        if (orderId && status) {
            const updateOrderStatus = async () => {
                try {
                    await fetch(`http://localhost:5000/api/order/put/${orderId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status }),
                    });
                } catch (error) {
                    console.error("Error updating order status:", error);
                }
            };

            const timer = setTimeout(updateOrderStatus, 2000);

            return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
        }
    }, [orderId, status]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            {paymentId && <p>Payment ID: {paymentId}</p>}
            {status && <p>Status: {status}</p>}
            {orderId && <p>Order ID: {orderId}</p>}
        </div>
    );
};

export default Success;
