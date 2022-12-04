project update procedures
git pull project and change ormconfig.ts if necessary for postgres connection
run following commands.

### build project

yarn build

### pm2 setup

pm2 delete prod
pm2 start --name prod
