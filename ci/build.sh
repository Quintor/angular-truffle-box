#!/usr/bin/env sh
set -x
set -e
ganache-cli -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat" > /dev/null &
GANACHE_PID=$!
trap "kill $GANACHE_PID" EXIT INT TERM

truffle compile
truffle migrate
truffle test

npm test
ng e2e
ng lint


#(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
#(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
#(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
