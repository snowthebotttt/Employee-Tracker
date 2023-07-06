const inquirer = require("inquirer");
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./queries");

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { menuChoice } = answers;
      switch (menuChoice) {
        case "View all departments":
          getAllDepartments().then((departments) => {
            console.table(departments);
            startApp();
          });
          break;
        case "View all roles":
          getAllRoles().then((roles) => {
            console.table(roles);
            startApp();
          });
          break;
        case "View all employees":
          getAllEmployees().then((employees) => {
            console.table(employees);
            startApp();
          });
          break;
        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "departmentName",
                message: "Enter the name of the new department:",
              },
            ])
            .then((answers) => {
              addDepartment(answers.departmentName).then(() => {
                console.log("New department added successfully!");
                startApp();
              });
            });
          break;
        case "Add a role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "roleTitle",
                message: "Enter the title of the new role:",
              },
              {
                type: "input",
                name: "roleSalary",
                message: "Enter the salary of the new role:",
              },
              {
                type: "input",
                name: "departmentId",
                message: "Enter the department ID for the new role:",
              },
            ])
            .then((answers) => {
              addRole(
                answers.roleTitle,
                answers.roleSalary,
                answers.departmentId
              ).then(() => {
                console.log("New role added successfully!");
                startApp();
              });
            });
          break;
        case "Add an employee":
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "Enter the first name of the new employee:",
              },
              {
                type: "input",
                name: "lastName",
                message: "Enter the last name of the new employee:",
              },
              {
                type: "input",
                name: "roleId",
                message: "Enter the role ID for the new employee:",
              },
              {
                type: "input",
                name: "managerId",
                message: "Enter the manager ID for the new employee:",
              },
            ])
            .then((answers) => {
              addEmployee(
                answers.firstName,
                answers.lastName,
                answers.roleId,
                answers.managerId
              ).then(() => {
                console.log("New employee added successfully!");
                startApp();
              });
            });
          break;
        case "Update an employee role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "employeeId",
                message: "Enter the ID of the employee to update:",
              },
              {
                type: "input",
                name: "newRoleId",
                message: "Enter the new role ID for the employee:",
              },
            ])
            .then((answers) => {
              const { employeeId, newRoleId } = answers;
              updateEmployeeRole(employeeId, newRoleId).then(() => {
                console.log("Employee role updated successfully!");
                startApp();
              });
            });
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit(0);
        default:
          console.log("Invalid choice. Please try again.");
          startApp();
      }
    })
    .catch((error) => {
      console.log("An error occurred:", error);
      process.exit(1);
    });
}

startApp();
