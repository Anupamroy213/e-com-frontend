import React, { useState, } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'; 
import { Link, useNavigate } from "react-router-dom";
import './style.css'
function Signup(){
    const [credentials, setCredentials] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: "" });
        const [error, setError] = useState("");
        const navigate = useNavigate();
       
    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value });
    }
    const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!credentials.name || !credentials.email || !credentials.phone || !credentials.work || !credentials.password || !credentials.cpassword) {
            setError("Please fill out all fields.");
            alert("please fill all the required details")
            return false;
        }else if (!emailPattern.test(credentials.email)) {
            setError("Please enter a valid email address.");
            alert("please enter a valid email")
            return false;
        }  
        else if (credentials.password !== credentials.cpassword) {
            setError("Passwords do not match.");
            alert("Passwords do not match.")
            return false;
        }
        
        setError("");
        return true;
    }
    const handleInputs = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const hashedcPassword = await bcrypt.hash(credentials.cpassword, 10);
    
            // Update credentials with the hashed password
            const updatedCredentials = { ...credentials, password: hashedPassword, cpassword: hashedcPassword };
    
            // Make the request with the updated credentials
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, updatedCredentials);
            if (response.data.success) {
                const { authToken } = response.data; // Access data directly using response.data
                localStorage.setItem('authToken', authToken);
                console.log('User registered successfully!');
                alert("successfully registered!")
                navigate('/');
                // You can perform further actions here, such as showing a success message to the user
            } else {
                console.error('Registration failed:', response.data.error);
                alert("Registration failed:")
                // Handle registration failure, show error message to the user, etc.
            }
        } catch (error) {
            console.error('Error occurred during registration:', error);
            // Handle network errors, server errors, etc.
        }
    };
    

    
   
    return (
        <div className="container-signup mt-5">
            <div className="row-signup">
            <div className='centre-body'>
            <div className='animatedlogo'>
                <img src='https://media.istockphoto.com/id/1406768082/vector/new-user-online-registration-and-sign-up-concept-tiny-characters-signing-up-on-huge.jpg?s=612x612&w=0&k=20&c=1Rj_r6EYpH0-llwYYnCm9y6Pdme18FdmIjj5vMQVjHQ='></img>
            </div>
                <div className="col-md-6" id='col-signup'>
                    <h1 id='h1signup'>Sign Up</h1>
                    <form id='formid'  onSubmit={handleInputs}>
                        <div className="form-group-signup">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="form-group-signup">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} />
                        </div>
                        <div className="form-group-signup">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="number" className="form-control" id="phone" name="phone" value={credentials.phone} onChange={onChange} />
                        </div>
                        <div className="form-group-signup">
                            <label htmlFor="work">Your Work</label>
                            <input type="text" className="form-control" id="work" name="work" value={credentials.work} onChange={onChange} />
                        </div>
                        <div className="form-group-signup">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                        </div>
                        <div className="form-group-signup">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} />
                        </div>
                        <div className="form-check mb-3 ml-2">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <div className='butt' style={{ margin: "10px" ,display:"flex",gap:"1rem"}}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            {/* <button className="btn btn-primary" onClick={navigate("/login")}>Already a user</button> */}
                        </div>
                    </form>
                </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;
