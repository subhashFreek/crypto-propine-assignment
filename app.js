#!/usr/bin/env node

require('dotenv').config();
const argv = require('./config/cli');
const { loader } = require('./utils/loader');
const { tokenInformation } = require('./services/tokenInfomation');
const dir = __dirname;

switch (argv.command) {
  case 'process':
    let loaderReference = loader();
    tokenInformation(dir, loaderReference);
    break;
  default:
    console.error(`${cmd} is not a valid command`);
}
