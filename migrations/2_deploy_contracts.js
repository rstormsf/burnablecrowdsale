var SimpleToken = artifacts.require("./SimpleToken.sol");
var BurnableCrowdsale = artifacts.require("./BurnableCrowdsale.sol");
const abiEncoder = require('ethereumjs-abi');
const BigNumber = web3.BigNumber;
function latestTime() {
  return web3.eth.getBlock('latest').timestamp;
}
const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)} 
};

module.exports = function(deployer) {
  return deployer.deploy(SimpleToken).then(async ()=>{
    // uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet, address _token, address _tokensForSale
    const token = await SimpleToken.deployed();
    const startTime =  latestTime() + duration.minutes(5);
    const endTime = latestTime() + duration.weeks(5);
    const wallet = web3.eth.accounts[0];
    const spender = web3.eth.accounts[1];
    await token.transfer(spender, 150000000000000000000000000);
    const cap = new BigNumber(10**18 * 2);
    await deployer.deploy(BurnableCrowdsale, startTime,endTime, 1000, wallet, token.address, spender, cap);
    const encodedParamsContribution = abiEncoder.rawEncode(['uint256', 'uint256', 'uint256', 'address', 'address', 'address', 'uint256'], [startTime,endTime, 1000, wallet, token.address, spender, cap.toString(10)]);
    const crowdsale = await BurnableCrowdsale.deployed();
    console.log('CONTRIBUTION ENCODED: \n', encodedParamsContribution.toString('hex'));
    await token.approve(crowdsale.address, 150000000000000000000000000, {from: spender});
    
  })
};
