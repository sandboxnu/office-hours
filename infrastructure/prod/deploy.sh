#!/bin/bash
# Runs deployment on this machine. Do NOT run this locally.
set -ex

cd /var/www/source-v2
wget https://github.com/sandboxnu/office-hours/releases/latest/download/release.zip
unzip -o release.zip
yarn typeorm migration:run
env HOME=/var/www pm2 startOrReload infrastructure/prod/ecosystem.config.js
