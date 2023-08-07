### for installation on ubuntu 20.04

### dependencies to be installed: Node, Yarn, Postgres,

### Install Node v12

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

### Install Yarn

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bashrc

### Install Postgres: can skip if postgres is already install and started

sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
sudo -i -u postgres

### If Postgres is installed, change url in packages/server/ormconfig.ts to ensure connection

### install and start redis

sudo apt install redis
sudo systemctl redis

### under /var/www

git clone https://github.com/ubco-db/office-hours.git

### cd into git repo(default name: office-hours) root folder and install dependencies

yarn install

yarn build

### nginx for proxy purposes. NOTE: can be replaced by running devproxy.js in infrastructure/dev

1. Setup NGINX:
   sudo yarn install nginx
2. In root folder of repo, copy the file `infrastructure/prod/nginx.conf` from our repo to `/etc/nginx/nginx.conf`
   sudo cp infrastructure/prod/nginx.conf /etc/nginx/nginx.conf
3. sudo service nginx restart

### pm2 setup and start project with pm2 (if failed, run yarn prod:start to test)

yarn global add pm2

pm2 start --name helpme "yarn prod:start"

### some other useful pm2 commands

pm2 stop all
pm2 delete all

### add courses

### Inside root folder run: `yarn cli create:admin <username>` then add your password through stdin.

### courses can be added through domain/admin, but note to add semester model first before courses. Prof/ta must be added through admin.
