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
    ('Phyllis', 'Vance', 11, null),
    ('Malcolm', 'Ex', 12, 1),
    ('Clark', 'Green', 12, 1),
    ('Danny', 'Cordray', 13, 1),
    ('Oscar', 'Martinez', 14, null),
    ('Dakota', 'Fann', 15, 5),
    ('Pete', 'Miller', 16, null),
    ('Meredith', 'Palmer', 17, null),
    ('Devon', 'White', 18, null),
    ('Val', 'Johnson', 19, null),
    ('Nate', 'Smith', 20, 10),
    ('Glenn', 'Dora', 20, 10),
    ('Matt', 'Howell', 20, 10),
    ('Philip', 'Johnson', 20, 10);