import EtherWallet from '../build/contracts/EtherWallet.json';
import Web3 from 'web3';

let web3;
let etherWallet;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(
    EtherWallet.abi,
    EtherWallet
      .networks[networkId]
      .address
  );
};

const initApp = () => {
  console.log('APP STARTED :>> ');
  const $deposit = document.getElementById('deposit');
  const $depositResult = document.getElementById('deposit-result');
  const $send = document.getElementById('send');
  const $sendResult = document.getElementById('send-result');
  const $balance = document.getElementById('balance');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
    console.log('ACCOUNTS', accounts)
  });

  const refreshBalance = () => {
    etherWallet.methods
      .balanceOf()
      .call()
      .then(result => {
        $balance.innerHTML = result;
      });
  };
  refreshBalance();

  $deposit.addEventListener('submit', e => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
    .deposit()
    .send({from: accounts[0], value: amount})
    .then(result => {
      $depositResult.innerHTML = `Your deposit of ${amount} was successfull!`;
      refreshBalance();
    })
    .catch(_e => {
      $depositResult.innerHTML = 'Opps... There was an error while trying to deposit into your account...';
    });
  });

  $send.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = e.target.elements[0].value;
    const amount = e.target.elements[1].value;
    etherWallet.methods
    .send(to, amount)
    .send({from: accounts[0]})
    .then(result => {
      $sendResult.innerHTML = `Your transfer of ${amount} to ${to} was successfull!`;
      refreshBalance();
    })
    .catch(_e => {
      $sendResult.innerHTML = 'Opps... There was an error while trying to send your transfer...';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_etherWallet => {
      etherWallet = _etherWallet;
      initApp();
    })
    .catch(e => console.log(e.message));
});
