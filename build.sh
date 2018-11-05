#!/usr/bin/env bash
rm -rf dist
npm run build
mvn clean package
