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
kubectl apply -f kubernetes/db-secret.yaml -f kubernetes/cn-pg.yaml
```
Note that this deployment includes a placeholder secret for database credentials (postgres:postgres). To create a proper secret, omit `db-secret.yaml` above and create a secret with the name `jodel-db-secret` that has the username `postgres` and some password

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
kubectl apply -f kubernetes/create-database.yaml
```

The api & ui with corresponding HorizontalPodAutoscalers can be deployed with
```
kubectl apply -f kubernetes/jodel-api.yaml -f kubernetes/api-hpa.yaml -f kubernetes/api-service.yaml -f kubernetes/jodel-ui.yaml -f kubernetes/ui-hpa.yaml -f kubernetes/ui-service.yaml
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
to find the external ip for the application UI. The application can now be accessed at `<EXTERNAL-IP>:3000`. As this IP points to the reverse proxy, both the API and UI can be accessed at this IP.

## Running the performance tests
### Prerequisites
* k6

Performance test scripts can be found in the `k6scripts` directory.

They require a running application to function, and additionally they require changing the `externalIP` variable in each test (see *Accessing the application* above).

The tests can be run with
```
k6 run test_name.js
```

For testing the scaling of the application, the test *simulate_load* can be run. This is just the get_mainpage test with a running time of 300s. As such, this only affects the UI pods, but the API scaling is identical.


## Application structure
The application consists of a user-facing UI, that consists of a Gatsby app that is served with nginx. The UI communicates with an Express API, that uses TypeORM to interface with a CloudnativePG database.

The UI and API are configured to automatically scale between 1 and 10 pods based on their load, while the database is set to use 3 pods.

## Performance test results

### K6
| Method          | Avg req/s | Median HTTP req | p(95) HTTP req | p(99) HTTP req |
| --------------- | --------- | --------------- | -------------- | -------------- |
| GET /           | 2086.62/s | 2.17ms          | 12.53ms        | 52.91ms        |
| GET /post/:id   | 2151.61/s | 2.14ms          | 10.78ms        | 52.44ms        |
| POST /api/post  | 32.71/s   | 202.58ms        | 974.99ms       | 2.16s          |
| POST /api/reply | 16.21/s   | 573.45ms        | 1.1s           | 1.38s          |

### Lighthouse core web vitals
| Page       | Performance | Accessibility | Best practices | SEO |
| ---------- | ----------- | ------------- | -------------- | --- |
| Main page  | 98          | 80            | 92             | 78  |
| Post page  | 100         | 80            | 92             | 78  |


The ui part of the application runs well, but there seems to be some serious problems with the database communication. It is unclear where exactly the issue lies, but something in the chain of kube ingress -> nginx -> API -> DB is not working as it should, and should be investigated and fixed. In the previous projects, a basic API with a similar structure was around 100 times faster, which makes this implementation quite unusable in its current state. The GET performance tests do not actually interact with the database, as the post fetching happens only after the page has been loaded. As such, the database is one likely culprit for these performance issues. Additionally, the 95th and 99th percentiles for the GET functions are quite slow. This should also be investigated further.