// src/ProductDisplay.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const ProductDisplay = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB database
    axios.get('/productData')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: in productdisplay', error);
      });
  }, []);

  return (
    <div className="product-container" style={{ display: "flex",flexWrap: "wrap"}}>
      {products.map(product => (
        <div key={product._id} className="card" style={{ width: "200px",margin: "10px",border: "1px solid #ccc",borderRadius: "5px"}}>
          <div className="card-body" style={{padding:"10px"}}>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
