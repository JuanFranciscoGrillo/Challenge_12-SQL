// Import the inquirer package to interact with the user via the command line
const inquirer = require('inquirer');

// Import the custom queries module to handle database queries
const queries = require('./querries.js');

// Function to start the application
function startApp() {
  console.log('App started'); // Debug message

  // Prompt the user with a list of actions
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then(async (answers) => {
      console.log('User selected action:', answers.action);

      const { action } = answers;

      // Based on user action, execute the corresponding function from the queries module
      switch (action) {
        case 'View all departments':
          console.log('Viewing all departments...');
          await queries.viewAllDepartments();
          break;
        case 'View all roles':
          console.log('Viewing all roles...');
          await queries.viewAllRoles();
          break;
        case 'View all employees':
          console.log('Viewing all employees...');
          await queries.viewAllEmployees();
          break;
        case 'Add a department':
          console.log('Adding a department...');
          await queries.addDepartment();
          break;
        case 'Add a role':
          console.log('Adding a role...');
          await queries.addRole();
          break;
        case 'Add an employee':
          console.log('Adding an employee...');
          await queries.addEmployee();
          break;
        case 'Update an employee role':
          console.log('Updating an employee role...');
          await queries.updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
        default:
          console.log('Invalid action.');
      }

      // After an action is completed, start the app again for the next action
      startApp();
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// Start the application
startApp();
