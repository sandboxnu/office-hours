yarn typeorm migration:run
yarn typeorm migration:generate -n CHECK
test -e packages/server/migration/*-CHECK.ts && echo 'You must generate a migration' && exit 1