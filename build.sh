#!/usr/bin/env bash
rm -rf dist
npm run build
node config/generatePom.js
mvn clean package
