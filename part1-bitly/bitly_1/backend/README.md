# Feedbackapi
Minimal API for collecting feedback written as part of a recruitment process

## Technologies
The API uses TypeORM and express to access a postgresql server

## Running the application

### Prerequisites
```
docker
docker-compose
```

### Production
The app can be run in a production environment with 
```
docker-compose up
```
The docker networking should be changed if the app is actually deployed

### Development

The app can be run in a development environment with
```
docker-compose -f docker-compose.test.yml up
```


## API description
The API has one route at  ```/api/feedback```

The API supports basic HTTP requests (GET, POST, DELETE, PUT) and utilises json, example API calls can be found in [requests/feedback/](requests/feedback/)

The API calls are witten for the REST Client vscode plugin but should work with most similar programs