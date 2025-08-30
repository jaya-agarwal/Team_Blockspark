// contracts/FactChecker.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FactChecker is Ownable {
    struct Verification {
        string newsHash;
        bool isVerified;
        uint256 timestamp;
        address verifiedBy;
        string source;
    }
    
    mapping(string => Verification) public verifications;
    AggregatorV3Interface internal oracle;
    
    event NewsVerified(string indexed newsHash, bool isVerified, address verifiedBy, string source);
    
    constructor(address chainlinkOracle) {
        oracle = AggregatorV3Interface(chainlinkOracle);
    }
    
    function verifyNews(
        string memory newsHash, 
        string memory source
    ) external onlyOwner returns (bool) {
        // In production, this would call Chainlink Oracle
        // For now, we'll simulate verification
        bool isVerified = _simulateVerification(newsHash, source);
        
        verifications[newsHash] = Verification({
            newsHash: newsHash,
            isVerified: isVerified,
            timestamp: block.timestamp,
            verifiedBy: msg.sender,
            source: source
        });
        
        emit NewsVerified(newsHash, isVerified, msg.sender, source);
        return isVerified;
    }
    
    function _simulateVerification(string memory, string memory) private pure returns (bool) {
        // Simulate 80% success rate for demo
        return uint256(keccak256(abi.encodePacked(block.timestamp))) % 100 < 80;
    }
    
    function getVerification(string memory newsHash) public view returns (Verification memory) {
        return verifications[newsHash];
    }
}