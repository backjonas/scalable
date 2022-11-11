# Bitly clone v2
Simple bitly clone written with React, Fastify and Postgresql

A main page is found at `/`

New short URLs can be created with the main page or by sending a POST to `/` with the json contents 
```json
{ longUrl: 'some-long-url.com' }
```
`/<shortUrl>` redirects to the long URL corresponding to the short URL.

`/random` redirects to a random short URL, if one exists.

## File structure
The source code for the application can be found in the `backend` and `frontend` directories.

All 3 bitly clones share the same simple React frontend.

### Prerequisites
```
docker
docker-compose
```

### Running the application
The app can be run with 
```
docker-compose up
```