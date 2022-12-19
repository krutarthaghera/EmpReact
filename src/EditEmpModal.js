import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

export class EditEmpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: [],
      employeeName: "",
      employeeGender: "",
      employeeMobile: "",
      employeeDOB: "",
      employeeId: "",
      dateOfJoining: "",
      department: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:7098/api/department")
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({ deps: data }));
      });
  }

    componentDidUpdate() {
      this.setState((prevState) => ({
        ...prevState,
        employeeId: this.props.emp.employeeId,
        employeeName: this.props.emp.employeeName,
        
      }));
    }

  

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.emp)
    fetch(process.env.REACT_APP_API + "employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeId: this.props.emp.employeeId,
        employeeName: this.state.employeeName,
        employeeGender: this.state.employeeGender,
        employeeMobile: this.state.employeeMobile,
        employeeDOB: this.state.employeeDOB,
        department: this.state.department,
        dateOfJoining: this.state.dateOfJoining,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  handleFileSelected(event) {
    event.preventDefault();
    //this.photofilename = event.target.files[0].name;
    const formData = new FormData();
    formData.append(
      "myFile",
      event.target.files[0],
      event.target.files[0].name,
    );

    fetch(process.env.REACT_APP_API + "Employee/SaveFile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  render() {
    console.log("props", this.props, "state", this.state);
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
                    <Form.Control
                      type="text"
                      name="EmployeeId"
                      required
                      placeholder="EmployeeId"
                      disabled
                      defaultValue={this.props.emp.employeeId}
                    />
                  </Form.Group>

                  <Form.Group controlId="EmployeeName">
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      defaultValue={this.props.emp.employeeName}
                      placeholder="EmployeeName"
                      onChange={(e) => {
                        this.setState((prevState) => ({
                          ...prevState,
                          employeeName: e.target.value,
                        }));
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="EmployeeGender">
                    <Form.Label>EmployeeGender</Form.Label>
                    <Form.Control
                      type="text"
                      gender="EmployeeGender"
                      required
                      defaultValue={this.props.emp.employeeGender}
                      placeholder="EmployeeGender"
                      onChange={(e) => {
                        this.setState((prevState) => ({
                          ...prevState,
                          EmployeeGender: e.target.value,
                        }));
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="EmployeeMobile">
                    <Form.Label>EmployeeMobile</Form.Label>
                    <Form.Control
                      type="text"
                      mobile="EmployeeMobile"
                      required
                      defaultValue={this.props.emp.employeeMobile}
                      placeholder="EmployeeMobile"
                      onChange={(e) => {
                        this.setState((prevState) => ({
                          ...prevState,
                          EmployeeMobile: e.target.value,
                        }));
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="EmployeeDOB">
                    <Form.Label>EmployeeDOB</Form.Label>
                    <Form.Control
                      type="date"
                      dob="EmployeeDOB"
                      required
                      placeholder="EmployeeDOB"
                      defaultValue={this.props.emp.employeeDOB}
                      onChange={(e) => {
                        this.setState((prevState) => ({
                          ...prevState,
                          EmployeeDOB: e.target.value,
                        }));
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={this.props.emp.department}
                    >
                      {this.state.deps.map((dep) => (
                        <option key={dep.departmentId}>
                          {dep.departmentName}
                        </option>
                      ))}
                      onChange=
                      {(e) => {
                        this.setState((prevState) => ({
                          ...prevState,
                          Department: e.target.value,
                        }));
                      }}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="DateOfJoining">
                    <Form.Label>DateOfJoining</Form.Label>
                    <Form.Control
                      type="date"
                      doj="DateOfJoining"
                      required
                      placeholder="DateOfJoining"
                      defaultValue={this.props.emp.dateOfJoining}
                      onChange={(e) => {
                        this.setState((prevState) => ({
                          ...prevState,
                          DateOfJoining: e.target.value,
                        }));
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.handleSubmit}
                    >
                      Update Employee
                    </Button>
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={6}>
                <Image
                  width="200px"
                  height="200px"
                  src={
                    process.env.REACT_APP_PHOTOPATH + this.props.photofilename
                  }
                />
                <input onChange={this.handleFileSelected} type="File" />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
