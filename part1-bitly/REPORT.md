# Project 1 - Bitly clone
## Running the applications
### Prerequisites 
* docker
* docker-compose

Very brief descriptions for each application can be found in the `README.md` file of each application directory.

Each application with their corresponding database can be run with docker-compose, e.g. as follows:
```
cd bitly_1 && docker-compose up --build
```

## Running the performance tests
### Prerequisites
* k6

Performance test scripts can be found in the `k6scripts` directory.
They require an application running at localhost:5000 to function (see *Running the applications* above).

The tests can be run with
```
k6 run test_name.js
```

The tests are **not** idempotent, and as such it is recommended to run the tests in the same order when comparing the different applications.
Especially the get_random script will be affected by the number of URLs in the database. The database will have to be cleared manually to remove created URLs.

The recommended test order for each application is as follows:
1. create_test_data.js - This populates the database with 3000 URLs. No meaningful output.
2. get_mainpage.js - This tests fetching the mainpage from the `/` path.
3. get_random.js - This tests fetching a URL from the `/random` path
4. get_id.js - This tests fetching a specific URL from the `/<url>` path. Creates one URL to the database per test run.
5. post.js - This tests creating new URLs. Creates a lot of new URLs to the database - somewhere around ~1000/s.

## Performance test results
### Version 1
Technologies used: Express, TypeORM, Postgres (and React)

| Method      | Avg req/s | Median HTTP req | p(95) HTTP req | p(99) HTTP req |
| ----------- | --------- | --------------- | -------------- | -------------- |
| GET /       | 2804.40/s | 3.36ms          | 4.35ms         | 6.73ms         |
| GET /:id    | 1386.63/s | 6.55ms          | 8.81ms         | 12.35ms        |
| GET /random | 72.34/s   | 124.52ms        | 173.55ms       | 477.1ms        |
| POST /      | 692.71/s  | 13.16ms         | 16.76ms        | 25.65ms        |


### Version 2
Technologies used: Fastify, Postgres (and React)

| Method      | Avg req/s | Median HTTP req | p(95) HTTP req | p(99) HTTP req |
| ----------- | --------- | --------------- | -------------- | -------------- |
| GET /       | 3051.08/s | 2.93ms          | 4.45ms         | 7.7ms          |
| GET /:id    | 4872.90/s | 1.91ms          | 2.62ms         | 4.87ms         |
| GET /random | 1811.82/s | 4.82ms          | 9.13ms         | 12.83ms        |
| POST /      | 2602.94/s | 3.28ms          | 6.14ms         | 9.89ms         |


### Version 3
Technologies used: Flask, SQLAlchemy, Postgres (and React)

| Method      | Avg req/s | Median HTTP req | p(95) HTTP req | p(99) HTTP req |
| ----------- | --------- | --------------- | -------------- | -------------- |
| GET /       | 641.75/s  | 13.98ms         | 24.58ms        | 30.62ms        |
| GET /:id    | 464.32/s  | 21.1ms          | 25.06ms        | 28.38ms        |
| GET /random | 439.14/s  | 22.17ms         | 27.47ms        | 30.81ms        |
| POST /      | 449.68/s  | 21.61ms         | 25.86ms        | 31.99ms        |

## Performance test summary
As all 3 applications use the same database (Postgres) and frontend (React), the only measured differences should originate from the API libraries and how they interface with the database. 
The 3 applications have very clear performance differences, with Fastify being the fastest by a large margin.
The Express application is close to Fastify when serving the mainpage, but in all other cases Fastify is between 2 and *25* times faster than the other applications.
As the difference between the two libraries comes only when accessing the database, it seems like the performance difference between the API functions of Fastify and Express are negligible, while Fastifys postgres functions greatly outperform those from TypeORM.

The Flask based application is the slowest one overall, with the exception that it beats out Express in the /random functionality, as that is extremelt slow in the Express app.
This is quite surprising, as all the applications *should* be using the same logic for the random function (sort all objects by random -> pick first object).
Clearly something is off with TypeORMs implementation as it takes ~25x longer than the version used by Fastify.

The reason for Flask being so much slower than the other apps is unclear, but some likely culprits are python instead of javascript, as well as using very different database libraries.
Additionally, Flask should be run with a WSGI server such as Gunicorn in front of the application, something this application does not do.
Running the Flask app correctly would allow for some level of multiprocessing (among other things), which should improve the performance.


### Future performance improvements
To improve the performance of the applications, three clear pain points stick out.
Firstly, the `/random` functionality scales very poorly with growing databases, as it randomizes the *whole* dataset before returning one URL. 
This should clearly be done in a smarter way, e.g. by using numeric id:s allowing the application to request a random number in the range of id:s.
Secondly, the frontend is written in React, which makes the static files reach a staggering 1MB just for this simple one-form page. 
Some smarter library choices (or just using plain html) could probably cut down this size by a factor of 1000.
And finally, the Postgres database is very slow, as it has to write each operation directly to disk.
This speed of the database operations could be improved greatly by using an in-memory database (such as REDIS) as a cache between the Postgres database and the application.

For the Flask application, the app should naturally be run correctly with a WSGI server instead of just using the development server it uses now.
If the results stay close to the current ones even with a WSGI server, it seems that Flask (or SQLAlchemy, whichever is the bottleneck) should just be avoided completely if performance is a priority