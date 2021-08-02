INSERT INTO departments (name)
VALUES
('Marketing'),
('Accounting'),
('Engineering'),
('Legal'),
('Human Resources'),
('Talent'),
('Sales');

INSERT INTO roles (title, salary, dept_id)
VALUES
('Manager', '70000.00', '1'),
('Accountant', '80000', '2'),
('Intern', '10.00', '3'),
('Engineer', '100000.00', '3'),
('Lawyer', '200000', '4'),
('HR Manager', '60000', '5'),
('Spice Girl', '500000.00', '6'),
('Sales Lead', '60000.00', '7' );


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', '1', NULL),
('Jim', 'Halpert', '8', '1'),
('Pam', 'Beasley', '4', '1'),
('Angela', 'Martin', '2', '1'),
('Ryan', 'Howard', '3', '1'),
('Dwight', 'Schrute', '7', '1'),
('Kevin', 'Malone', '4', '1'),
('Erin', 'Hannon', '5', '1'),
('Posh', 'Spice', '7', '9'),
('Scary', 'Spice', '7', '9'),
('Sporty', 'Spice', '7', '9'),
('Baby', 'Spice', '7', '9'),
('Ginger', 'Spice', '7', '9');


