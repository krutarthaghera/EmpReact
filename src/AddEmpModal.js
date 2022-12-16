import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[],cons:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }
    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    

    componentDidMount()
        {
            fetch('https://localhost:7098/api/department')
            .then(response=>response.json())
            .then(data=>{
                this.setState({deps:data});
            });
    
            fetch('https://localhost:7098/api/country')
            .then(response=>response.json())
            .then(data=>{
                this.setState({cons:data});});
    
        }
    

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                employeeName:event.target.employeeName.value,
                employeeGender:event.target.employeeGender.value,
                employeeMobile:event.target.employeeMobile.value,
                employeeDOB:event.target.employeeDOB.value,
                country:event.target.country.value,
                department:event.target.department.value,
                dateOfJoining:event.target.dateOfJoining.value,
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
    getdatas()
    {
        fetch('https://localhost:7098/api/department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });

        fetch('https://localhost:7098/api/country')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cons:data});});

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
            Add Employee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeName">
                        <Form.Label>EmployeeName</Form.Label>
                        <Form.Control type="text" name="EmployeeName" required 
                        placeholder="EmployeeName"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeGender">
                        <Form.Label>EmployeeGender</Form.Label>
                        <Form.Control type="text" name="EmployeeGender" required 
                        placeholder="EmployeeGender"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeMobile">
                        <Form.Label>EmployeeMobile</Form.Label>
                        <Form.Control type="text" name="EmployeeMobile" required 
                        placeholder="EmployeeMobile"/>
                    </Form.Group>

                    <Form.Group controlId="EmployeeDOB">
                        <Form.Label>EmployeeDOB</Form.Label>
                        <Form.Control 
                        type="date"
                        name="EmployeeDOB"
                        required
                        placeholder="EmployeeDOB"
                        />
                       
                        
                    </Form.Group>

                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select">
                        {this.getdatas()}
                        {this.state.cons.map(con=>
                            <option key={con.countryId}>{con.countryName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select">
                        {this.state.deps.map(dep=>
                            <option key={dep.departmentId}>{dep.departmentName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfJoining">
                        <Form.Label>DateOfJoining</Form.Label>
                        <Form.Control 
                        type="date"
                        name="DateOfJoining"
                        required
                        placeholder="DateOfJoining"
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
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