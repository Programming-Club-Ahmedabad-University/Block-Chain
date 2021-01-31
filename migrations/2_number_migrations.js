const NumberContract = artifacts.require("Number");

module.exports = function (deployer) {
  deployer.deploy(NumberContract);
};
