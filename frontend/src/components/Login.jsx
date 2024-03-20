import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { storeTokenInLS, backend_api } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !name) {
            return alert("All Fields are Required!!!");
        }

        try {
            const response = await fetch(`${backend_api}/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    password: password,
                }),
            });

            if (response.status === 200) {
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                window.alert("Login Successful");
                navigate('/');
            } else {
                return alert(response.json);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-block">
                <h1>Login</h1>
                <form id="registerForm" onSubmit={handleSubmit}>
                    <label htmlFor="email" id="icon"><i className="fas fa-user"></i></label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="password" id="icon"><i className="fas fa-unlock-alt"></i></label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className='flex'>
                        <Link to='/forgetPassEmail' style={{
                            color: "white",
                            textDecoration: "underline"
                        }}>forgot password ?</Link>
                    </div>
                    <hr />
                    <div className="button-block">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>

            <style jsx>{`
        html, body {
      display: flex;
      justify-content: center;
      height: 100%;
      }
      .flex{
        justify-content: space-between;
        align-items:center;
        display:flex;
      }
      body, div, h1, form, input, p { 
      padding: 0;
      margin: 0;
      outline: none;
      font-family: Roboto, Arial, sans-serif;
      font-size: 16px;
      color: black;
      }
      a:hover , a{
        color:white;
      }
      h1 {
      padding: 10px 0;
      font-size: 32px;
      font-weight: 300;
      text-align: center;
      color: #fff !important;
      }
      p {
      font-size: 12px;
      }
      hr {
      color: #a9a9a9;
      opacity: 0.3;
      }
      .main-block {
      max-width: 60%; 
      min-height: auto; 
      min-width:80%;
      padding: 50px 25px;
      margin: 100px auto;
      border-radius: 20px; 
      border: solid 1px #ccc;
      box-shadow: 1px 2px 5px rgba(0,0,0,.31); 
      background: black; 
      }
      form {
      margin: 0 30px;
      }
      label#icon {
      margin: 0;
      border-radius: 5px 0 0 5px;
      }
      input[type=text], input[type=password] , input[type=phone] {
      width: calc(100% - 57px);
      height: 42px;
      margin: 13px 0 0 -5px;
      padding-left: 10px; 
      border-radius: 0 5px 5px 0;
      border: solid 1px #cbc9c9; 
      box-shadow: 1px 2px 5px rgba(0,0,0,.09); 
      background: #fff; 
      }
      input[type=password] {
      margin-bottom: 15px;
      }
      #icon {
      display: inline-block;
      padding: 9.3px 15px;
      box-shadow: 1px 2px 5px rgba(0,0,0,.09); 
      background: rgb(90,90,90);
      color: #fff;
      text-align: center;
      }
      .button-block {
      margin-top: 10px;
      text-align: center;
      }
      .button-block button {
      width: 100%;
      padding: 10px 0;
      margin: 10px auto;
      border-radius: 5px; 
      border: none;
      background: rgb(90,90,90);
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      }
      button:hover {
      background: rgb(100,100,100);
      }
      .fa-id-card,.fa-graduation-cap,.fa-phone,.fa-laptop{
        width:15px;
      }
      @media screen and (max-width:340px){
        .flex{
            flex-direction:column;
        }
        .flex select , .flex a , input , .main-block {
            width:100%;
        }

        .main-block{
            padding: 50px 0px;
        }
      }
      `}</style>
        </>
    );
}

export default Login;
