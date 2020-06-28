var helloWorldABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "hello",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function",
    "signature": "0x19ff1d21"
  }
];
var helloWorldAddress = '0x462aef90F10A534b9E296b159E23aCf62471768E';
var web3 = new Web3('http://localhost:9545');
var helloWorld = new web3.eth.Contract(helloWorldABI, helloWorldAddress);

document.addEventListener('DOMContentLoaded', () => {
  helloWorld.methods.hello().call()
  .then(result => {
    console.log('result', result)
    document.getElementById('hello').innerHTML = result;
  });
});
