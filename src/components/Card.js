import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import '../screens/AboutUs.css';
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions.length > 0 ? priceOptions[0] : '');
  const [selectedSize, setSelectedSize] = useState(priceOptions.length > 0 ? priceOptions[0] : '');
  const isShoes = props.productsItem.name.toLowerCase().includes('shoes');

  // let email1=localStorage.getItem('userEmail')
  const handleAddToCart = async () => {
    await dispatch({ 
      type: 'ADD', 
      id: props.productsItem._id, 
      img: props.productsItem.img, 
      name: props.productsItem.name, 
      price: finalPrice, 
      qty: qty, 
      size: size 
    });
    console.log(data);
  };
  let finalPrice = 0;
if (priceOptions.length > 0) {
  if (priceOptions.length === 1) {
    finalPrice = qty * 1000*parseInt(options[priceOptions[0]], 10); // Parse option value as integer
  } else {
    finalPrice = qty * parseInt(options[size], 10);
 // Parse option value as integer
  }
}
  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, [priceOptions]);

  
  
  return (
    <body>
      {/* <div className=''> */}
        <div className="card p-3" style={{ width: "18rem", maxHeight: "460px" }} id='cardbody'>
          <img src={props.productsItem.img} className="card-img-top" alt="error" style={{ height: "160px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.productsItem.name}</h5>
            <div className='container w-95'>
              <div className="row">
                <div className="col-md-6">
                  <p className="m-1">Qty</p>
                  <select className='m-1 h-40 rounded' value={qty} onChange={(e) => setQty(e.target.value)}>
                    {Array.from(Array(6), (e, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  {priceOptions.length > 1 && (
                    <>
                      <p className="m-1">Size</p>
                      <select className='m-1 h-40 rounded' ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => (
                          <option key={data}>{data}</option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='d-inline h-70 pt-3'>
              ₹{finalPrice}/-
            </div>
            <button className="btn btn-primary bg-success" style={{ marginLeft: '20px', marginTop: '10px' }} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      {/* </div> */}
    {/* </div> */}
    </body>
  );
}
