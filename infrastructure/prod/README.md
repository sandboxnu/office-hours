This is for deploying production to a single machine using docker.

Running the docker-compose file will setup:

- API server on port 3002
- Frontend app server on port 3001
- NGINX on port 80 reverse proxying

You must run Postgres on a VM yourself, as Postgres-in-docker is a good way to lose production data.

## How to Setup Ubuntu VM to Run Web Server

### Update Ubuntu (security etc)

```
sudo apt update
sudo apt -y upgrade
```

### Install Node v12

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install Yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

### Install Postgres 11.5

Installation

```
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RELEASE=$(lsb_release -cs)
echo "deb http://apt.postgresql.org/pub/repos/apt/ ${RELEASE}"-pgdg main | sudo tee  /etc/apt/sources.list.d/pgdg.list
sudo apt update
sudo apt -y install postgresql-11
```

Setup

Create a random password to substitue in below!

```
sudo -u postgres psql -c "CREATE USER server WITH PASSWORD '<PASSWORD>'"
sudo -u postgres psql -c "CREATE DATABASE prod"
```

### Setup NGINX

1. Setup NGINX: `sudo apt install nginx`
2. Copy the file `infrastructure/prod/nginx.conf` from our repo to `/etc/nginx/nginx.conf`
3. `sudo service nginx restart`

### Setup Firewall

1. `sudo ufw allow ssh && sudo ufw allow http && sudo ufw allow https`
2. `sudo ufw enable`

### Setup PM2 Deployment

1. Setup directory on VM: `sudo chown ubuntu /var/www`

From your local machine:

2. Install pm2 locally `yarn global add pm2`
3. Edit the pm2 file from your local machine to have the IP + Environment (prod or staging). Commit and push.
4. Setup: `pm2 deploy infrastructure/prod/ecosystem.config.js <ENVIRONMENT> setup`
5. Deploy: `pm2 deploy infrastructure/prod/ecosystem.config.js <ENVIRONMENT>`

### Add SSH Key for Continuous Deployment

Create or get existing ssh key for the CD environment (GH Actions)
Add the public key to `~/.ssh/authorized_keys` or use `ssh-copy-id` utility from your local machine.

https://www.ssh.com/ssh/copy-id

### Add Certbot for HTTPS

https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx
