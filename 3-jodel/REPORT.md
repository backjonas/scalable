# Project 3 - Jodel app

## Running the application in docker
### Prerequisites 
* docker
* docker-compose

The application can be started by running
```
docker-compose up --build
```

## Deploying with kubernetes
The guidelines listed below assume minikube is used. Other options should naturally work with slight modifications.
### Prerequisites
* minikube
* kubectl

### Deploying the database
The application is configured to use `cloudnative-pg`. The database controller will have to first be enabled with
```
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.18/releases/cnpg-1.18.0.yaml
```

Now, a database can be deployed with
```
kubectl apply -f kube-deployments/db-secret.yaml -f kube-deployments/cn-pg.yaml
```
Note that this deployment includes a placeholder secret for database credentials (postgres:postgres). To create a proper secret, omit `db-secret.yaml` below and create a secret with the name `jodel-db-secret` that has the username `postgres` and some password

### Deploying the app
The app requires a running database and a secret containing database credentials as described above.

The jodel-api & jodel-ui images can be built with
```
minikube image build -t jodel-api api && minikube image build -t jodel-ui ui
```

A running metrics server is required for the autoscaling feature. Such a server can be enabled in minikube with 
```
minikube addons enable metrics-server
```

After the database has been started, a database can be created for the application with
```
kubectl apply -f kube-deployments/create-database.yaml
```

The api & ui with corresponding HorizontalPodAutoscalers can be deployed with
```
kubectl apply -f kube-deployments/jodel-api.yaml -f kube-deployments/api-hpa.yaml -f kube-deployments/api-service.yaml -f kube-deployments/jodel-ui.yaml -f kube-deployments/ui-hpa.yaml -f kube-deployments/ui-service.yaml
```

Verify the hpas are working correctly, e.g. with `kubcetl get hpa -w`

If you see a TARGET of \<unknown\>/50%, the HPA is **not** working correctly. 

When testing locally, it was often necessary to wait some time (up to a couple minutes) to get the cpu measurements working.

#### Accessing the application
To access the application, run
```
minikube tunnel
```
And in a separate terminal, run
```
kubectl get svc
```
to find the external ip for the ui. The application ui can be found at `<EXTERNAL-IP>:3000`

## Running the performance tests
### Prerequisites
* k6

Performance test scripts can be found in the `k6scripts` directory.

They require a running application to function, and additionally they require changing the `externalIP` variable in each test (see *Accessing the application* above). For the POST tests, this variable should be the external IP of the jodel-api, and for the GET tests this should be the external IP of the jodel-ui.

The tests can be run with
```
k6 run test_name.js
```

For testing the scaling of the application, 


## Application structure
The application consists of one user-facing app consisting of an express api and a react frontend and one app that handles the grading of submissions.

The communication with the grading service is handled with rabbitMQ, and only one submission is graded at once. The frontend communicates with the API using API routes and websockets.

The application uses a postgres database, which the user-facing app communicates with.

## Performance test results

### K6
| Method          | Avg req/s | Median HTTP req | p(95) HTTP req | p(99) HTTP req |
| --------------- | --------- | --------------- | -------------- | -------------- |
| GET /           | 5141.02/s | 1.77ms          | 2.84ms         | 4.15ms         |
| GET /post/:id   | 3903.54/s | 2.26ms          | 3.97ms         | 5.93ms         |
| POST /api/post  | 3245.76/s | 2.63ms          | 5.51ms         | 7.23ms         |
| POST /api/reply | 3245.76/s | 2.63ms          | 5.51ms         | 7.23ms         |

### Lighthouse core web vitals

Main page performance score, desktop: 100

Main page performance score, mobile: 99 

Exercise page performance score, desktop: 100

Exercise page performance score, mobile: 96 

Over 90% of the page load time is spent with scripting & system, which is to be expected from a javascript-based react app.

To further improve the application performance grading processes could be allowed to be run in parallel, as only one process runs at once now.
Additionally, implementing a cache for submissions could improve the performance, but the real world impact of such a cache might not be very noticable, as even simple code tends to be very different. For usability, the UI would obviously need CSS to improve the experience, as well as markdown rendering for handouts and code highlighting for the user code.