INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Product Oversight'),
    ('Warehouse');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Regional Director of Sales', 95000, 1),
    ('Sales Rep.', 65000, 1),
    ('Traveling Sales Rep.', 85000, 1),
    ('Chief Accountant', 95000, 2),
    ('Accountant', 82000, 2),
    ('Customer Service Rep.', 50000, 3),
    ('Supplier Relations Rep.', 55000, 3),
    ('Quality Assurance Rep.', 52000, 3),
    ('Warehouse Foreman', 95000, 4),
    ('Warehouse Staff', 52500, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Phyllis', 'Vance', 1, null),
    ('Malcolm', 'Ex', 2, null),
    ('Clark', 'Green', 2, null),
    ('Danny', 'Cordray', 3, null),
    ('Oscar', 'Martinez', 4, null),
    ('Dakota', 'Fann', 5, null),
    ('Pete', 'Miller', 6, null),
    ('Meredith', 'Palmer', 7, null),
    ('Devon', 'White', 8, null),
    ('Val', 'Johnson', 9, null),
    ('Nate', 'Smith', 10, null),
    ('Glenn', 'Dora', 10, null),
    ('Matt', 'Howell', 10, null),
    ('Philip', 'Johnson', null, null);