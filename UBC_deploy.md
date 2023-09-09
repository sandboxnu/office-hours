### for deployment on UBC server (RedHat)

### dependencies to be installed: Node, Yarn, Postgres

### Install Node v12

curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
sudo yum install -y nodejs

### Install Yarn

curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install yarn
echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bashrc

### Install Postgres (can skip if postgres is already installed and started)

sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo -i -u postgres

### If Postgres is installed, change URL in packages/server/ormconfig.ts to ensure connection

### install and start redis

sudo yum install redis
sudo systemctl start redis

### under /var/www

git clone https://github.com/ubco-db/office-hours.git

### cd into git repo (default name: office-hours) root folder and install dependencies

yarn install
yarn build

### nginx for proxy purposes. NOTE: can be replaced by running devproxy.js in infrastructure/dev

# 1. Setup NGINX:
sudo yum install nginx
# 2. In root folder of repo, copy the file `infrastructure/prod/nginx.conf` from our repo to `/etc/nginx/nginx.conf`
sudo cp infrastructure/prod/nginx.conf /etc/nginx/nginx.conf
# 3. Start or restart NGINX:
sudo systemctl restart nginx

### pm2 setup and start project with pm2 (if failed, run yarn prod:start to test)

yarn global add pm2
pm2 start --name helpme "yarn prod:start"

### some other useful pm2 commands

pm2 stop all
pm2 delete all

### add courses

### Inside root folder run: `yarn cli create:admin <username>` then add your password through stdin.

### courses can be added through domain/admin, but note to add semester model first before courses. Prof/ta must be added through admin.
