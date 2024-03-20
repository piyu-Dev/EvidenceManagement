import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Navbar from './Navbar';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('http://localhost:8000/complaints');
                if (!response.ok) {
                    throw new Error('Failed to fetch complaints');
                }
                const data = await response.json();
                console.log(data);
                setComplaints(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComplaints();
    }, []);

    // Function to format time
    const formatTime = (timeString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(timeString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Navbar />
            <div className="container">
            <h2>Complaints</h2>
            <Row>
                {complaints.map((complaint, index) => (
                    <Col md={4} key={index}>
                        <Card style={{ width: '18rem', marginBottom: '20px' }}>
                            <Card.Body>
                                <Card.Title>{complaint.title}</Card.Title>
                                <Card.Text className='txt'>
                                    <span className='fw-bolder'>Address:</span> {complaint.address.slice(0, 3) + "..." + complaint.address.slice(-3)}
                                </Card.Text>
                                <Card.Text className='txt'><span className='fw-bolder'>Desc:</span>{complaint.desc.slice(0, 120) + "..."}</Card.Text>
                                <Card.Text className='txt'><span className='fw-bolder'>User:</span> <span className='mini'>{complaint.walletAdd}</span></Card.Text>
                                <Card.Text className='txt'><span className='fw-bolder'>Resolved Status:</span> {complaint.isResolved ? "Yes" : "No"}</Card.Text>
                                <Card.Img variant="top" className='mb-1' src={`https://gateway.pinata.cloud/ipfs/${complaint.image}`} alt="Complaint" />
                                <Card.Text className='txt text-center'>{formatTime(complaint.time)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
            <style>{`
            .container {
                margin-top: 100px;
            }
            h2 {
                margin: 30px 0;
                text-align: center;
            }
            .txt {
                color: black;
            }
            span{
                color:black
            }
           
            `}</style>
        </>
    );
};

export default Complaints;
