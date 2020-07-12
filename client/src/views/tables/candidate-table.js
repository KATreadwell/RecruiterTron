import React, {useEffect, useState} from 'react';
//import * as jsondataCandidate from './data-candidate-table';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './table.css';
import axios from 'axios';

function onAfterDeleteRow(rowKeys) {
    // alert('The rowkey you drop: ' + rowKeys);
  
}

function onAfterInsertRow(row) {
    let newRowStr = {}; let testArray = []
    for (const prop in row) {
        //newRowStr += prop + ': ' + row[prop] + ',';
        newRowStr[prop]= row[prop]
    }
    console.log( newRowStr);
    const candidateData =JSON.stringify(newRowStr)

    axios({
        method: 'post',
        url: 'http://localhost:3333/api/candidate',
        headers: {
            'content-type': 'application/json',
       },
        data: candidateData
    })
    .then(result => console.log('UI Result', result));
}

function afterSearch(searchText, result) {
    console.log('Your search text is ' + searchText);
    console.log('Result is:');
    for (let i = 0; i < result.length; i++) {
        console.log('Fruit: ' + result[i].id + ', ' + result[i].name + ', ' + result[i].price);
    }
}

const options = {
    afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
    afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
    afterSearch: afterSearch  // define a after search hook
};

const selectRowProp = {
    mode: 'checkbox'
};
const cellEditProp = {
    mode: 'click',
    blurToSave: true
};

const Datatables = () => {
    //candidatesData is the variable, setCandidatesData is updating the state
     const [candidatesData, setCandidatesData] = useState([]);
    useEffect(() => {
       
        axios({
            method: "GET",
            url: "http://localhost:3333/api/candidates",
            headers:{
                //to get around CORS issue
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(result => {
            console.log('result', result);
            setCandidatesData(result.data)
        })
    }, [])

    return (<div>
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <BootstrapTable striped hover
                            search={true}
                            data={candidatesData && candidatesData.data}
                            deleteRow={true}
                            selectRow={selectRowProp}
                            pagination
                            insertRow={true}
                            options={options}
                            cellEdit={cellEditProp}
                            tableHeaderClass='mb-0'   
                        >
                            <TableHeaderColumn dataSort={true} dataField='status' width="100">Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='name' width="100" isKey>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='phone' width="150">Phone</TableHeaderColumn>
                            <TableHeaderColumn dataField='email' width="150">Email</TableHeaderColumn>
                            <TableHeaderColumn dataField='address' width="150">Address</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='experience' width="100">Security Exp (yrs)</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='commute' width="100">Max Commute(mi)</TableHeaderColumn>
                            {/* <TableHeaderColumn dataSort={true} dataField='ranking' width="100">Ranking</TableHeaderColumn> */}
                            <TableHeaderColumn dataField='salary' width="100">Salary</TableHeaderColumn>
                            <TableHeaderColumn dataField='qualifications' width="175">Qualifications</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div >
    );
}
export default Datatables;    
