// contracts/DonationEscrow.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DonationEscrow is Ownable, ReentrancyGuard {
    IERC20 public usdc;
    address public usdcAddress = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
    
    constructor() {
        usdc = IERC20(usdcAddress);
    }

    function createDonation(
        address ngo,
        string[] calldata descriptions,
        uint256[] calldata amounts // amounts in USDC (6 decimals)
    ) external nonReentrant returns (uint256) {
        uint256 totalAmount;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        // Transfer USDC from donor to contract
        require(usdc.transferFrom(msg.sender, address(this), totalAmount), "USDC transfer failed");

        // Rest of your existing code...
        uint256 donationId = donationCount++;
        // ... store donation details
    }

    function approveMilestone(uint256 donationId, uint256 milestoneId) external onlyOwner {
        // Release USDC to NGO instead of ETH
        Milestone storage milestone = donations[donationId].milestones[milestoneId];
        require(usdc.transfer(donations[donationId].ngo, milestone.amount), "USDC transfer failed");
        
        milestone.approved = true;
        donations[donationId].releasedAmount += milestone.amount;
        
        emit FundsReleased(donationId, milestone.amount);
    }
}