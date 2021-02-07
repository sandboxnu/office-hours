#!/bin/bash
# Runs deployment on production
set -ex

user=$1

cat ./infrastructure/prod/deploy.sh | ssh -J $user@login.ccs.neu.edu $user@amato.ccs.neu.edu
