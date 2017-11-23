#!/usr/bin/env sh
set -x
set -e
testrpc -l 100000000 > /dev/null &
TESTRPC_PID=$!

truffle compile
truffle test

npm test
ng e2e
ng lint

kill $TESTRPC_PID

