USE employee_trackerDB;

INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Marketing");
INSERT INTO departments (name)
VALUES ("Human Resources");
INSERT INTO departments (name)
VALUES ("Operations");
INSERT INTO departments (name)
VALUES ("Sales");
INSERT INTO departments (name)
VALUES ("Legal");
INSERT INTO departments (name)
VALUES ("Customer Success");

INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Engineer", 95000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Engineer", 70000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineering Intern", 40000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Director of Marketing", 95000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Assistant", 65000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Manager", 75000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("HR Analyst", 65000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Office Manager", 75000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Office Assistant", 45000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 90000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 65000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Manager of Legal Affairs", 120000, 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("In-House Counsel", 90000, 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Coordinator", 65000, 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Success Manager", 75000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Success Lead", 60000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Success Assistant", 45000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Eyre", 15, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Elizabeth", "Bennett", 6, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Anne", "Shirley", 4, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jo", "March", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "March", 5, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Daisy", "Buchanan", 4, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jay", "Gatsby", 12, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Edward", "Rochester", 13, 12);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Holden", "Caulfield", 17, 15);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Ripley", 15, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Dick", "Diver", 14, 12);
