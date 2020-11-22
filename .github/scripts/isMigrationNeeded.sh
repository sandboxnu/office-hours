set -e

yarn migration:generate -n CHECK || true
# Check if migration file exists
if ls packages/server/migration/*-CHECK.ts 1> /dev/null 2>&1; then
  git fetch origin master
  FILE=$(git diff origin/master --name-only packages/server/**/*.entity.ts | head -n 1)
  echo "File $FILE: TypeORM entities were changed. You must generate a migration with: yarn migration:generate -n MIGRATION_NAME."
  exit 1
fi