
import hre, {ethers} from 'hardhat'
// require('path')
import MoonBirdsABI from '../contracts/SummonMoonBirds/MoonBirdsABI.json' 
import MoonBirdsCode from '../contracts/SummonMoonBirds/MoonBirdsBytecode.json' 

async function main() {
  const [deployer1] = await ethers.getSigners()

  // const Moonbirds = new ethers.ContractFactory(MoonBirdsABI, '0x23581767a106ae21c074b2276D25e5C3e136a68b');



const Moonbirds = new ethers.Contract("0x5bdF4b0977920e390Cf26373D180bC4F01a41ee8",MoonBirdsABI,  deployer1)

console.dir(Moonbirds)
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });