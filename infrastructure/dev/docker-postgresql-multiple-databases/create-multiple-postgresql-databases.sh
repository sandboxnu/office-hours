#!/bin/bash

# From https://github.com/mrts/docker-postgresql-multiple-databases

function create_user_and_databases() {
    local user=$1
    local password=$2
    local databases=$3

    echo "  Creating user '$user' with password and multiple databases: $databases"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
        CREATE USER $user WITH PASSWORD '$password';
		EOSQL

    for db in $(echo $databases | tr ',' ' '); do
        echo "  Creating database '$db' and granting privileges to user '$user'"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
            CREATE DATABASE $db;
            GRANT ALL PRIVILEGES ON DATABASE $db TO $user;
						ALTER DATABASE $db OWNER TO $user;
				EOSQL
    done
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    create_user_and_databases "$POSTGRES_NONROOT_USER" "$POSTGRES_NONROOT_PASSWORD" "$POSTGRES_MULTIPLE_DATABASES"
    echo "User and multiple databases created"
fi
