import React from 'react';
import * as jsondataCandidate from './data-candidate-table';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function onAfterDeleteRow(rowKeys) {
    alert('The rowkey you drop: ' + rowKeys);
}

function onAfterInsertRow(row) {
  let newRowStr = '';

  for (const prop in row) {
    newRowStr += prop + ': ' + row[prop] + ' \n';
  }
  alert('The new row is:\n ' + newRowStr);
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

    return (<div>
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <BootstrapTable striped hover
                            condensed search={true}
                            data={jsondataCandidate.jsondataCandidate}
                            deleteRow={true}
                            selectRow={selectRowProp}
                            pagination
                            insertRow={true}
                            options={options}
                            cellEdit={cellEditProp}
                            tableHeaderClass='mb-0'
                        >
                            <TableHeaderColumn width='100' dataField='name' isKey>Name</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='phone'>Phone</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='email'>Email</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='street' dataField='city'>Address
                            
                            </TableHeaderColumn>
                            {/* <TableHeaderColumn width='50' dataField='city'>City</TableHeaderColumn>
                            <TableHeaderColumn width='50' dataField='state'>State</TableHeaderColumn>
                            <TableHeaderColumn width='50' dataField='zip'>Zip</TableHeaderColumn> */}
                            <TableHeaderColumn width='100' dataField='experience'>Security Experience</TableHeaderColumn>
                            <TableHeaderColumn width='200' dataField='qualifications'>Qualifications</TableHeaderColumn>
                            <TableHeaderColumn width='100' dataField='commute'>Max Commute (mi)</TableHeaderColumn>
                        </BootstrapTable>
                    </CardBody>
                </Card>


            </Col>
        </Row>
    </div>
    );
}
export default Datatables;    
