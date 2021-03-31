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