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

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Phyllis', 'Vance', 11),
    ('Malcolm', 'Ex', 12),
    ('Clark', 'Green', 12),
    ('Danny', 'Cordray', 13),
    ('Oscar', 'Martinez', 14),
    ('Dakota', 'Fann', 15),
    ('Pete', 'Miller', 16),
    ('Meredith', 'Palmer', 17),
    ('Devon', 'White', 18),
    ('Val', 'Johnson', 19),
    ('Nate', 'Smith', 20),
    ('Glenn', 'Dora', 20),
    ('Matt', 'Howell', 20),
    ('Philip', 'Johnson', 20);