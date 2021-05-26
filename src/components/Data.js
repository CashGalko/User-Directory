import React, { Component } from "react";

class Data extends Component {
  state = {
    employees: [],
    
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=20")
      .then(res => res.json())
      .then(json => {
        const employees = json.results.map(employee => {
          return {
            key: employee.id.value,
            firstName: employee.name.first,
            lastName: employee.name.last,
            email: employee.email,
            cell: employee.cell,
            gender: employee.gender,
            img: employee.picture.thumbnail
          };
        });
        this.setState({ employees });
        
      })
  }

  sortNameFirst = () => {
    let employees = [...this.state.employees];

    employees.sort((a, b) => a.firstName.localeCompare(b.firstName));
    this.setState({ employees });
  }

  sortNameLast = () => {
    let employees = [...this.state.employees];

    employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.setState({ employees });
  }

  filterGenderMale = () => {
    let employees = [...this.state.employees];
    let filteredEmployees = employees.filter(employee => employee.gender === "male");
    this.setState({ employees: filteredEmployees });
  }

  filterGenderFemale = () => {
    let employees = [...this.state.employees];
    let filteredEmployees = employees.filter(employee => employee.gender === "female");
    this.setState({ employees: filteredEmployees });
  }

 

  render() {
    if (!this.state.employees.length) {
      return <div>No employees found!</div>
    }

    return (
      <div>
        <div id="btnDiv">
          <button onClick={this.sortNameFirst} className="btn">Sort Employees by First Name</button>
          <button onClick={this.sortNameLast} className="btn">Sort Employees by Last Name</button>
          <button onClick={this.filterGenderMale} className="btn">Show all Male Employees</button>
          <button onClick={this.filterGenderFemale} className="btn">Show all Female Employees</button>
        
        </div>

        <div id="tableDiv">
          <table id="dataTable">
            <tr><th></th><th>Name:</th><th>Email:</th><th>Cell Phone:</th><th>Gender:</th></tr>
            {this.state.employees.map(employee => (
              <tr>
                <td><img src={employee.img} alt={employee.firstName} /></td>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.cell}</td>
                <td>{employee.gender}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }

}

export default Data;