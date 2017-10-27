#!/usr/bin/env sh
set -x
set -e 
truffle compile

testrpc > /dev/null &
TESTRPC_PID=$!
npm test
ng e2e
ng lint
truffle test

kill $TESTRPC_PID
