# BlockSpark

## Overview
BlockSpark is a blockchain-based donation platform designed to revolutionize philanthropy by addressing critical challenges in the donation ecosystem. Through milestone-based funding, secure escrow smart contracts, and NFT-based volunteer recognition, BlockSpark ensures transparency, accountability, and motivation for donors and volunteers. Built for scalability, it supports NGOs, charities, and crowdfunding campaigns worldwide, fostering trust and impactful giving.

## Problem Statement
The donation ecosystem faces significant issues:
- **Lack of Transparency**: Funds are often mismanaged or diverted, eroding donor trust.
- **Unrecognized Volunteers**: Volunteer efforts go unnoticed, reducing motivation and participation.
- **Impact**: A cycle of mistrust and disengagement weakens charitable initiatives.

## Our Solution
BlockSpark redefines philanthropy with:
- **Milestone-Based Donations**: Funds are held in escrow and released only upon verified milestone completion.
- **Real-Time Tracking**: Donors monitor contributions via a transparent dashboard.
- **NFT Rewards**: Volunteers receive unique, blockchain-based badges for their contributions.
- **Scalability**: Supports local fundraisers to global campaigns with plans for multi-wallet integration.

## Features
🌟 **Transparent Donations**
- **Milestone-Based Escrow System**: Funds are released only when specific goals are verified.
- **Real-Time Tracking**: Donors can monitor how contributions are used via a dashboard.
- **Smart Contract Security**: Ethereum smart contracts ensure secure fund management.

🎖️ **Proof-of-Contribution NFT System**
- **Contribution Recognition**: Unique NFTs minted for volunteer and donor efforts.
- **Reputation Building**: NFT collection showcases contribution history.
- **Achievement Tracking**: Immutable proof of impact stored on-chain.

⚡ **Instant Connectivity**
- **Coinbase Wallet Integration**: Seamless Web3 wallet connection.
- **Ganache Local Blockchain**: Fast development and testing environment.
- **Zero Gas Costs**: Free transactions during development phase.

## Tech Stack
### Blockchain Layer
- **Ethereum**: Smart contract platform.
- **Solidity**: Smart contract programming language.
- **Ganache**: Local development blockchain.
- **Hardhat**: Development and testing framework.
- **OpenZeppelin**: Secure smart contract templates.

### Frontend Layer
- **Next.js 15**: React framework with App Router.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: Utility-first styling.
- **RainbowKit**: Wallet connection UI.

### Web3 Integration
- **Wagmi**: React hooks for Ethereum.
- **Ethers.js**: JavaScript library for blockchain interaction.
- **Coinbase Wallet**: Primary wallet integration.

### Storage & Infrastructure
- **IPFS**: Decentralized file storage.
- **Web3.Storage**: IPFS pinning service.
- **NFT.Storage**: Storage for NFT metadata.

## Quick Start
### Prerequisites
- Node.js (v18 or higher)
- Coinbase Wallet extension
- Ganache CLI or GUI
- Web3.Storage and NFT.Storage accounts

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/BlockSpark/blockspark.git
   cd blockspark


Install Dependencies:
npm install


Start Ganache:
# Option A: Ganache CLI
npx ganache-cli -d -p 7545

# Option B: Ganache GUI
# Download from https://www.trufflesuite.com/ganache


Configure Environment:Create a .env.local file in the root directory:
COINBASE_WALLET_PRIVATE_KEY=your_wallet_private_key
WEB3_STORAGE_API_KEY=your_web3_storage_key
NFT_STORAGE_API_KEY=your_nft_storage_key
ETHEREUM_NODE_URL=http://127.0.0.1:7545


Deploy Smart Contracts:
npx hardhat compile
npx hardhat run scripts/deploy.ts --network ganache


Run the Development Server:
npm run dev


Access the Platform:Open http://localhost:3000 in your browser and connect your Coinbase Wallet.


How to Use
For Donors

Connect Wallet: Click "Connect Wallet" and select Coinbase Wallet.
Select NGO: Choose a verified NGO or cause from the dropdown.
Create Donation: Navigate to Donate → Set milestones and donation amount.
Fund Escrow: ETH is locked in a smart contract until milestones are verified.
Track Progress: Monitor milestone completion in the donation activity dashboard.
Earn NFTs: Receive Proof-of-Contribution NFTs for your donations.

For NGOs

Complete Milestones: Execute agreed-upon relief work or project goals.
Submit Evidence: Upload proof of work (e.g., photos, documents) to IPFS.
Receive Payments: Funds are automatically released upon milestone verification.
Build Reputation: Accumulate a verified history of contributions.

For Verifiers

Review Evidence: Check submitted proof for milestone completion.
Approve Releases: Confirm successful milestone completion to release funds.
Ensure Transparency: Maintain accountability in fund usage.

Project Structure
plain
blockspark/
├── app/                    # Next.js app directory
│   ├── (components)/      # Reusable components (DonationForm, Dashboard)
│   ├── (routes)/         # Page routes (home, donate, dashboard)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── contracts/            # Smart contracts
│   ├── DonationEscrow.sol # Escrow for milestone-based donations
│   └── ProofOfHelpNFT.sol # ERC721 NFT for volunteer recognition
├── lib/                  # Utilities and configurations
│   ├── contracts/        # Contract ABIs
│   ├── chains.ts         # Blockchain configurations
│   └── storage.ts        # IPFS utilities
├── scripts/              # Deployment scripts
├── public/               # Static assets (images, mockups)
├── styles/               # Tailwind CSS styles
├── wagmi.config.ts       # Web3 configuration
├── .env.local            # Environment variables
└── README.md             # Project documentation
Smart Contracts
DonationEscrow.sol

Manages milestone-based fund escrow.
Handles ETH transfers and releases.
Tracks milestone completion status.

ProofOfHelpNFT.sol

ERC721 NFT contract for contribution recognition.
Mints unique tokens for verified contributions.
Stores metadata on IPFS via NFT.Storage.

Development
Deploy Contracts
npx hardhat run scripts/deploy.ts --network ganache

Run Tests
npx hardhat test

Verify on Block Explorer
npx hardhat verify --network ganache <CONTRACT_ADDRESS>

Network Configuration
Ganache Local Network

Chain ID: 1337
RPC URL: http://127.0.0.1:7545
Currency: ETH (test ether)
Block Explorer: Built-in Ganache UI

Wallet Setup

Install Coinbase Wallet extension.
Import Ganache accounts using private keys.
Connect to http://127.0.0.1:7545.
Start transacting with test ETH.

Key Features in Detail
Milestone-Based Funding

Donors set measurable goals for their donations.
Funds are released incrementally upon goal verification.
Ensures complete transparency in fund utilization.

NFT Reward System

Tiered Rewards: Different NFT designs for various contribution levels.
Visual Recognition: Unique NFTs representing donation or volunteer impact.
Permanent Record: Immutable blockchain record of contributions.

Real-Time Transparency

Live tracking of fund disbursement.
Instant notifications for milestone completions.
Publicly verifiable transaction history.

Future Roadmap

Multi-Wallet Support: Integrate MetaMask, WalletConnect, and other wallets.
Global Expansion: Scale to support more NGOs and international campaigns.
Enhanced NFT System: Develop a universal NFT badge ecosystem for cross-organization recognition.
Advanced Analytics: Provide detailed donation impact reports for donors.
Mobile App: Build iOS and Android apps for broader accessibility.

Contributing
We welcome contributions to enhance BlockSpark! Follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

Acknowledgments

OpenZeppelin: Secure smart contract templates.
RainbowKit: Seamless wallet connection UI.
IPFS & Web3.Storage: Decentralized storage solutions.
NGO Partners: Valuable feedback for real-world use cases.```
