import React, { useEffect, useState } from 'react';
import './MyOrdersPage.css'; // Import CSS file

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const userEmail = localStorage.getItem('userEmail'); // Assuming you store user email in localStorage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/myorders`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: userEmail })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                const sortedOrders = data.orderDatas.order_data.flat().sort((a, b) => {
                    return new Date(b.Order_date) - new Date(a.Order_date);
                });
                setOrders(sortedOrders); 
                
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userEmail]);

    return (
        <div className="my-orders-container"> {/* Apply CSS class for centering */}
            <h2>Your Orders</h2>
            <h1>User: {userEmail}</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{marginRight:"10px"}}>S.no</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th style={{marginRight:"10px"}}>Quantity</th>
                        <th>Size</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td>
                            <td>{order.Order_date}</td>
                            <td>{order.name}</td>
                            <td><img id='img-myorder' src={order.img} alt="Product" /></td>
                            <td>{order.qty}</td>
                            <td>{order.size == 0 ? <p>NA</p>:order.size}</td>
                            <td>{order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrdersPage;
