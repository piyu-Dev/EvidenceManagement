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
                setComplaints(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchComplaints();
    }, []);

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
                                    <Card.Text className='txt'>{complaint.address.slice(0, 3) + "..." + complaint.address.slice(-3)}</Card.Text>
                                    <Card.Text className='txt'>{complaint.desc}</Card.Text>
                                    <Card.Img variant="top" src={complaint.image} alt="Complaint" />
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
            `}</style>
        </>
    );
};

export default Complaints;
