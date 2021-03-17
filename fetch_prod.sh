#!/bin/bash
# Fetches anonymized prod dump for development seeding
set -ex

user=$1

cat ./infrastructure/prod/anonymize.sh | ssh -J $user@login.ccs.neu.edu $user@amato.ccs.neu.edu
sleep 5
scp $user@amato.ccs.neu.edu:/var/www/source/infrastructure/prod/anonomized_prod.sql ./