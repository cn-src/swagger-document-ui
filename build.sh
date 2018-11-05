#!/usr/bin/env bash
rm -rf dist
npm run build
node generatePom.js
mvn clean package
