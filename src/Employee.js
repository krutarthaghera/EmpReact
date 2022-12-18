import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

  refreshList() {
    fetch("https://localhost:7098/api/employee", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        this.setState({ emps: result });
      });
    });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    //this.refreshList();
  }

  deleteEmp(empid) {
    fetch("https://localhost:7098/api/employee/" + empid, {
      method: "DELETE",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log("11222334", response);
        this.refreshList();
      })
      .catch((error) => {
        console.log("qqqqq", error);
        // this.refreshList()
      });
  }
  render() {
    const { emps, empid, empname, empgnd, empmob, dob, depmt, doj } =
      this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>EmployeeGender</th>
              <th>EmployeeMobile</th>
              <th>EmployeeDOB</th>
              <th>Department</th>
              <th>DOJ</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp, index) => (
              <tr key={index * (Math.random()*1000).toFixed(2)}>
                <td>{emp.employeeId}</td>
                <td>{emp.employeeName}</td>
                <th>{emp.employeeGender}</th>
                <th>{emp.employeeMobile}</th>
                <th>{emp.employeeDOB}</th>
                <td>{emp.department}</td>
                <td>{emp.dateOfJoining}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          emp: emps[index],
                        })
                      } 
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteEmp(emp.employeeId)}
                    >
                      Delete
                    </Button>
                    {this.state.editModalShow ? (
                      <EditEmpModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        emp={this.state.emp}
                      />
                    ) : null}
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>

          <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
