set -e
# The output for this script is somewhat misleading in the success case; the
# migration:generate script will print a fail because there is no migration to generate.
# This is fine because you want there to be no migration generated. 

SUB='No changes in database schema were found'
{
  log=$(yarn migration:generate -n CHECK 2>&1)
} || {
  echo "$log"
  if [[ "$log" == *"$SUB"* ]]; then
    echo 'NO MIGRATIONS NEEDED.'
    exit 0
  fi
}

echo "$log"

# Check if migration file exists
if ls packages/server/migration/*-CHECK.ts 1> /dev/null 2>&1; then
  git fetch origin master
  FILE=$(git diff origin/master --name-only packages/server/**/*.entity.ts | head -n 1)
  echo "File $FILE: TypeORM entities were changed. You must generate a migration with: yarn migration:generate -n MIGRATION_NAME."
  exit 1
fi