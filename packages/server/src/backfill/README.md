Backfills are little scripts for when we change how we work with data, and need to backport changes to existing data. 

There is nothing special about backfills. They're just scripts that change data! They just require some extra care so that we don't destroy our data.

## Running
Running backfills is just done via `yarn cli` on prod.

If your PR requires backfilled code to function, you should move the backfill to a new PR, merge it, run the backfill, then merge the feature PR!

## Vs. Migrations

DB Migrations are only for changing the SQL 