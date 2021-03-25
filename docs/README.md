## Getting Started

You first need to generate the country seed script `docker-entrypoint-initdb.d/015_seed_countries.sql`. A script has been provided in this repository that can easily do this for you, just run it from the CLI:

```shell
$ ./seed_countries.sh
```

After that, you can use docker-compose to bootstrap the database with all the data and start it up:

```shell
$ docker-compose up
```

Besides the DB, this will also start a PGAdmin instance that you can access from any web browser using `http://localhost`. The user and password are provided in the `docker-compose.yml` file.

It will also start a Mock API Server that serves examples from the openapi.yaml file. E.g.:

```shell
curl localhost:8000/tournaments/1/fixtures
```

```shell
$ docker run \
    -it \
    --rm \
    --name sweepstakes-backend \
    -p 3000:3000 \
    -p 9229:9229 \
    -p 9230:9230 \
    -v "$PWD:/opt/app:delegated"
    -v "$PWD/package.json:/opt/package.json"
    -v "$PWD/package-lock.json:/opt/package-lock.json"
    -e NODE_ENV=development \
    -e POSTGRES_DB=sweepstakes \
    -e POSTGRES_USER=sweepstakes \
    -e POSTGRES_PASSWORD=secret \
    -e DB_HOSTNAME=postgres
    --network=sweepstakes-backend
    backend:latest
```
