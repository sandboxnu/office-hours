### Install Node v12


curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

### Install Yarn


curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bashrc

### Install Postgres: can skip if postgres is already install and started

### If Postgres is installed, change url in packages/server/ormconfig.ts to ensure connection


### under /var/www
git clone https://github.com/ubco-db/office-hours.git 

### cd into git repo(default name: office-hours) root folder and install dependencies

yarn install

yarn build

### nginx for proxy purposes
1. Setup NGINX: 
sudo yum install nginx  
2. In root folder of repo, copy the file `infrastructure/prod/nginx.conf` from our repo to `/etc/nginx/nginx.conf`
sudo cp infrastructure/prod/nginx.conf /etc/nginx/nginx.conf
3. 
sudo service nginx restart

### pm2 setup and start project with pm2 (if failed, run yarn prod:start to test)

yarn global add pm2

pm2 start yarn --interpreter bash --name prod -- prod:start

### add courses 
### Inside root folder run: `yarn cli create:admin <username>` then add your password through stdin.
### courses can be added through domain/admin, but note to add semester model first before courses. Prof/ta must be added through admin.