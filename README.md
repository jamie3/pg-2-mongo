# Postgres to Mongo

Example project that shows how to subscribe to data changes in Postgres and save them into MongoDB.

## Setup

1. Install node packages. Run `yarn install`
1. Create the prisma files. `yarn prisma:generate`
1. Run `yarn install` followed by `yarn prisma:generate`
1. Create a `.env` file with the following

```
MONGODB_URL="mongodb://localhost:21717"

POSTGRES_DB="pg_2_mongo"
POSTGRES_USER="jamie"
POSTGRES_PASSWORD="password"

SLOT_NAME="test_slot_wal2json"
```

This project relies on Postgres and MongoDB. We recommend using Docker compose.

1. Install Postgres and Mongo

    - `docker compose up -d`

Create the replication slot

```sql
SELECT * FROM pg_create_logical_replication_slot('test_slot_wal2json', 'wal2json')
```

You might need to set the `wal_level=logical`

```sql
SHOW wal_level;

ALTER SYSTEM SET wal_level = logical;
```

## Run Locally

Run the following command `yarn dev`

## Run Production

To run the project in production

1. Build the app `yarn build`
1. Run the app `yarn start`
