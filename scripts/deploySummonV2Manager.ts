

import hre from "hardhat";

const path = require('path')


async function main() {

const {ethers} = hre
const [deployer1] = await ethers.getSigners()
const dep1Address = await deployer1.getAddress()
// const dep2Address = await deployer2.getAddress()



console.log(deployer1);
console.log(
"Deploying the contracts with the account:",
dep1Address
);
// console.log(
// "secondary account:",
// await dep2Address
// );

// const SummonV2EthersFactory = await ethers.getContractFactory(
//   "contracts/SummonV2.sol:Summon"
// )

// const gasPrice = await SummonV2EthersFactory.signer.getGasPrice();
//   console.log(`Current gas price: ${gasPrice}`);

//   const estimatedGas = await SummonV2EthersFactory.signer.estimateGas(
//     SummonV2EthersFactory.getDeployTransaction(),
//   );
//   console.log(`Estimated gas: ${estimatedGas}`)

//   const deploymentPrice = gasPrice.mul(estimatedGas);
//   const deployerBalance = await SummonV2EthersFactory.signer.getBalance();
//   console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
//   console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);
//   if (deployerBalance.lt(deploymentPrice)) {
//     throw new Error(
//       `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
//         deploymentPrice.sub(deployerBalance),
//       )}`,
//     );
//   }


// const SummonV2 = await SummonV2EthersFactory.deploy();

// await SummonV2.deployed()

// console.log(`Singleton deployed at ${SummonV2.address}`)
// 0xC2E50B4d75ab8c7Ba466Df9899aa03e0Ce8A527a
const singletonAddress = '0xC2E50B4d75ab8c7Ba466Df9899aa03e0Ce8A527a'

const SummonManagerFactory = await ethers.getContractFactory(
"contracts/SummonV2Manager.sol:SummonV2Manager"
);

const FgasPrice = await SummonManagerFactory.signer.getGasPrice();
  console.log(`Current gas price: ${FgasPrice}`);

  const FestimatedGas = await SummonManagerFactory.signer.estimateGas(
    SummonManagerFactory.getDeployTransaction(singletonAddress),
  );
  console.log(`Estimated gas: ${FestimatedGas}`)

  const FdeploymentPrice = FgasPrice.mul(FestimatedGas);
  const FdeployerBalance = await SummonManagerFactory.signer.getBalance();
  console.log(`Deployer balance:  ${ethers.utils.formatEther(FdeployerBalance)}`);
  console.log(`Deployment price:  ${ethers.utils.formatEther(FdeploymentPrice)}`);
  if (FdeployerBalance.lt(FdeploymentPrice)) {
    throw new Error(
      `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
        FdeploymentPrice.sub(FdeployerBalance),
      )}`,
    );
  }


const SummonV2Manager = await SummonManagerFactory.deploy(singletonAddress); // summon V2 address as in the constructor
await SummonV2Manager.deployed();

console.log(`Summon V2 Manager deployed at ${SummonV2Manager.address}`)
// 0xdc2E5925598Cde53D37b6b8428aEFc3dc1Ff677C






// const SummonManager_dep2 = SummonV2Manager.connect(deployer2)
// let tx = await SummonManager_dep2.CreateNewSummon(dep1Address)
// console.log(`creating new summon, tx hash: ${tx.hash}`)
// let tx_r = tx.wait()
// let r = await tx_r
// let [owner, summonAddress] = r.events[0].args
// // console.log(`owner is ${owner}`)
// // console.log(`summonAddress is ${summonAddress}`)
// if(owner != dep1Address) console.log("ERROR: owner address doesn't match dep1 address")
// console.log(`New Summon Safe created for dep1 at ${summonAddress}`)




}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});