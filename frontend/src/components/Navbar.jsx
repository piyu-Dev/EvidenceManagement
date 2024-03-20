import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/auth';


export default function Navbar() {
    const { isLoggedIn, LogoutUser } = useAuth();
    const navigate = useNavigate();

    let address = "0x5769701AEC843972913252966e17864905362bd7"

  const data = localStorage.getItem("USER");
  const userData = JSON.parse(data);

    return (
        <>
            <div className="nav-container">
                <nav style={{ maxWidth: "100%" }} className="navbar navbar-expand-lg">
                    <div className="container-fluid" >
                        <Link className="logo navbar-brand fs-4 fw-bolder" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                        }} to='/'>
                            <h3 style={{
                                color: "white"
                            }}>Complaint<i class="fa fa-link"></i>Chain</h3>
                        </Link>
                        <button className="navbar-toggler" style={{ "border": "2px solid white" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon "></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-lg-0 fs-5 fw-normal">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/' style={{
                                        color: "white"
                                    }}>Home</Link>
                                </li>
                                {userData && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" style={{
                                                color: "white"
                                            }} to='/setevidence'>New Complaint</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" style={{
                                                color: "white"
                                            }} to='/complaints'>Complaints</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                            <form className="d-flex fs-6 fw-medium ms-auto navbar-nav">
                                {isLoggedIn ? (
                                    <>
                                        <div className="btn-txt-grp">

                                            {/* <button className="logout btn btn-outline-danger ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { LogoutUser(); navigate('/login') }}>{data.slice(0, 3) + "..." + data.slice(-3)}</button> */}
                                            <button className="logout btn btn-outline-danger ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { LogoutUser(); navigate('/login') }}>{address ? address.slice(0, 4) + "..." + address.slice(38) : ""}</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-outline-primary ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/login') }}>Login</button>
                                        <button className="btn btn-outline-primary ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/register') }}>Register</button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <style>{`
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: 'Poppins', sans-serif;
                  color:white;
                }
                a:hover, a {
                  text-decoration: none;
                }
                .logout{
                    border-color:white;
                    color:white;
                }
                body {
                  width: 100%;
                  overflow-x: hidden;
                  z-index: 10;
                }
                .btn-txt-grp p{
                  margin: auto 0 !important;
                  cursor: auto !important;
                  font-size: 18px !important;
                  font-weight: 600 !important;
                //   color: #1d46ff !important;
                }
                nav {
                  margin: 10px 10px 0 10px;
                  background: none;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color:white !important;
                }
                .nav-container {
                  width: max-content;
                  min-width: 95%;
                  background: rgba(255, 255, 255, 0.26);
                  border-radius: 50px;
                  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                  backdrop-filter: blur(9.6px);
                  margin: 10px 20px 0 20px;
                  -webkit-backdrop-filter: blur(9.6px);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: fixed;
                  top: 0;
                  left: 0;
                  z-index: 100;
                }
                .logo {
                  width: 30vw;
                  max-width: 200px;
                  margin-left: 10px;
                }
                li {
                  margin-inline: 10px;
                }
                .nav-item select {
                  margin-top: 10px;
                }
                .navbar-toggler {
                  position: absolute;
                  top: 5px;
                  right: 2%;
                  max-width: 55px;
                }
                .btn-txt-grp {
                  display: flex;
                  justify-content: center;
                  align-items: baseline;
                }
                @media screen and (max-width: 992px) {
                  .btn-txt-grp {
                    flex-direction: column;
                  }
                }
                @media screen and (max-width: 650px) {
                  nav {
                    max-width: 80%;
                    flex-direction: column;
                  }
                  .nav-cont {
                    width: 10vw;
                  }
                }
              `}
      </style>
    </>
  );
}
