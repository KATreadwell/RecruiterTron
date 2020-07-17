import React, { useEffect, useState } from 'react';
// import * as jsondataUser from './data-user-table';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './table.css';
import axios from 'axios';

function onAfterDeleteRow(rowKeys) {
   console.log('delete row', rowKeys);
   axios({
       method: 'delete',
       url: '/api/users',
       headers: {
           'content-type': 'application/json',
       },
       data: {
           username: rowKeys
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
  const userData=JSON.stringify(newRowStr)

  axios({
      method: 'post',
      url: '/api/user',
      headers: {
          'content-type': 'application/json',
      },
      data: userData
  })
  .then(result => console.log('Browser', result));

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
        console.log('Results: ' + result[i].id + ', ' + result[i].name);
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

const onAfterSaveCell = (row, cellName, cellValue) => {
    let rowStr = {};
    for (const prop in row) {
        rowStr[prop]=row[prop]
    }
    console.log('updated row', rowStr);
    const userData=JSON.stringify(rowStr)
    axios({
        method: 'put',
        url: '/api/user',
        headers: {
            'content-type': 'application/json'
        },
        data: userData
    })
    .then(result => console.log('result', result))
}

const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    afterSaveCell: onAfterSaveCell
};

const Datatables = () => {
    //usersData is the variable, setUsersData is updating the state
    const [usersData, setUsersData] = useState([]);
    const [hiddenId, setHiddenId] = useState(false)
    useEffect(() => {
        
        axios({
            method: "GET",
            url: "/api/users",
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
                        <TableHeaderColumn dataSort={true} width='100' dataField='firstName'>First Name</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} width='100' dataField='lastName'>Last Name</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} width='100' dataField='username' isKey>Username</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} width='100' dataField='password'>Password</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} width='100' dataField='admin'>Admin</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>


            </Col>
        </Row>
    </div>
    );
}
export default Datatables;    
