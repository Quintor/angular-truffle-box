#!/usr/bin/env sh
set -x
set -e
truffle compile

npm test
ng e2e
ng lint
truffle test
