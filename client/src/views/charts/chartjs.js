import React, { useEffect, useState } from 'react';
import { Doughnut, Line, Bar, Radar, Pie, Polar } from 'react-chartjs-2';
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';
import * as d from './chartjs-data';
import axios from 'axios';


// Radar Chart
var radarData = {
    labels: ['Los Angeles', 'Pasadena', 'Santa Monica', 'Azusa', 'Glendale'],
    datasets: [{
        label: 'Candidates',
        backgroundColor: '#4fc3f7',
        borderColor: '#2962ff',
        data: d.chartData.radarData.data.a
    }]
};


const Chartjs = () => {
    const [position, setPositionsData] = useState(null);
    const [candidate, setCandidatesData] = useState(null);
    const [openPosition, setopenPosition] = useState([0, 0]);
    const [interviewCandidate, setinterviewCandidate] = useState([0, 0]);
    const [positionClient, setPositionClient] = useState([0, 0]);
    const [postionLocation, setPositionLocation] = useState([0, 0]);
    const [candidateLoaded, setCandidateLoaded] = useState(false);
    const [positionLoaded, setPositionLoaded] = useState(false);
    const [ barData, setBarData ] = useState({
        labels: [],
        datasets: [{
            data: [],
            label: 'Open',
            backgroundColor: '#4fc3f7',
            borderColor: '#4fc3f7',
        },
        {
            data: [],
            label: 'Closed',
            backgroundColor: '#2962ff',
            borderColor: '#2962ff',
        }]
    });


    //Positions Open vs Closed PieChart
    var piePositionData = {
        labels: [
            'Open',
            'Closed'
        ],
        datasets: [{
            data: openPosition,
            backgroundColor: [
                '#4fc3f7',
                '#2962ff'
            ],
            hoverBackgroundColor: [
                '#30ade6',
                '#092e94'
            ]
        }]
    }

    //Candidates Hired vs Interview PieChart
    var pieCandidateData = {
        labels: [
            'Interview',
            'Hired'
        ],
        datasets: [{
            data: interviewCandidate,
            backgroundColor: [
                '#4fc3f7',
                '#2962ff'
            ],
            hoverBackgroundColor: [
                '#30ade6',
                '#092e94'
            ]
        }]
    }

    //Positions Open vs Closed
    const getDataFormatPosition = (position) => {
        //const open is to grab the data to store, const openTotal is to sum the results and display, p for "position" is used to store the data of the looped array
        const open = []; let openTotal = []; const close = []; let closeTotal = []; const finalArray = []; const labels = new Set();
        const getData = position && position.map((p, index) => {
            if (p.status == 'Open') {
                open.push(1);
                
            }
            else {
                close.push(1);

            }
            labels.add(p.client)
        }) 
        barData.labels = [...labels];
        openTotal = open && open.reduce((a, b) => a + b, 0);
        closeTotal = close && close.reduce((a, b) => a + b, 0)

        finalArray.push.apply(finalArray, [openTotal, closeTotal])
        barData.datasets[0].data = open;
        barData.datasets[1].data = close;
        setopenPosition(finalArray);
        setPositionLoaded(true);
        setBarData({...barData});
    }

    const getDataFormatCandidate = (candidate) => {
        //const open is to grab the data to store, const openTotal is to sum the results and display
        const interview = []; let interviewTotal = []; const hired = []; let hiredTotal = []; const finalArray = [];
        const getData = candidate && candidate.map((p, index) => {
            if (p.status == 'Interview') {
                interview.push(1);
            }
            else {
                hired.push(1);

            }
        })
        interviewTotal = interview && interview.reduce((a, b) => a + b, 0);
        hiredTotal = hired && hired.reduce((a, b) => a + b, 0)

        finalArray.push.apply(finalArray, [interviewTotal, hiredTotal])
        setinterviewCandidate(finalArray);
        setCandidateLoaded(true);
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "/api/positions",
            headers: {
                //evil CORS
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(result => {
                console.log('result', result.data);
                getDataFormatPosition(result.data)
            })

        axios({
            method: "GET",
            url: "/api/candidates",
            headers: {
                //evil CORS
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(result => {
                console.log('result', result.data);
                getDataFormatCandidate(result.data)
            })

    }, [])
    console.log("bar data: ", barData)
    return <div>
        {candidateLoaded && positionLoaded &&
            <Row>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <CardTitle>Positions: Open to Closed</CardTitle>
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                <Pie data={piePositionData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } } }} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <CardTitle>Positions Status by Client</CardTitle>
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                <Bar data={barData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } }, scales: { yAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Poppins" } }], xAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Poppins" } }] } }} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <CardTitle>Candidates: Interview to Hired</CardTitle>
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                <Pie data={pieCandidateData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } } }} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardBody>
                            <CardTitle>Position Distribution by City</CardTitle>
                            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                                <Radar data={radarData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } } }} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        }
    </div>
}

export default Chartjs;



