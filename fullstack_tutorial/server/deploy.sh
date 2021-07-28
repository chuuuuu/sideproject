#!/bin/bash

echo What should the version be?
read VERSION

docker build --platform linux/amd64 -t chu025/lireddit:$VERSION .
docker push chu025/lireddit:$VERSION
ssh root@147.182.217.19 "docker pull chu025/lireddit:$VERSION && docker tag chu025/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
