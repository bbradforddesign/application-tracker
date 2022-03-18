# application-tracker

## About

This project contains the backend app for a job application tracker. It will allow a user to import job posting details,
record jobs that they've applied to, receive follow-up reminders, and analyze the effectiveness of their applications.

The app communicates with clients via a REST API, and is built with Node.js, Express.js, TypeScript, and PostgreSQL.
It's fully dockerized, and includes unit and integration tests using Jest.

The general structure is as follows:

1. `/models` - defines data structures that will be used throughout the application. 
2. `/routes` - performs request validation, and directs requests to be handled by specific controller functions. Sends output from controller functions 
to the client.
3. `/controllers` - delegates tasks to various service functions, and returns the results to the route handler to be output.
4. `/services` - simple functions that perform a single task. May include functionality such as performing a CRUD operation on a database record, 
sending an external API request, etc.

## Running the App

To run the app, first ensure that docker is installed on your device.

Next, navigate to the app's root directory, and run:
```
docker compose up
```
to start the app's container and services. 

To close the app, run:
```
docker compose down
```

## Running Tests

To run tests, `jest` must be called from within the docker container in order for it to run properly. 

While the app's docker container is running, open an interactive terminal for the `api` service. Within that terminal, run:
```
npm test
```
