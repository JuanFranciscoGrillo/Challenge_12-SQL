-- Insert sample departments
INSERT INTO department (name) 
VALUES('HR'),
      ('Engineering'),
      ('Project Management'),
      ('Construction Crews'),
      ('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) 
VALUES('Project Manager', 85000.00, 3),
      ('Civil Engineer', 70000.00, 2),
      ('Marketing Coordinator', 60000.00, 4),
      ('Construction Worker', 45000.00, 4),
      ('Financial Analyst', 65000.00, 5);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Michael', 'Anderson', 1, NULL),
       ('Emily', 'Clark', 2, 1),
       ('Daniel', 'Smith', 3, 1),
       ('Olivia', 'Johnson', 4, 1),
       ('Sophia', 'Martinez', 4, 2),
       ('James', 'Williams', 5, 3);
