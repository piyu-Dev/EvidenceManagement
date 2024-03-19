import React from 'react';
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom';
// import { useAuth } from './Store/auth';
export default function Navbar() {
    // const navigate = useNavigate();
    // const { address, isloggedin, user } = useAuth();
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ maxHeight: "50px" }}>
                <div className="container-fluid" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
                    <a className="navbar-brand fs-4 fw-bolder text-primary" href="#">CComplain</a>
                    <button className="navbar-toggler " style={{ "border": "2px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-lg-0 fs-5 fw-normal">

                            

                           
                        </ul>
                        <form className="d-flex fs-6 fw-medium ms-auto" >
                            {/* {isloggedin ? <>
                                <> <button className="btn btn-outline-success ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} >{address.slice(0, 4) + "..." + address.slice(38)}</button>

                                </>
                            </> :
                                <> <button className="btn btn-outline-primary ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={() => navigate('/login')}>Login</button>
                                    <button className="btn btn-outline-success ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={() => navigate('/register')}>SignUp</button></>
                            } */}
  <button className="btn btn-outline-success ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} >Connect</button>
                                    
                        </form>
                    </div>
                </div>
            </nav>
            <style>{`
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
              }
              a{
                font-size:10px
              }
            `}</style>
        </>
    )
}