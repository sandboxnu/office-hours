#!/bin/bash
# Runs anonymize script on this machine. Don't run this locally.

cd /var/www/source/infrastructure/prod
python anonymize_sql.py
logout