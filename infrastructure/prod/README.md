This is for deploying production to a single machine using docker.

Running the docker-compose file will setup:

- API server on port 3002
- Frontend app server on port 3001
- NGINX on port 80 reverse proxying

You must run Postgres on a VM yourself, as Postgres-in-docker is a good way to lose production data.
