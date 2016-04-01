var storage = require('node-persist');
var _ = require('underscore');
var crypto = require('crypto-js');
var emoji = require('node-emoji').emoji;
var argv = require('./commands.js');
storage.initSync();
var command = argv._[0];
            
function getAllAccounts (masterPassword) {
  var hashedAccount = storage.getItemSync('accounts');
  var accounts = [];
  
  if (hashedAccount) {
    var hashBytes = crypto.AES.decrypt(hashedAccount, masterPassword);
    
    accounts = JSON.parse(hashBytes.toString(crypto.enc.Utf8));
  }

  
  // console.log('All of the accounts', accounts)
  return accounts;
}

function saveAccount (accounts, masterPassword) {
  // encrypt accounts
  var hashedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
  
  storage.setItemSync('accounts', hashedAccounts.toString());
  
  return accounts;
}

function createAccount (account, masterPassword) {
  var accounts = getAllAccounts(masterPassword);

  accounts.push(account);

  saveAccount(accounts, masterPassword);

  return account;
}

function findAccount (accountName, masterPassword) {
  var accounts = getAllAccounts(masterPassword)
  var foundAccount;

  accounts.forEach(function (account) {
    if (account.name === accountName) {
      foundAccount = account;
    }
  });

  return foundAccount;
}

if (command === 'create') {
  try {
    var createdAccount = createAccount({
      name: argv.name,
      username: argv.username,
      password: argv.password
    }, argv.masterPassword);
    console.log(emoji.clap , emoji.heart, ' Account created!');
    // console.log(createdAccount);
  } catch (error) {
    console.log(emoji.astonished, ' Unable to create account. Check error message: ', error);
  }
} else if (command === 'get') {
  try {
    var fetchedAccount = findAccount(argv.name, argv.masterPassword);

    if (!fetchedAccount) {
      console.log(emoji.no_good, ' Account not found..But you can create one though ', emoji.point_left);
    } else {
      console.log(emoji.clap, ' Account found!', emoji.point_down);
      console.log(fetchedAccount);
    }
  } catch (error) {
    console.log(emoji.hand, emoji.point_right, ' Unable to get account. Check error message: ', error);
  }
}