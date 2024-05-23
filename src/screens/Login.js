import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Define useNavigate inside the component

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loginuser`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const { authToken } = await response.json();
        
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userEmail', email);
        // Navigate to the home page
        navigate('/');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div>
      <div style={{ backgroundImage: 'url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ2lufGVufDB8fDB8fHww)', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100vh' }}>
        {/* Content of your component */}
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', position: "relative" }}>
          <form style={{ marginTop: '3rem', border: '2px solid black', borderRadius: '10px' }}>
            <div className="form-outline mb-4" style={{ padding: '10px' }}>
              <h3 style={{ padding: '30px', color: "white" }}>Login</h3>
              <label className="form-label" htmlFor="form2Example1" style={{ color: "white", fontSize: "23px" }}>Email address</label>
              <input type="email" id="form2Example1" className="form-control" style={{ width: '300px' }} value={email} onChange={onChange} name="email" />
            </div>
            <div className="form-outline mb-4" style={{ padding: '10px' }}>
              <label className="form-label" htmlFor="form2Example2" style={{ color: "white", fontSize: "23px" }}>Password</label>
              <input type="password" id="form2Example2" className="form-control" style={{ width: '300px' }} value={password} onChange={onChange} name="password" />
            </div>
            <div style={{ paddingLeft: '10px' }}>
              <button type="button" className="btn btn-success btn-block mb-4" style={{ color: "white", fontSize: "15px" }} onClick={handleSignIn}>Sign in</button>
            </div>
            {error && <p style={{ paddingLeft: '10px', color: 'red' }}>{error}</p>}
            <p style={{ paddingLeft: '10px', color: "white", fontSize: "14px" }}>New user <Link to="/signup" style={{ color: "white", fontSize: "13px", marginLeft: "20px" }}>Sign up here</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
