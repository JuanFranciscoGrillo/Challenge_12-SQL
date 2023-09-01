const inquirer = require('inquirer');
const db = require('./db');

// Function to view all departments
async function viewAllDepartments() {
  try {
    const departments = await db.query('SELECT * FROM department');
    console.table(departments);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to view all roles
async function viewAllRoles() {
  try {
    const roles = await db.query('SELECT * FROM role');
    console.table(roles);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to view all employees
async function viewAllEmployees() {
  try {
    const employees = await db.query('SELECT * FROM employee');
    console.table(employees);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to add a new department
async function addDepartment() {
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
}

// Function to add a new role
async function addRole() {
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
}

// ... Add other functions ...

// Function to update an employee's role
async function updateEmployeeRole() {
  try {
    const employees = await db.query('SELECT * FROM employee');
    const roles = await db.query('SELECT * FROM role');
    const employeeRole = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee you want to update:',
        choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
      },
      // ... other prompts ...
    ]);

    await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeRole.role_id, employeeRole.employee_id]);
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Export all the functions to make them accessible
module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  // ... Add other function exports ...
  updateEmployeeRole
};
