import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('https://localhost:7098/api/employee',{
        method: 'GET',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
    }).then((response)=>{
        console.log(JSON.stringify())
        response.json().then((result)=>{
            this.setState({emps:result});
            console.log(this.state.emps);
        })
    })
    }
    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        // this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {emps, empid,empname,empgnd,empmob,dob,country,depmt,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        console.log("qwertpoiuy" , this.state.emps)
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>EmployeeGender</th>
                        <th>EmployeeMobile</th>
                        <th>EmployeeDOB</th>
                        <th>Country</th>
                        <th>Department</th>
                        <th>DOJ</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emps=>
                            <tr key={emps.employeeId}>
                                <td>{emps.employeeId}</td>
                                <td>{emps.employeeName}</td>
                                <th>{emps.employeeGender}</th>
                                <th>{emps.employeeMobile}</th>
                                <th>{emps.employeeDOB}</th>
                                <th>{emps.country}</th>
                                <td>{emps.department}</td>
                                <td>{emps.dateOfJoining}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        empid:emps.EmployeeId,empname:emps.EmployeeName,empgnd:emps.EmployeeGender,empmob:emps.EmployeeMobile,dob:emps.EmployeeDOB,country:emps.Country,depmt:emps.Department,
        doj:emps.DateOfJoining})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emps.EmployeeId)}>
            Delete
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empname={empname}
        empgnd={empgnd}
        empmob={empmob}
        dob={dob}
        country={country}
        depmt={depmt}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Employee</Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}