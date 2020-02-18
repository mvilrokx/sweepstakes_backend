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
