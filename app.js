// Import the inquirer package for user input
const inquirer = require('inquirer');

// Import custom queries module for database operations
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
       'Delete a department',
       'Delete a role',
       'Delete an employee',
       'Exit',
     ],
   },
 ])
 .then(async (answers) => {
   console.log('User selected action:', answers.action);

   const { action } = answers;

   // Execute the corresponding function based on user's choice
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
     case 'Delete a department':
       console.log('Deleting a department...');
       await queries.deleteDepartment();
       break;
     case 'Delete a role':
       console.log('Deleting a role...');
       await queries.deleteRole();
       break;
     case 'Delete an employee':
       console.log('Deleting an employee...');
       await queries.deleteEmployee();
       break;
     case 'Exit':
       console.log('Goodbye!');
       process.exit(0);
     default:
       console.log('Invalid action.');
   }

   // Restart the app again for the next action
   startApp();
 })
 .catch((error) => {
   console.error('An error occurred:', error);
 });
}

// Start the application
startApp();