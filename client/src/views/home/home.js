import React from 'react';
import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import './home.css';

const Home = () => {
    return (
        <Card>
            <CardBody>
                <h1 id="home">Welcome to the Inter-Con Security Recruiter-Tron!</h1>
                <br></br>
                <h2 id="home2">Let's get to recruiting!</h2>
            </CardBody>
        </Card>
    );
}

export default Home;
