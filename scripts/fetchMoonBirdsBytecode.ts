
import hre, {ethers} from 'hardhat'
// require('path')
import MoonBirdsABI from '../contracts/SummonMoonBirds/MoonBirdsABI.json' 
import MoonBirdsCode from '../contracts/SummonMoonBirds/MoonBirdsBytecode.json' 

async function main() {
  const [deployer1] = await ethers.getSigners()

  // const Moonbirds = new ethers.ContractFactory(MoonBirdsABI, '0x23581767a106ae21c074b2276D25e5C3e136a68b');

  const code = MoonBirdsCode.code

const MoonbirdsFactory = await ethers.getContractFactory(MoonBirdsABI, code, deployer1);
// proof = 0x08D7C0242953446436F34b4C78Fe9da38c73668d
/* constructor(
  string memory name,
  string memory symbol,
  IERC721 _proof,
  address payable beneficiary,
  address payable royaltyReceiver
)*/
const MoonBirds = await MoonbirdsFactory.deploy("MoonBirds", "MB", '0x08D7C0242953446436F34b4C78Fe9da38c73668d', '0xaDAe8CDc7C2Da113E48447193a2db0c139aaA297', '0xaDAe8CDc7C2Da113E48447193a2db0c139aaA297')
await MoonBirds.deployed()
console.dir(MoonBirds)

  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });