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


//Interview vs Hired Candidates
var pieCandidateData = {
    labels: [
        'Interview',
        'Hired'
    ],
    datasets: [{
        data: d.chartData.pieData.data,
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



//Bar Chart
var barData = {
    labels: ['DMV', 'Wells Fargo', 'SCE', 'DoS', 'DGS'],
    datasets: [{
        label: 'Open',
        backgroundColor: '#4fc3f7',
        borderColor: '#4fc3f7',
        data: d.chartData.barData.data.a
    },
    {
        label: 'Closed',
        backgroundColor: '#2962ff',
        borderColor: '#2962ff',
        data: d.chartData.barData.data.b
    }]
};



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
     const [ position, setPositionsData ] = useState(null);
     const [openPosition, setopenPosition] = useState([0,0])
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
     const getDataFormat = (position) => {
         //const open is to grab the data to store, const openTotal is to sum the results and display
        const open=[]; let openTotal=[]; const close=[]; let closeTotal = []; const finalArray=[];
        const getData = position && position.map((p, index)=>{
          if(p.status == 'Open'){
            open.push(1);
          }
          else{
         close.push(1);
        
          }
        })
        openTotal = open && open.reduce((a, b) => a + b, 0);
        closeTotal = close && close.reduce((a, b) => a + b, 0)
    
         finalArray.push.apply(finalArray, [openTotal,closeTotal])
         setopenPosition(finalArray);
    
    }
     useEffect(()=>{
        axios({
            method: "GET",
            url: "/api/positions",
            headers:{
                //evil CORS
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(result => {
            console.log('result', result.data);
            setPositionsData(result.data);
            getDataFormat(result.data)
        })
    }, [])    



    return <div>
        {/*--------------------------------------------------------------------------------*/}
        {/* Start Inner Div*/}
        {/*--------------------------------------------------------------------------------*/}
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
        {/*--------------------------------------------------------------------------------*/}
        {/*End Inner Div*/}
        {/*--------------------------------------------------------------------------------*/}
    </div>
}

export default Chartjs;
// export {piePositionData};


