# Postgres to Mongo

Example project that shows how to subscribe to data changes in Postgres and save them into MongoDB.

## Setup

1. Install node packages. Run `yarn install`
1. Create the prisma files. `yarn prisma:generate`
1. Run `yarn install` followed by `yarn prisma:generate`
1. Create a `.env` file with the following. See `.env.example`.

This project relies on Postgres and MongoDB. We recommend using Docker compose.

1. Install Postgres and Mongo `docker compose up -d`
1. Ensure the WAL level is logical. If this fails in RDS then you need to create a new parameter group and set `rds.logical_replication=1`.

```sql
SHOW wal_level;

ALTER SYSTEM SET wal_level = logical;
```

1. Create the replication slot `SELECT * FROM pg_create_logical_replication_slot('test_slot_wal2json', 'wal2json')`

## Run Locally

Run the following command `docker compose up -d` to start the databases and `yarn dev` to run the app.

## Run Production

To run the project in production

1. Build the app `yarn build`
1. Run the app `yarn start`

## Additional Notes

-   https://github.com/eulerto/wal2json
-   https://www.npmjs.com/package/pg-logical-replication

```

```
