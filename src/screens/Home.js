import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer1 from '../components/Footer1';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
// import Footer2 from '../components/Footer2';
import Card from '../components/Card';
import Cart from './Cart';
import './AboutUs.css';
import { useCart } from '../components/ContextReducer';
export default function Home() {
  const [cartView,setCartView] = useState(false)
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [productCat, setProductCat] = useState([]);
  const [productsItem, setProductsItem] = useState([]);
let data=useCart()
  const loadData = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/productData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setProductsItem(response[0]);
      setProductCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/")
  }
  return (
    <body id='homebody'>

    <div>
      
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" id='navbarbody'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR75CFL39p7WnBFYB6VSdC_7747qG94cV1fA&usqp=CAU' style={{ height: "70px", width: "100px", objectFit: "cover" }}></img>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Thingstore</Link>
            {(localStorage.getItem("authToken"))? 
              <p className='navbar-brand' style={{marginTop:"12px",marginLeft:"60px"}}>User: {localStorage.getItem('userEmail')}</p>
            :""}
            <form className="d-flex ms-auto">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ Width: "300px", marginLeft: "80px" }} value={search} onChange={(e)=>{setSearch(e.target.value)}}></input>
              {/* <button className="btn btn-outline-success me-2" type="submit">Search</button> */}
            </form>
            <div className="navbar-nav ms-auto d-flex align-items-center">
            {(localStorage.getItem("authToken"))? 
                <Link className="btn btn-outline-success mx-2" id='navbar-items' aria-current="page" to="/myorder">My Orders</Link>
                         :""}
              <Link className="btn btn-outline-success mx-2" id='navbar-items' aria-current="page" to="/About">About Us</Link>
              {/* <Link className="nav-link active me-3" aria-current="page" to="#">Help</Link> */}
             {(!localStorage.getItem("authToken"))? 
             <div>
              <Link className="btn btn-outline-success mx-2" id='navbar-items' aria-current="page" to="/login">Login</Link>
              <Link className="btn btn-outline-success mx-2" id='navbar-items' aria-current="page" to="/Signup">Sign Up</Link>
             </div>           
              :""}
              {(localStorage.getItem("authToken"))? 
              <div className='btn btn-outline-success mx-2' id='navbar-items' onClick={()=>{setCartView(true)}}>
                My Cart{"  "}
                {data.length !==0 ?
                <Badge pill bg="danger" >{data.length}</Badge>
                :" "}
              </div>
              :""}
              {cartView? <Modal onClose={()=> setCartView(false)}><Cart/></Modal>:null}
              {(localStorage.getItem("authToken"))? 
              <button className="btn btn-outline-danger" type="submit" onClick={handleLogout} >Logout</button>
              :""}
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
      <div className='container'>
        {
          productCat.length > 0 ? 
          productCat.map((data) => {
            return (
              <div className='row mb-3' key={data._id}>
                <div className='col'>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr/>
                  <div className='row'>
                    {
                      productsItem.length > 0 ?  
                      productsItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                  .map(filterItems => (
                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3' style={{ marginLeft:"20px",marginBottom:"20px" }}>
                                      <Card productsItem={filterItems}
                                      
                                      options={filterItems.options[0]}
                                          >
                                      </Card>
                                    </div>
                                  ))
                      : <div className='col'>no such data found</div>
                    }
                  </div>
                </div>
              </div>
            );
          })
          : ""
        }
        
      </div>
      {/* <Footer2/> */}
      <Footer1 />
    </div>
    </body>
  )
}
