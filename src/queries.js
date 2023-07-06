const db = require("./db");

// Retrieve all departments from the database
exports.getAllDepartments = () => {
  const sql = "SELECT * FROM department";
  return db(sql);
};

// Retrieve all roles from the database
exports.getAllRoles = () => {
  const sql = `
    SELECT r.id, r.title, r.salary, d.name AS department_name
    FROM role AS r
    INNER JOIN department AS d ON r.department_id = d.id
  `;
  return db(sql);
};

// Retrieve all employees from the database
exports.getAllEmployees = () => {
  const sql = `
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee AS e
    INNER JOIN role AS r ON e.role_id = r.id
    INNER JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id
  `;
  return db(sql);
};

// Insert a new department into the database
exports.addDepartment = (name) => {
  const sql = "INSERT INTO department (name) VALUES (?)";
  return db(sql, [name]);
};

// Insert a new role into the database
exports.addRole = (title, salary, departmentId) => {
  const sql =
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
  return db(sql, [title, salary, departmentId]);
};

// Insert a new employee into the database
exports.addEmployee = (firstName, lastName, roleId, managerId) => {
  const sql =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  return db(sql, [firstName, lastName, roleId, managerId]);
};

// Update the role of an employee
exports.updateEmployeeRole = (employeeId, roleId) => {
  const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
  return db(sql, [roleId, employeeId]);
};

// Insert a new department into the database
