import React, { useEffect, useState } from 'react';
// import * as jsondataPosition from './data-position-table';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './table.css';
import axios from 'axios';

 
function onAfterDeleteRow(rowKeys) {
    // alert('The rowkey you drop: ' + rowKeys);
    console.log('delete row', rowKeys);
    axios({
        method: 'delete',
        url: '/api/position',
        headers: {
            'content-type': 'application/json',
        },
        data: {
            req: rowKeys
        }
    })
    .then(result => console.log('browser deleted record', result));
}

function onAfterInsertRow(row) {
  let newRowStr = {};
  for (const prop in row) {
      newRowStr[prop]=row[prop]
  }
  console.log(newRowStr);
  const positionData=JSON.stringify(newRowStr)

  axios({
      method: 'post',
      url: '/api/position',
      headers: {
          'content-type': 'application/json',
      },
      data: positionData
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
    afterInsertRow: onAfterInsertRow,  // A hook for after insert rows
    afterDeleteRow: onAfterDeleteRow,  // A hook for after droping rows.
    afterSearch: afterSearch  // define a after search hook
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
    const positionData=JSON.stringify(rowStr)
    axios({
        method: 'put',
        url: '/api/position',
        headers: {
            'content-type': 'application/json'
        },
        data: positionData
    })
    .then(result => console.log('result', result))
}

const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: onAfterSaveCell
};

const Datatables = () => {
    //positionsData is the variable, setPositionsData is updating the state
    const [positionsData, setPositionsData] = useState([]);
    //manually hiding object id within table to assist with proper deletion instead of using title
    const [hiddenId, setHiddenId] = useState(false)
    useEffect(() => {
        
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
            console.log('result', result);
            setPositionsData(result);
        })
    }, [])

    return (<div>
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <BootstrapTable striped hover
                            search={true}
                            data={positionsData && positionsData.data}
                            deleteRow={true}
                            selectRow={selectRowProp}
                            pagination
                            insertRow={true}
                            options={options}
                            cellEdit={cellEditProp}
                            tableHeaderClass='mb-0'
                        >   
                            {/* <TableHeaderColumn dataField='_id' isKey hidden hiddenOnInsert>ID</TableHeaderColumn> */}
                            {/* <TableHeaderColumn dataField='_id' isKey>ID</TableHeaderColumn> */}
                            <TableHeaderColumn dataSort={true} width='150' dataField='req' isKey>Job Requisition #</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='150' dataField='title'>Title</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='100' dataField='status'>Status</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='100' dataField='priority'>Priority</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='100' dataField='client'>Client</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='100' dataField='location'>Location</TableHeaderColumn>
                            {/* <TableHeaderColumn width='100' dataField='zip'>Zip</TableHeaderColumn> */}
                            {/* <TableHeaderColumn width='100' dataField='category'>Category</TableHeaderColumn> */}
                            <TableHeaderColumn dataSort={true} width='100' dataField='experience'>Security Exp (yrs)</TableHeaderColumn>
                            {/* <TableHeaderColumn width='100' dataField='salary'>Salary</TableHeaderColumn> */}
                            <TableHeaderColumn dataSort={true} width='200' dataField='qualifications'>Qualifications</TableHeaderColumn>
                            {/* <TableHeaderColumn width='100' dataField='candidates'>Candidates</TableHeaderColumn> */}
                        </BootstrapTable>
                    </CardBody>
                </Card>


            </Col>
        </Row>
    </div>
    );
}
export default Datatables;    
