#!/usr/bin/env sh
set -x
set -e
truffle compile
truffle test

testrpc > /dev/null &
TESTRPC_PID=$!
npm test
ng e2e
ng lint

kill $TESTRPC_PID

