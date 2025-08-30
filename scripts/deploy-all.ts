// scripts/deploy-all.ts
import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying all contracts with:', deployer.address)

  // Deploy in proper order due to dependencies
  const CrisisToken = await ethers.getContractFactory('CrisisToken')
  const token = await CrisisToken.deploy()
  console.log('CrisisToken deployed to:', token.address)

  const Timelock = await ethers.getContractFactory('TimelockController')
  const timelock = await Timelock.deploy(0, [], [])
  console.log('Timelock deployed to:', timelock.address)

  const CrisisGovernor = await ethers.getContractFactory('CrisisGovernor')
  const governor = await CrisisGovernor.deploy(
    token.address,
    timelock.address,
    1,
    45818,
    4
  )
  console.log('CrisisGovernor deployed to:', governor.address)

  const FactChecker = await ethers.getContractFactory('FactChecker')
  const factChecker = await FactChecker.deploy("0xChainlinkOracleAddress")
  console.log('FactChecker deployed to:', factChecker.address)

  const DonationEscrow = await ethers.getContractFactory('DonationEscrow')
  const donationEscrow = await DonationEscrow.deploy()
  console.log('DonationEscrow deployed to:', donationEscrow.address)

  const ProofOfHelpNFT = await ethers.getContractFactory('ProofOfHelpNFT')
  const nft = await ProofOfHelpNFT.deploy()
  console.log('ProofOfHelpNFT deployed to:', nft.address)

  const ZKPVerifier = await ethers.getContractFactory('ZKPVerifier')
  const zkpVerifier = await ZKPVerifier.deploy()
  console.log('ZKPVerifier deployed to:', zkpVerifier.address)

  console.log('\n=== DEPLOYMENT COMPLETE ===')
  console.log('Update your .env.local with these addresses:')
  console.log('NEXT_PUBLIC_TOKEN_ADDRESS=', token.address)
  console.log('NEXT_PUBLIC_TIMELOCK_ADDRESS=', timelock.address)
  console.log('NEXT_PUBLIC_GOVERNOR_ADDRESS=', governor.address)
  console.log('NEXT_PUBLIC_FACT_CHECKER_ADDRESS=', factChecker.address)
  console.log('NEXT_PUBLIC_DONATION_ESCROW_ADDRESS=', donationEscrow.address)
  console.log('NEXT_PUBLIC_NFT_ADDRESS=', nft.address)
  console.log('NEXT_PUBLIC_ZKP_VERIFIER_ADDRESS=', zkpVerifier.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })