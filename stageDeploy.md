# For deployment on UBC server (Ubuntu)

## Dependencies to be installed: Node, Yarn, Postgres, Pm2, Redis, NGINX, pgvector

### Install Node v14 (through nvm)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 14
nvm use 14

### Install Yarn

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bashrc

### Install Postgres (can skip if postgres is already installed and started), install redis

sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
sudo -i -u postgres
psql
CREATE DATABASE staging;
sudo apt-get install redis-server
sudo systemctl start redis-server.service

### git clone

git clone https://github.com/ubco-db/office-hours.git

cd office-hours

# 1. Setup NGINX:

sudo apt-get install nginx

# 2. In root folder of repo, copy the file `infrastructure/prod/nginx.conf` from our repo to `/etc/nginx/nginx.conf`

sudo cp infrastructure/prod/nginx.conf /etc/nginx/nginx.conf

# 3. Start or restart NGINX:

sudo systemctl restart nginx

### set up environment for staging

cd packages/server
cp .env.development .env
nano .env

### change DB_URL to the following (make sure to change the password to the one you set up for postgres)

# change the following variables (make sure to change the password to the one you set up for postgres)

DB_URL=postgres://postgres:321456@localhost:5432/staging

yarn install
yarn build
yarn prod:start

## set up chatbot

## install pgvector

cd /tmp
git clone --branch v0.5.1 https://github.com/pgvector/pgvector.git
cd pgvector

### get make require req

sudo apt-get update
sudo apt-get install build-essential
sudo apt install make
sudo apt install postgresql-server-dev-15
make
sudo make install

sudo -i -u postgres
psql
CREATE EXTENSION vector;
exit

### chatbot related

git clone https://github.com/ubco-db/chatbot.git
nvm install 18
nvm use 18
yarn install
pm2 start --name chatbot "yarn start"

### pm2 setup and start project with pm2 (if failed, run yarn prod:start to test)

yarn global add pm2
pm2 start --name helpme "yarn prod:start"
