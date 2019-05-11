#!/usr/bin/env bash
yarn run font-spider config/font-clip.html
yarn run build
node config/generatePom.js
mvn clean package
