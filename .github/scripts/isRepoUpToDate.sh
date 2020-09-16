UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [!$LOCAL = $REMOTE && $LOCAL = $BASE]; then
  UPTODATE="false"
else 
  UPTODATE="true"
fi
echo "::set-output name=uptodate::$UPTODATE"