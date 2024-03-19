import React, { useRef, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { useNavigate } from 'react-router-dom';

export default function StudentRegister() {
    const { backend_api, token } = useAuth();

    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${backend_api}/postComplaint/${address}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer  ${token}`
                },
                body: JSON.stringify({
                    address, image, title, desc
                }),
            });
            console.log(token);

            if (response.status === 200) {
                const res_data = await response.json();
                console.log("response from server ", res_data);
                navigate('/students');
                alert("Complaint Registered Successfull !!!");
            } else {
                return console.log(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-block">
                <h1>Complaint Registration</h1>
                <form onSubmit={handleSubmit}>
                    <label id="icon" htmlFor="name"><i className="fas fa-user"></i></label>
                    <input type="text" name="name" id="name" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <label id="icon" htmlFor="name"><i className="fas fa-envelope"></i></label>
                    <input type='file' name="name" id="name" placeholder="image" value={image}
                        onChange={(e) => setImage(e.target.value)} required />
                    <label id="icon" htmlFor="name"><i className="fas fa-id-card"></i></label>
                    <input type="text" name="name" id="name" placeholder="title" value={title}
                        onChange={(e) => setTitle(e.target.value)} required />
                    <label id="icon" htmlFor="name"><i className="fa fa-phone"></i></label>
                    <input type="text" name="name" id="name" placeholder="description" value={desc}
                        onChange={(e) => setDesc(e.target.value)} required />
                    <hr />
                    <div className="button-block">
                        <button type="submit" href="/">Submit Complaint</button>
                    </div>
                </form>
            </div>
            <style>
                {`
                html, body {
      display: flex;
      justify-content: center;
      height: 100%;
      }
      body, div, h1, form, input, p { 
      padding: 0;
      margin: 0;
      outline: none;
      font-family: Roboto, Arial, sans-serif;
      font-size: 16px;
      color: #666;
      }
      .see{
        position:relative;
        right:30px;
        cursor:pointer;
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
      max-width: 80%;
      min-width: 60%;
      min-height: auto; 
      padding: 10px 0;
      margin: 100px auto;
      border-radius: 20px; 
      border: solid 1px #ccc;
      box-shadow: 1px 2px 5px rgba(0,0,0,.31); 
      background: #134679; 
      }
      form {
      margin: 0 30px;
      }
      .account-type, .gender {
      margin: 15px 0;
      }
      label#icon {
      margin: 0;
      border-radius: 5px 0 0 5px;
      }
      input[type=text], input[type=password] , input[type=file] {
      width: calc(100% - 57px);
      height: 42px;
      margin: 13px 0 0 -5px;
      padding-left: 10px; 
      border-radius: 0 5px 5px 0;
      border: solid 1px #cbc9c9; 
      box-shadow: 1px 2px 5px rgba(0,0,0,.09); 
      background: #fff; 
      }
      input[type=file]{
        margin-bottom:0px;
        padding:none;
        text-align:center;
      }
      input[type=password] {
      margin-bottom: 15px;
      }
      #icon {
      display: inline-block;
      padding: 9.3px 15px;
      box-shadow: 1px 2px 5px rgba(0,0,0,.09); 
      background: #1c87c9;
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
      background: #1c87c9; 
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      }
      button:hover {
      background: #26a9e0;
      }
      .fa-id-card,.fa-graduation-cap,.fa-laptop-code,.fa-laptop{
        width:15px;
      } 
                `}
            </style>
        </>
    )
}