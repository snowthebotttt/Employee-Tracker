INSERT INTO department (id, name)
VALUES (1, 'Sales'), (2, 'Marketing');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Manager', 50000, 1), (2, 'Marketing Coordinator', 35000, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL), (2, 'Jane', 'Smith', 2, 1);
