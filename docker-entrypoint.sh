#!/bin/sh
echo Launching API Server
cd / && mkdir logs
touch /logs/server.log
pm2 start /api/index.js
pm2 logs 0 | tee /logs/server.log