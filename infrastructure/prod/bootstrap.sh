sudo apt update
sudo apt -y upgrade


curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs


curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt -y install yarn
echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bashrc


wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RELEASE=$(lsb_release -cs)
echo "deb http://apt.postgresql.org/pub/repos/apt/ ${RELEASE}"-pgdg main | sudo tee  /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt -y install postgresql-11
sudo update-rc.d postgresql enable

PSQL_PWD=$(openssl rand -base64 16)
echo $PSQL_PWD > psqlpwd.txt
sudo -u postgres psql -c "CREATE USER server WITH PASSWORD '$PSQL_PWD'"
sudo -u postgres psql -c "CREATE DATABASE prod"
sudo -u postgres createuser $(whoami)


sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
yes | sudo ufw enable

sudo chown ubuntu /var/www
yarn global add pm2

sudo apt -y install nginx
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart

yarn prod:start
pm2 save

echo "You still need to pm2 startup, add ssh keys, and add certbot"