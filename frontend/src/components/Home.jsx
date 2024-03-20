import React from 'react';
import Navbar from './Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='home-container'>
                <div className="bg-light-secondary p-5 text-center">
                    <div className="container">
                        <div className="space-y-3">
                            <h1 className="text-5xl font-bold tracking-tighter text-gray-800">Blockchain Evidence Management</h1>
                            <p className="text-gray-800 max-w-3xl mx-auto">Secure, transparent, and immutable complaint and evidence management on the blockchain.</p>
                            <div className="mx-auto max-w-sm space-y-2">
                                <a className="btn btn-primary mb-2" href="#">
                                    Contact Sales
                                </a>
                                <p className="text-xs text-gray-800">
                                    Want to learn more? Contact us at <a className="underline" href="#">[email protected]</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold tracking-tighter text-gray-800">Why Blockchain for Complaint & Evidence Management?</h2>
                        <p className="text-gray-800 max-w-3xl mx-auto">
                            Blockchain technology ensures transparency, security, and
                            immutability, providing a trusted platform for managing complaints
                            and evidence.
                        </p>
                    </div>
                    <div className="row justify-content-center align-items-center mt-8 gap-4 md:gap-8">
                        <div className="col-md-6">
                            <div className="card border-0 shadow-lg">
                                <div className="card-body">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 rounded-lg bg-gray-100 p-3">
                                                <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Transparency</h3>
                                            <p className="text-gray-800">
                                                Allowing stakeholders to track the progress of complaints and
                                                access evidence with full transparency.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container py-12">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold tracking-tighter text-gray-800">Contact Us</h2>
                        <p className="text-gray-800 max-w-3xl mx-auto">
                            Ready to experience the benefits of blockchain-based complaint and
                            evidence management? Contact us to learn more or schedule a demo.
                        </p>
                    </div>
                    <div className="mx-auto max-w-sm space-y-4">
                        <form className="w-full">
                            <input className="border-0 py-2 px-3 w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 block mb-4" placeholder="Enter your email" required="" type="email" />
                            <button className="btn btn-primary btn-block" type="submit">
                                Contact Sales
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <style>{`
                body {
                    margin-top: 100px;
                    font-family: 'Roboto', sans-serif;
                }

                .home-container {
                    padding: 20px;
                }

                .btn {
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .btn:hover {
                    background-color: #4a9cff;
                }

                .underline {
                    text-decoration: underline;
                }
                .card-body p{
                    color:black;
                }
                .card-body {
                    border-radius: 8px;
                    color:black;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </>
    );
}

export default Home;
