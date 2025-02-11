import React, { useEffect, useState } from "react";
import axios from "axios";

import Lottie from "lottie-react";
import Animation from '../Animation.json'
import { Link } from "react-router-dom";
const Success = () => {
    const [paymentId, setPaymentId] = useState(null);
    const [status, setStatus] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [price, setPrice] = useState(null);
    const [message,setMessage] = useState()

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
                    setPrice(localStorage.getItem("price"));
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
    }, []);

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

    useEffect(() => {
        if (orderId) {
            // Perform DELETE operation to remove cart items associated with orderId
            fetch(`http://localhost:5000/api/order/${orderId}`, {
                method: 'DELETE', // DELETE method to remove cart items
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete items from cart');
                }
                return response.json();
            })
            .then((data) => {
                setMessage(data.message);  
                console.log("Delete success:", data.message);
            })
            .catch((error) => {
                setMessage(`Error: ${error.message}`); 
                console.error("Error deleting from cart:", error);
            });
            console.log(message);
            
        }
    }, [orderId]);  
    
    


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '90vh',
                    backgroundColor: '#f4f4f4',
                }}
            >
                {/* Lottie animation that plays only once */}
                <Lottie
                    animationData={Animation}
                    loop={false}  // Ensures animation plays only once
                    autoplay={true}  // Starts automatically
                    style={{ width: 400, height: 400 }}
                />
                <h2 style={{ color: '#4caf50' }}>Payment Successful!</h2>
                <p>Your payment has been processed successfully.</p>
                <table style={{ width: 'auto', alignItems: "end" }}>
                    <tr>
                        <th>Payment ID</th>
                        <td style={{ paddingLeft: '20px' }}>
                            {paymentId && <span>{paymentId}</span>}
                        </td>
                    </tr>
                    <tr>
                        <th>price</th>
                        <td>{price && <span>{price}</span>}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td>{status && <span>{status}</span>}</td>
                    </tr>
                    <tr>
                        <th>Order ID</th>
                        <td>{orderId && <span>{orderId}</span>}</td>
                    </tr>
                </table>

                    <Link to={'/'} className="btn btn-outline-primary m-3">Back to home</Link>

            </div>
        </>
    );
};

export default Success;
