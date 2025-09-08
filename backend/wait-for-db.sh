#!/bin/bash
set -e

host="$DB_HOST"
port="$DB_PORT"
user="$DB_USERNAME"
database="$DB_NAME"

echo "Waiting for PostgreSQL at $host:$port..."

until PGPASSWORD=$DB_PASSWORD psql -h "$host" -p "$port" -U "$user" -d "$database" -c '\q'; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - executing command"
exec "$@"