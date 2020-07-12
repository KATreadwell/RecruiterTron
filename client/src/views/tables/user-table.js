import React, { useEffect, useState } from 'react';
import * as jsondataUser from './data-user-table';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './table.css';
import axios from 'axios';

//This is for the Delete row  
function onAfterDeleteRow(rowKeys) {
    // alert('The rowkey you drop: ' + rowKeys);
}

//This is for the insert new row

function onAfterInsertRow(row) {
  let newRowStr = {}; let testArray = []
  for (const prop in row) {
      newRowStr[prop]=row[prop]
  }
  console.log(newRowStr);
  const userData=JSON.stringify(newRowStr)

  axios({
      method: 'post',
      url: 'https://localhost:3333/api/user',
      headers: {
          'content-type': 'application/json',
      },
      data: positionData
  })
  .then(result => console.log('UI Result', result));

//   for (const prop in row) {
//     newRowStr += prop + ': ' + row[prop] + ' \n';
//   }
//   alert('The new row is:\n ' + newRowStr);
}

//This is for the Search item
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
    //positionsData is the variable, setPositionsData is updating the state
    const [usersData, setUsersData] = useState([]);
    useEffect(() => {
        
        axios({
            method: "GET",
            url: "http://localhost:3333/api/user",
            headers:{
                //get around CORS issue
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(result => {
            console.log("result", result);
            setUsersData(result.data)
        })
    }, [])

    return (<div>
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <BootstrapTable striped hover
                            condensed search={true}
                            data={usersData && usersData.data}
                            deleteRow={true}
                            selectRow={selectRowProp}
                            pagination
                            insertRow={true}
                            options={options}
                            cellEdit={cellEditProp}
                            tableHeaderClass='mb-0'
                        >   
                            <TableHeaderColumn width='200' dataField='username' isKey>Username</TableHeaderColumn>
                            <TableHeaderColumn width='200' dataField='firstName'>First Name</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='200' dataField='lastName'>Last Name</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} width='50' dataField='admin'>Admin</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>


            </Col>
        </Row>
    </div>
    );
}
export default Datatables;    
