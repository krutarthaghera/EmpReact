import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import EditEmpModal from "./EditEmpModal";

const Employee = () => {
  const [emps, setEmps] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [editEmp, setEditEmp] = useState([]);

  const refreshList = () => {
    axios
      .get("https://localhost:7098/api/employee")
      .then((result) => {
        setEmps(result.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    refreshList();
  }, []);

  const deleteEmp = (empid) => {
    axios
      .delete("https://localhost:7098/api/employee/" + empid)
      .then(refreshList())
      .catch((err) => alert(err));
  };
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
            <tr key={index * (Math.random() * 1000).toFixed(2)}>
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
                    onClick={() => {
                      setEditModalShow(true);
                      setEditEmp(emps[index]);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={() => deleteEmp(emp.employeeId)}
                  >
                    Delete
                  </Button>
                  {editModalShow ? (
                    <EditEmpModal
                      show={editModalShow}
                      onHide={() => setEditModalShow(false)}
                      emp={editEmp}
                    />
                  ) : null}
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonToolbar>
        <Button variant="primary" onClick={() => setAddModalShow(true)}>
          Add Employee
        </Button>

        <AddEmpModal
          show={addModalShow}
          onHide={() => setAddModalShow(false)}
        />
      </ButtonToolbar>
    </div>
  );
};

export default Employee;
