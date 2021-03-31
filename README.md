# CPSC2221-Project

## Description

This is a compact command line application developed on Node.js to communicate with a local MySQL server and render HTML docs to present query results.
The application is based on a simple database of a hike organisation company, with sample data provided with the install.
It is meant to showcase an interactive design on the command line, and as a beginners' attempt to handle queries and communicate with the MySQL server.
It is still a work-in-progress, and a learning experience of utilizing Node.js.
Any feedback would be greatly appreciated, and if there are any problems or bugs please contact me and I'll provide a fix and an update as soon as possible.

---

## Installing dependencies and populating a MySQL database

You must have node.js installed on your computer.

https://nodejs.org/en/

Clone the repository and run the following on the command prompt:

```
npm run-script build
```

This should install required dependencies to run the application.

You will be prompted for information and credentials to access your local database.

When prompted for host, if you have a MySQL server hosted locally, enter `localhost`, then enter the username and password of your server.

When prompted for database name, please enter a name for a new database or the name of an empty database.

---

## Clearing application data and uninstalling the application

In the command line, run the following:

```
node uninstall
```

This would drop the database of the application. Once that is completed you could simply delete this directory.

## SQL queries used

Creating the database:

```SQL
CREATE DATABASE IF NOT EXISTS ${name}
```

Creating the tables:
```SQL
    CREATE TABLE Member (
        membershipid CHAR(7),
        member_name VARCHAR(30) NOT NULL,
        age INT NOT NULL,
        gender CHAR(1) NOT NULL,
        phone CHAR(10) NOT NULL,
        email VARCHAR(30),
        membership CHAR(1) NOT NULL,
        PRIMARY KEY(membershipid)
    );
     
    CREATE TABLE Purchase (
        purchaseid CHAR(5),
        membershipid CHAR(7) NOT NULL,
        transaction_date DATE NOT NULL,
        amount INT NOT NULL,
        PRIMARY KEY(purchaseid)
    );
     
    CREATE TABLE Instructor (
        employeeid CHAR(3),
        instructor_name VARCHAR(30) NOT NULL,
        instructor_age INT NOT NULL,
        PRIMARY KEY(employeeid)
    );
     
    CREATE TABLE HikeLocation (
        location_name CHAR(30),
        elevation INT NOT NULL,
        terrain CHAR(20) NOT NULL,
        distance INT NOT NULL,
        duration FLOAT(1) NOT NULL,
        difficulty INT NOT NULL,
        PRIMARY KEY(location_name)
    );
     
    CREATE TABLE Hike (
        hikeid CHAR(4),
        hike_date DATE NOT NULL,
        start_time INT NOT NULL,
        spots_left INT NOT NULL,
        location_name CHAR(30) NOT NULL,
        employeeid CHAR(3) NOT NULL,
        PRIMARY KEY(hikeid),
        FOREIGN KEY(location_name) REFERENCES HikeLocation(location_name),
        FOREIGN KEY(employeeid) REFERENCES Instructor(employeeid)
    );
     
    CREATE TABLE SignedUp (
        membershipid CHAR(7),
        hikeid CHAR(4),
        signed_date DATE NOT NULL,
        PRIMARY KEY(membershipid, hikeid),
        FOREIGN KEY(membershipid) REFERENCES Member(membershipid),
        FOREIGN KEY(hikeid) REFERENCES Hike(hikeid)
    );
     
    CREATE TABLE Supervises (
        employeeid CHAR(3),
        supervisorid CHAR(3) NOT NULL,
        PRIMARY KEY(employeeid),
        FOREIGN KEY(employeeid) REFERENCES Instructor(employeeid),
        FOREIGN KEY(supervisorid) REFERENCES Instructor(employeeid)
    );
```

Inserting data into the table:

```SQL
    INSERT INTO Member VALUES('1000001', 'John Doe', 28, 'M', '7787889988', 'JohnDoe@gmail.com', 'A');
    INSERT INTO Member VALUES('1000002', 'Mary Watkins', 24, 'F', '7785773344', 'MaryWatkins@gmail.com', 'B');
    INSERT INTO Member VALUES('1000003', 'Simon Fraser', 39, 'M', '7788899988', 'SimonFraser@gmail.com', 'A');
    INSERT INTO Member VALUES('1000004', 'Agatha Thompson', 44, 'F', '7782210098', 'AgathaT@gmail.com', 'C');
    INSERT INTO Member VALUES('1000005', 'Wayne Bruce', 33, 'M', '7788780099', 'WayneBruce@gmail.com', 'C');
    
    INSERT INTO Purchase VALUES('10001', '1000004', '04/28/2020', 120);
    INSERT INTO Purchase VALUES('10002', '1000002', '05/02/2020', 250);
    INSERT INTO Purchase VALUES('10003', '1000001', '05/11/2020', 5);
    INSERT INTO Purchase VALUES('10004', '1000004', '05/13/2020', 3);
    INSERT INTO Purchase VALUES('10005', '1000003', '05/17/2020', 200);
    
    INSERT INTO Instructor VALUES('A32', 'Luke Skywalker', 25);
    INSERT INTO Instructor VALUES('C81', 'Ben Jamin', 19);
    INSERT INTO Instructor VALUES('B29', 'Tony Hawk', 42);
    INSERT INTO Instructor VALUES('A18', 'Alex zander', 33);
    INSERT INTO Instructor VALUES('C44', 'Sally Wendle', 22);
    INSERT INTO Instructor VALUES('C11', 'Devon Noved', 39);
    INSERT INTO Instructor VALUES('C88', 'Tom Brady', 42);
    
    INSERT INTO HikeLocation VALUES('Garibaldi Lake Trail', 1012, 'forest', 20, 5.5, 2);
    INSERT INTO HikeLocation VALUES('Bowen Lookout', 605, 'rocky', 12, 3.5, 1);
    INSERT INTO HikeLocation VALUES('Spirit Caves Trail', 475, 'stairway', 5, 3.5, 2);
    INSERT INTO HikeLocation VALUES('Lightning Lake Loop', 0, 'paved path', 9, 2.5, 1);
    INSERT INTO HikeLocation VALUES('Abby Grind', 330, 'forest', 4, 1.5, 2);
    
    INSERT INTO Hike VALUES('1000', '05/01/2020', 12, 3, 'Abby Grind', 'B29');
    INSERT INTO Hike VALUES('1001', '05/03/2020', 8, 5, 'Bowen Lookout', 'A18');
    INSERT INTO Hike VALUES('1002', '05/07/2020', 9, 6, 'Spirit Caves Trail', 'A32');
    INSERT INTO Hike VALUES('1003', '05/10/2020', 14, 5, 'Abby Grind', 'C44');
    INSERT INTO Hike VALUES('1004', '05/12/2020', 15, 8, 'Lightning Lake Loop', 'C81');
    
    INSERT INTO SignedUp VALUES('1000003', '1000', '04/24/2020');
    INSERT INTO SignedUp VALUES('1000001', '1004', '05/03/2020');
    INSERT INTO SignedUp VALUES('1000004', '1001', '04/23/2020');
    INSERT INTO SignedUp VALUES('1000002', '1004', '04/30/2020');
    INSERT INTO SignedUp VALUES('1000003', '1002', '05/01/2020');
    
    INSERT INTO Supervises VALUES('C81', 'A32');
    INSERT INTO Supervises VALUES('C44', 'A18');
    INSERT INTO Supervises VALUES('B29', 'A32');
    INSERT INTO Supervises VALUES('C11', 'A32');
    INSERT INTO Supervises VALUES('C88', 'B29');
```