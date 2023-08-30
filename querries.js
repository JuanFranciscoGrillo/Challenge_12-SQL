// Import the inquirer package to interact with the user via the command line
const inquirer = require('inquirer');
// Import the custom db module to perform database queries
const db = require('./db');

// Object containing functions to handle various database queries
const queries = {
  // Function to view all departments
  async viewAllDepartments() {
    try {
      const [rows] = await db.query('SELECT * FROM department');
      console.table(rows);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  // Function to view all roles
  async viewAllRoles() {
    try {
      const [rows] = await db.query('SELECT * FROM role');
      console.table(rows);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  // Function to view all employees
  async viewAllEmployees() {
    try {
      const [rows] = await db.query('SELECT * FROM employee');
      console.table(rows);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  // Function to add a new department
  async addDepartment() {
    try {
      const department = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:'
        }
      ]);

      await db.query('INSERT INTO department (name) VALUES (?)', [department.name]);
      console.log('Department added successfully!');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  // Function to add a new role
  async addRole() {
    try {
      const departments = await db.query('SELECT * FROM department');
      const role = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:'
        },
        // ... other prompts ...
      ]);

      await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
        role.title,
        role.salary,
        role.department_id
      ]);
      console.log('Role added successfully!');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  // ... other functions ...

  // Function to update an employee's role
  async updateEmployeeRole() {
    try {
      const employees = await db.query('SELECT * FROM employee');
      const roles = await db.query('SELECT * FROM role');
      const employeeRole = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee you want to update:',
          choices: employees[0].map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
        },
        // ... other prompts ...
      ]);

      await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeRole.role_id, employeeRole.employee_id]);
      console.log('Employee role updated successfully!');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

// Export the queries object to make its functions accessible in other files
module.exports = queries;
