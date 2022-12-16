import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[],cons:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }


    componentDidMount(){
        fetch('https://localhost:7098/api/'+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });

        fetch('https://localhost:7098/api/'+'country')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cons:data});
            console.log(this.state);
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeName:event.target.EmployeeId.value,
                EmployeeGender:event.target.EmployeeName.value,
                EmployeeMobile:event.target.EmployeeMobile.value,
                EmployeeDOB:event.target.EmployeeDOB.value,
                Country:event.target.Country.value,
                Department:event.target.Department.value,
                DateOfJoining:event.target.DateOfJoining.value,

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="EmployeeId">
                        <Form.Label>EmployeeId</Form.Label>
                        <Form.Control type="text" name="EmployeeId" required 
                        placeholder="EmployeeId"
                        disabled
                        defaultValue={this.props.empid}/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeName">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" name="EmployeeName" required 
                        defaultValue={this.props.empname}
                        placeholder="EmployeeName"
                        />
                    </Form.Group>

                    <Form.Group controlId="EmployeeGender">
                        <Form.Label>EmployeeGender</Form.Label>
                        <Form.Control type="text" name="EmployeeGender" required 
                        defaultValue={this.props.empgnd}
                        placeholder="EmployeeGender"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeMobile">
                        <Form.Label>EmployeeMobile</Form.Label>
                        <Form.Control type="text" name="EmployeeMobile" required 
                        defaultValue={this.props.empmob}
                        placeholder="EmployeeMobile"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeDOB">
                        <Form.Label>EmployeeDOB</Form.Label>
                        <Form.Control 
                        type="date"
                        name="EmployeeDOB"
                        required
                        placeholder="EmployeeDOB"
                        defaultValue={this.props.dob}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.country}>
                        {this.state.cons.map(con=>
                            <option key={con.CountryId}>{con.CountryName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.depmt}>
                        {this.state.deps.map(dep=>
                            <option key={dep.DepartmentId}>{dep.DepartmentName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"
                        defaultValue={this.props.doj}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Employee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}