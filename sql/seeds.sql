-- Insert sample departments
INSERT INTO department (name) VALUES
  ('HR'),
  ('Engineering'),
  ('Marketing');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Manager', 80000.00, 1),
  ('Software Engineer', 60000.00, 2),
  ('Marketing Specialist', 55000.00, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Alejandro', 'González', 1, NULL),
  ('Sofía', 'Ramírez', 2, 1),
  ('Diego', 'Hernández', 3, 1);
