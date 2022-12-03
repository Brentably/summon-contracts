import fetch from 'node-fetch'
// import {ethers} from 'hardhat'
// import 'path'
import fs from 'fs'

async function main() {
  // const Moonbirds = new ethers.Contract('0x23581767a106ae21c074b2276D25e5C3e136a68b');

  const resp = await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=0x23581767a106ae21c074b2276D25e5C3e136a68b&apikey=KW3JT67I7UN9YKZBR2EYCE8PYH21J1AN78`)

  if(resp.status != 200) {
    console.error('error ftching')
    return
  }

  let json = await resp.json()
  console.log(json)

  const  MoonBirdsABI = await json.result[0].ABI


  fs.writeFileSync('contracts/SummonMoonBirds/MoonBirdsABI.json', MoonBirdsABI, function (err) {
    if (err) throw err
    console.log('File is created successfully.')
  })
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });