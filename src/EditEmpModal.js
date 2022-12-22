import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const EditEmpModal = (props) => {
  const { onHide, emp, setEditEmp, refresh } = props;

  const [form, setForm] = useState({
    employeeId: "",
    employeeName: "",
    employeeGender: "",
    employeeMobile: "",
    employeeDOB: "",
    dateOfJoining: "",
    department: "",
    photofilename: "",
  });

  const [dept, setDept] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API+"department")
      .then((response) => setDept(response.data))
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    setForm({
      employeeId: emp.employeeId,
      employeeName: emp.employeeName,
      employeeGender: emp.employeeGender,
      employeeMobile: emp.employeeMobile,
      employeeDOB: emp.employeeDOB,
      dateOfJoining: emp.dateOfJoining,
      department: emp.department,
      photofilename: emp.photofilename,
    });
  }, [emp]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    axios
      .put(process.env.REACT_APP_API + "employee", {
        ...form,
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      .then((res) => {
        onHide();
        setEditEmp([]);
        refresh();
      })
      .catch((err) => alert("Failed", err));
  };

  const handleFileSelected = (event) => {
    event.preventDefault();
    setForm((form) => ({
      ...form,
      photofilename: event.target.files[0].name,
    }));

    const formData = new FormData();
    formData.append(
      "myFile",
      event.target.files[0],
      event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API + "Employee/SaveFile", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setForm((form) => ({
            ...form,
            photofilename: process.env.REACT_APP_PHOTOPATH + result,
          }));
        },
        (error) => {
          alert("Failed");
        }
      );
  };

  console.log(form);

  return (
    <div className="container">
      <Modal
        {...props}
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
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="EmployeeId">
                  <Form.Label>EmployeeId</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeId"
                    required
                    placeholder="EmployeeId"
                    disabled
                    defaultValue={emp.employeeId}
                  />
                </Form.Group>

                <Form.Group controlId="EmployeeName">
                  <Form.Label>EmployeeName</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmployeeName"
                    required
                    defaultValue={emp.employeeName}
                    placeholder="EmployeeName"
                    onChange={(e) => {
                      setForm((prevState) => ({
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
                    defaultValue={emp.employeeGender}
                    placeholder="EmployeeGender"
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        employeeGender: e.target.value,
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
                    defaultValue={emp.employeeMobile}
                    placeholder="EmployeeMobile"
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        employeeMobile: e.target.value,
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
                    defaultValue={emp.employeeDOB}
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        employeeDOB: e.target.value,
                      }));
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="Department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control as="select" defaultValue={emp.department}>
                    {dept.map((dep) => (
                      <option key={dep.departmentId}>
                        {dep.departmentName}
                      </option>
                    ))}
                    onChange=
                    {(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        department: e.target.value,
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
                    defaultValue={emp.dateOfJoining}
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        dateOfJoining: e.target.value,
                      }));
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update Employee
                  </Button>
                </Form.Group>
              </Form>
            </Col>

            
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditEmpModal;
