#!/usr/bin/env bash
yarn run build
node config/generatePom.js
mvn clean package
