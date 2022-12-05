project update procedures
git pull project and change ormconfig.ts if necessary for postgres connection
run following commands.

### build project (yarn install maybe ran if there are new packages)

yarn install

yarn build

### pm2 setup

pm2 delete prod
pm2 start --name prod "yarn prod:start"
