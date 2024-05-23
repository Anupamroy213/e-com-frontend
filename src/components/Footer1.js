import React from 'react'
import {Link} from 'react-router-dom'
import '../screens/AboutUs.css';
export default function Footer1() {
  return (
     
    <div id='footerbody'>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        
      </Link>
      <span className="text-muted" style={{color:"white"}} >© 2024 E-commerceApp-Thingstore, Inc</span>
      
    </div>
    <p  style={{color:"white"}}>This is just a prototype e-commerce application. Built for learning purpose</p>
    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      
    </ul>
  </footer>
    </div>
    
  )
}
