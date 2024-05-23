import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Badge from 'react-bootstrap/Badge';
// import Modal from '../Modal';
import Cart from '../screens/Cart';
import '../screens/AboutUs.css';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const Navigate = useNavigate();


  return (
    <>
    <body>

      <div >
        <nav className="navbar " style={{backgroundColor:"orange"}}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR75CFL39p7WnBFYB6VSdC_7747qG94cV1fA&usqp=CAU' style={{ height: "70px", width: "100px", objectFit: "cover" }}></img>
          <div className="container-fluid" >
            <Link className="navbar-brand" to="/">Thingstore App</Link>
            <form className="d-flex ms-auto">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ Width: "300px", marginLeft: "80px" }}></input>
              <button className="btn btn-outline-success me-2" type="submit">Search</button>
            </form>
            <div className="navbar-nav ms-auto d-flex align-items-center">
             
                <Link className="nav-link active me-3" aria-current="page" to="/">My Orders</Link>
              <Link className="nav-link active me-3" aria-current="page" to="#">About Us</Link>
              {/* <Link className="nav-link active me-3" aria-current="page" to="#">Help</Link> */}
              <Link className="nav-link active me-3" aria-current="page" to="/login">Login</Link>
              <Link className="nav-link active me-3" aria-current="page" to="/Signup">Sign Up</Link>
              <div className='btn btn-outline-success mx-2' onClick={() => { setCartView(true) }}>
                My Cart{"  "}
                {/* <Badge pill bg="danger" >0</Badge> */}
              </div>
              {/* {cartView? <Modal onClose={()=> setCartView(false)}><Cart/></Modal>:null} */}
              <button className="btn btn-outline-danger" type="submit" >Logout</button>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    </body>
    </>
  )
}
