INSERT INTO departments (name)
VALUES
('aruba'),
('jamaica'),
('bermuda'),
('bahama'),
('key largo'),
('montego'),
('kokomo');

INSERT INTO roles (title, salary, dept_id)
VALUES
('manager', '70000.00', '1'),
('intern', '10.00', '5'),
('engineer', '100000.00', '7'),
('beach boy', '500000.00', '4');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('michael', 'scott', '1', NULL),
('jim', 'halpert', '4', '2'),
('pam', 'beasley', '4', '2'),
('ryan', 'howard', '2', '1'),
('dwight', 'schrute', '3', '1'),
('stanley', 'yelnats', '2', '1');

