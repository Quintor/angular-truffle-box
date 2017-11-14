# Truffle Box for Angular

This Truffle Box provides a base for working with the Truffle Framework and Angular.
It provides a basic working example of the MetaCoin contracts with Angular components.
This project is generated with [Angular CLI](https://cli.angular.io/).

## Prerequisites

In order to run the Truffle box, you will need [Node.js](https://nodejs.org) (version 6.11.x). This will include `npm`, needed
to install dependencies. In order install these dependencies, you will also need [Python](https://www.python.org) (version 2.7.x) and
[git](https://git-scm.com/downloads). You will also need the [MetaMask](https://metamask.io/) plugin for Chrome.

## Building

1. Install truffle, Angular CLI and an Ethereum client. If you don't have a test environment, we recommend Ethereum TestRPC
  ```bash
  npm install -g truffle@^4.0.0
  npm install -g @angular/cli@1.4.9
  ```

2. Download the box.
  ```bash
  truffle unbox Quintor/angular-truffle-box
  ```

3. Start a local test network with `truffle develop`
  ```bash
  truffle develop
  ```
Note the mnemonic 12-word phrase printed on startup, you will need it later.

4. Compile and migrate your contracts, using the `truffle develop` console
  ```
  truffle(develop)>compile
  truffle(develop)>migrate
  ```

## Configuration
1. In order to connect with the Ethereum network, you will need to configure MetaMask
2. Log into the `truffle develop` test accounts in MetaMask, using the 12-word phrase printed earlier.
    * A detailed explaination of how to do this can be found [here](http://truffleframework.com/docs/advanced/truffle-with-metamask#using-the-browser-extension)
3. Point MetaMask to the `truffle develop` RPC server by connecting to the network `http://localhost:9545`, using the Custom RPC option.


## Running

1. Run the app using Angular CLI:
  ```bash
  ng serve
  ```
The app is now served on localhost:4200

2. Making sure you have configured MetaMask, visit http://localhost:4200 in your browser.

3. Send MetaCoins!

## Testing

1. Running the Angular component tests:
  ```bash
  ng test
  ```

2. Running the Truffle tests:
  ```bash
  truffle test
  ```

3. Running Protactor end-to-end tests

  ```bash
  ng e2e
  ```
  
## Releasing
Using the Angular CLI you can build a distributable of your app. Will be placed in `dist/`

  ```bash
  ng build
  ```

## FAQ

* __Where can I find more documentation?__

This Truffle box is a union of [Truffle](http://truffleframework.com/) and an Angular setup created with [Angular CLI](https://cli.angular.io/).
For solidity compilation and Ethereum related issues, try the [Truffle documentation](http://truffleframework.com/docs/).
For Angular CLI and typescript issues, refer to the [Angular CLI documentation](https://github.com/angular/angular-cli/wiki)
