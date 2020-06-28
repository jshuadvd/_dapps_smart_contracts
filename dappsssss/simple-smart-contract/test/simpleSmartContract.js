const SimpleSmartContract = artifacts.require('SimpleSmartContract');

contract('SimpleSmartContract', () => {
  it('should be deployed', async () => {
    const simpleSmartContract = await SimpleSmartContract.deployed();
    // console.log('ADDRESS', simpleSmartContract.address)
    assert(simpleSmartContract.address !== '');
  });
});
