#!/bin/bash

# Path to the SQLite database
DB_FILE="/app/src/database.sqlite"

# Path to the SQL initialization file
INIT_FILE="/app/init.sql"

echo "starting"

# Check if the database file exists
if [ ! -f "$DB_FILE" ]; then
  echo "Database file not found. Creating database and initializing schema."
  sqlite3 "$DB_FILE" < "$INIT_FILE"
else
  # Check if the table exists
  TABLE_EXISTS=$(sqlite3 "$DB_FILE" "SELECT name FROM sqlite_master WHERE type='table' AND name='health';")

  if [ -z "$TABLE_EXISTS" ]; then
    echo "Table 'health' not found. Initializing schema."
    sqlite3 "$DB_FILE" < "$INIT_FILE"
  else
    echo "Table 'health' already exists. Skipping initialization."
  fi
fi
