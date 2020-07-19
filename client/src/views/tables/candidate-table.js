import React, {useEffect, useState} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './table.css';
import axios from 'axios';

function onAfterDeleteRow(rowKeys) {
    console.log('delete row', rowKeys);
    axios({
        method: 'delete',
        url: '/api/candidate',
        headers: {
            'content-type': 'application/json',
       },
        data: {
            email: rowKeys
        }
    })
    .then(result => console.log('browser deleted record', result));
}

function onAfterInsertRow(row) {
    let newRowStr = {}
    for (const prop in row) {
        newRowStr[prop]=row[prop]
    }
    console.log(newRowStr);
    const candidateData=JSON.stringify(newRowStr)

    axios({
        method: 'post',
        url: '/api/candidate',
        headers: {
            'content-type': 'application/json',
       },
        data: candidateData
    })
    .then(result => console.log('Browser', result));
}

function afterSearch(searchText, result) {
    console.log('Your search text is ' + searchText);
    console.log('Result is:');
    for (let i = 0; i < result.length; i++) {
        console.log('Result: ' + result[i].id + ', ' + result[i].name);
    }
}

const options = {
    afterInsertRow: onAfterInsertRow,  
    afterDeleteRow: onAfterDeleteRow,  
    afterSearch: afterSearch  
};

const selectRowProp = {
    mode: 'checkbox'
};

//update - use cellEditProp
const onAfterSaveCell = (row, cellName, cellValue) => {
    let rowStr = {};
  for (const prop in row) {
    rowStr[prop]=row[prop]
  }
  console.log('updated row', rowStr);
  const candidateData=JSON.stringify(rowStr)
  axios({
      method: 'put',
      url: '/api/candidate',
      headers: {
          'content-type': 'application/json'
     },
      data: candidateData
  })
  .then(result => console.log('result', result));
}

//http://allenfang.github.io/react-bootstrap-table/example.html#celledit
const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: onAfterSaveCell
};

const Datatables = () => {
    //candidatesData is the variable, setCandidatesData is updating the state
     const [candidatesData, setCandidatesData] = useState([]);
  
    useEffect(() => {
       
        axios({
            method: "GET",
            url: "/api/candidates",
            headers:{
                //to get around CORS issue
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(result => {
            console.log('result', result);
            setCandidatesData(result);
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
                            <TableHeaderColumn dataSort={true} dataField='name' width="150">Name</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='status' width="110">Status (Interview/Hired)</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='phone' width="150">Phone</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='email' width="150" isKey>Email (key)</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='address' width="150">Address</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='experience' width="100">Security Exp (yrs)</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='commute' width="100">Max Commute (mi)</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='qualifications' width="200">Qualifications</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div >
    );
}
export default Datatables;    
