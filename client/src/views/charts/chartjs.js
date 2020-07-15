import React from 'react';
import { Doughnut, Line, Bar, Radar, Pie, Polar } from 'react-chartjs-2';
import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';
import * as d from './chartjs-data';

//Open vs Closed Positions
var piePositionData = {
    labels: [
        'Open Positions',
        // 'Yellow',
        'Closed Positions'
    ],
    datasets: [{
        data: d.chartData.pieData.data,
        backgroundColor: [
            '#4fc3f7',
            // '#ffc107',
            '#2962ff'
        ],
        hoverBackgroundColor: [
            '#30ade6',
            // '#ffc107',
            '#092e94'
        ]
    }]
}

var pieCandidateData = {
    labels: [
        'Open Positions',
        // 'Yellow',
        'Closed Positions'
    ],
    datasets: [{
        data: d.chartData.pieData.data,
        backgroundColor: [
            '#4fc3f7',
            // '#ffc107',
            '#2962ff'
        ],
        hoverBackgroundColor: [
            '#30ade6',
            // '#ffc107',
            '#092e94'
        ]
    }]
}


//Doughnut Chart
// const doughnutData = {
//     labels: [
//         'Red',
//         'Blue',
//         'Yellow',
//         'Green',
//         'Orange'
//     ],

//     datasets: [{
//         data: d.chartData.doughnutData.data,
//         backgroundColor: [
//             '#dc3545',
//             '#2962ff',
//             '#fb6340',
//             '#2dce89',
//             '#4fc3f7'
//         ],
//         hoverBackgroundColor: [
//             '#dc3545',
//             '#2962ff',
//             '#fb6340',
//             '#2dce89',
//             '#4fc3f7'
//         ]
//     }]
// };


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
    // }, {
    //     label: 'Google',
    //     backgroundColor: 'rgba(45, 206, 137,0.2)',
    //     borderColor: 'rgba(45, 206, 137,1)',
    //     data: d.chartData.radarData.data.b
    // }]
};

//Polar Chart
// var polarData = {
//     datasets: [{
//         data: d.chartData.polarData.data,
//         backgroundColor: [
//             '#dc3545',
//             '#2962ff',
//             '#fb6340',
//             '#2dce89'
//         ],
//         label: 'My dataset'
//     }],
//     labels: [
//         'Label 1',
//         'Label 2',
//         'Label 3',
//         'Label 4'
//     ]
// };


const Chartjs = () => {
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
            {/* <Col md="6">
                <Card>
                    <CardBody>
                        <CardTitle>Doughnut Chart</CardTitle>
                        <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } } }} />
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
            {/* <Col md="6">
                <Card>
                    <CardBody>
                        <CardTitle>Line Chart</CardTitle>
                        <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                            <Line data={lineData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } }, scales: { yAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Poppins" } }], xAxes: [{ gridLines: { display: false }, ticks: { fontFamily: "Poppins" } }] } }} />
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
            {/* <Col md="6">
                <Card>
                    <CardBody>
                        <CardTitle>Polar Chart</CardTitle>
                        <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 350 }}>
                            <Polar data={polarData} options={{ maintainAspectRatio: false, legend: { display: true, labels: { fontFamily: "Poppins" } } }} />
                        </div>
                    </CardBody>
                </Card>
            </Col> */}
            <Col md="6">
                <Card>
                    <CardBody>
                        <CardTitle>Candidate Distribution by City</CardTitle>
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


