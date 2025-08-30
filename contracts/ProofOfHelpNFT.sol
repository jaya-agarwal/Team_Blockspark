// contracts/ProofOfHelpNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ProofOfHelpNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    
    Counters.Counter private _tokenIdCounter;
    
    struct Contribution {
        string contributionType;
        uint256 value;
        uint256 timestamp;
        string location;
        string metadataURI;
    }
    
    mapping(uint256 => Contribution) public contributions;
    mapping(address => uint256[]) public userTokens;
    string public baseTokenURI;
    
    event NFTMinted(
        uint256 indexed tokenId, 
        address indexed to, 
        string contributionType, 
        uint256 value,
        string location
    );
    
    constructor() ERC721("ProofOfHelp", "HELP") Ownable(msg.sender) {
        baseTokenURI = "https://ipfs.io/ipfs/";
    }
    
    function mintNFT(
        address to,
        string memory contributionType,
        uint256 value,
        string memory location,
        string memory metadataURI
    ) external onlyOwner returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        _mint(to, tokenId);
        
        contributions[tokenId] = Contribution({
            contributionType: contributionType,
            value: value,
            timestamp: block.timestamp,
            location: location,
            metadataURI: metadataURI
        });
        
        userTokens[to].push(tokenId);
        
        emit NFTMinted(tokenId, to, contributionType, value, location);
        return tokenId;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return string(abi.encodePacked(baseTokenURI, contributions[tokenId].metadataURI));
    }
    
    function getUserNFTs(address user) external view returns (uint256[] memory) {
        return userTokens[user];
    }
    
    function getContributionDetails(uint256 tokenId) external view returns (Contribution memory) {
        return contributions[tokenId];
    }
    
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
    }
}