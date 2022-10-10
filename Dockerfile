FROM postgres:14
RUN apt-get update

## Install Wal2Json plugin
RUN apt-get install -y postgresql-14-wal2json
