# application-tracker

## About

This project contains the backend app for a job application tracker. It will allow a user to import job posting details,
record jobs that they've applied to, receive follow-up reminders, and analyze the effectiveness of their applications.

The app communicates with clients via a REST API, and is built with Node.js, Express.js, TypeScript, and PostgreSQL.
It's fully dockerized, and includes unit and integration tests using Jest.

The general project structure is as follows:

1. `/models` - functionality that interacts with the app's database. 
2. `/routes` - REST API handler functionality. Performs request validation, and directs requests to be handled by specific controller functions. Sends output from controller functions 
to the client.
3. `/controllers` - delegates tasks to various services and model functions, and returns the results to the route handler to be output.
4. `/services` - includes functionality provided from external services, such as SDKs.

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

Tests are contained in the `__tests__` directory, and broken into subdirectories by test type. 
Manually mocked services, such as node modules, are included in the `__mocks__` directory.
