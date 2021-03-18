#!/bin/bash
# Runs anonymize script on this machine. Don't run this locally.

sudo su - officehours
cd /var/www/source/infrastructure/prod
python anonymize_sql.py
logout