FROM node:15 AS builder
WORKDIR /script
COPY seed_countries.sh .
RUN chmod +x seed_countries.sh \
  && ./seed_countries.sh

FROM postgres:13.2
COPY --from=builder /script/015_seed_countries.sql /docker-entrypoint-initdb.d/
COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d/
EXPOSE 5432