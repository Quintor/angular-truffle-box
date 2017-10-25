#!/usr/bin/env sh
set -x
set -e 

testrpc > /dev/null &
npm test
ng e2e
ng lint
truffle test
