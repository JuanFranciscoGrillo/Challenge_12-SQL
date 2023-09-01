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
        message: 'Enter the name of the department:',
      },
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
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department for the role:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);

    await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
      role.title,
      role.salary,
      role.department_id,
    ]);
    console.log('Role added successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to add an employee
async function addEmployee() {
  try {
    const roles = await db.query('SELECT * FROM role');
    const employees = await db.query('SELECT * FROM employee');
    const employee = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'list',
        name: 'role_id',
        message: "Select the employee's role:",
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      // Add any additional prompts for employee details here
    ]);

    await db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [
      employee.first_name,
      employee.last_name,
      employee.role_id,
    ]);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to delete a department
async function deleteDepartment() {
  try {
    const departments = await db.query('SELECT * FROM department');
    const departmentToDelete = await inquirer.prompt([
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department to delete:',
        choices: departments.map((department) => ({
          name: department.name,
          value: department.id,
        })),
      },
    ]);

    await db.query('DELETE FROM department WHERE id = ?', [departmentToDelete.department_id]);
    console.log('Department deleted successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to delete a role
async function deleteRole() {
  try {
    const roles = await db.query('SELECT * FROM role');
    const roleToDelete = await inquirer.prompt([
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role to delete:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);

    await db.query('DELETE FROM role WHERE id = ?', [roleToDelete.role_id]);
    console.log('Role deleted successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Function to delete an employee
async function deleteEmployee() {
  try {
    const employees = await db.query('SELECT * FROM employee');
    const employeeToDelete = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to delete:',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
    ]);

    await db.query('DELETE FROM employee WHERE id = ?', [employeeToDelete.employee_id]);
    console.log('Employee deleted successfully!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

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
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the new role for the employee:',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);

    await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [
      employeeRole.role_id,
      employeeRole.employee_id,
    ]);
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
  addEmployee,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  updateEmployeeRole,
  // ... Add other function exports ...
};
