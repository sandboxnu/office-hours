#!/bin/bash
# Runs deployment on this machine. Do NOT run this locally.
set -ex

cd /var/www/source
git fetch
git reset --hard origin/dist
yarn
yarn typeorm migration:run
env HOME=/var/www pm2 startOrReload infrastructure/prod/ecosystem.config.js
chgrp -R officehours /var/www/.pm2
chgrp -R officehours /var/www/source
