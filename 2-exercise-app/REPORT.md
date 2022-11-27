# Project 2 - Exercise submission service

## Running the applications
### Prerequisites 
* docker
* docker-compose

The application can be started by running
```
docker-compose up --build
```

The application is tested to work with native Ubuntu as well as Ubuntu in WSL2. The docker-in-docker solution used by the grader service is somewhat inconsistent (on WSL2 atleast). The problem seemed to get fixed most of the time by just recreating the container.

## Running the performance tests
### Prerequisites
* k6

Performance test scripts can be found in the `k6scripts` directory.
They require an application running at localhost:5000 to function (see *Running the applications* above).

The tests can be run with
```
k6 run test_name.js
```

Please note that running the POST test fills up rabbitMQ with around 1000 messages each second. These can be cleared e.g. by logging into the rabbitMQ console at `localhost:15672` (default credentials are exercise:exercise)


## Application structure
The application consists of one user-facing app consisting of an express api and a react frontend and one app that handles the grading of submissions.

The communication with the grading service is handled with rabbitMQ, and only one submission is graded at once. The frontend communicates with the API using API routes and websockets.

The application uses a postgres database, which the user-facing app communicates with.

## Performance test results

### K6
| Method                | Avg req/s | Median HTTP req | p(95) HTTP req | p(99) HTTP req |
| --------------------- | --------- | --------------- | -------------- | -------------- |
| GET /                 | 5141.02/s | 1.77ms          | 2.84ms         | 4.15ms         |
| GET /exercise/:id     | 3903.54/s | 2.26ms          | 3.97ms         | 5.93ms         |
| POST /api/submission  | 3245.76/s | 2.63ms          | 5.51ms         | 7.23ms         |

### Lighthouse performance results

Main page performance score, desktop: 100
Main page performance score, mobile: 99 
Exercise page performance score, desktop: 100
Exercise page performance score, mobile: 96 
