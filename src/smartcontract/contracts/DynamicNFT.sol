// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract DynamicNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    // using Counters for Counters.Counter;
    using Strings for uint256;
    uint256 private _tokenIdCounter;

    constructor() ERC721("DynamicNFT", "D-NFT") {}


    function generateSVG(uint256 tokenId) public pure returns (string memory) {
    bytes memory svg = abi.encodePacked(
        '<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<rect width="1080" height="1080" fill="#3E6957"/>',
        '<rect x="46" y="46" width="987" height="987" rx="50" fill="#F0EBDE"/>',
        '<mask id="mask0_1096_34" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="46" y="46" width="987" height="987">',
        '<rect x="46" y="46" width="987" height="987" rx="50" fill="#F0EBDE"/>',
        '</mask>',
        '<g mask="url(#mask0_1096_34)">',
        '<path d="M177.973 488.896C177.481 457.625 187.65 427.117 206.807 402.395L403.453 599.041C378.666 618.076 348.202 628.231 316.952 627.874C280.139 627.723 244.878 613.032 218.847 587.001C192.816 560.97 178.125 525.709 177.973 488.896Z" fill="#3E6957" fill-opacity="0.1"/>',
        '<path d="M763.007 627.729C781.419 627.805 799.664 624.237 816.69 617.231C833.717 610.225 849.188 599.919 862.214 586.906C875.239 573.894 885.562 558.433 892.585 541.414C899.609 524.394 903.196 506.153 903.138 487.742C903.483 456.493 893.33 426.033 874.305 401.241L677.083 598.463C701.598 617.641 731.883 627.956 763.007 627.729Z" fill="#3E6957" fill-opacity="0.1"/>',
        '<path d="M915.115 361.294C945.432 396.895 962.092 442.123 962.114 488.883C962.076 541.471 941.159 591.891 903.96 629.063C866.762 666.234 816.326 687.115 763.738 687.115C717.222 687.167 672.184 670.775 636.582 640.837L541.143 736.276L445.703 640.837C410.077 670.829 364.973 687.226 318.403 687.115C292.303 687.209 266.442 682.153 242.3 672.235C218.158 662.317 196.211 647.733 177.715 629.318C159.22 610.903 144.54 589.019 134.517 564.921C124.494 540.822 119.325 514.983 119.306 488.883C119.344 442.339 135.722 397.285 165.585 361.583L121.036 317.035L78.5073 273.784C27.275 358.017 0.238835 454.737 0.367523 553.326C0.34857 624.189 14.2949 694.361 41.4085 759.831C68.5221 825.302 108.272 884.787 158.386 934.888C208.5 984.989 267.996 1024.72 333.474 1051.82C398.952 1078.91 469.126 1092.84 539.989 1092.8C682.994 1092.77 820.14 1035.98 921.314 934.914C1022.49 833.848 1079.42 696.764 1079.61 553.759C1080.5 455.185 1053.73 358.338 1002.34 274.217L915.115 361.294Z" fill="#3E6957" fill-opacity="0.1"/>',
        '<path d="M930.832 181.236C880.511 128.328 819.946 86.216 752.828 57.4651C685.71 28.7143 613.441 13.9258 540.424 14.0003C467.392 13.9649 395.114 28.7706 327.978 57.5185C260.842 86.2664 200.247 128.357 149.872 181.236C136.753 195.652 123.923 210.069 111.957 225.495L539.991 653.386L968.027 225.063C956.726 209.557 944.294 194.908 930.832 181.236ZM540.424 553.478L208.838 221.891C252.191 178.076 303.845 143.345 360.78 119.729C417.715 96.1136 478.787 84.0876 540.424 84.3545C602.073 84.0149 663.166 96.0077 720.111 119.627C777.056 143.247 828.702 178.017 872.011 221.891L540.424 553.478Z" fill="#3E6957" fill-opacity="0.1"/>',
        '</g>',
        '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">Dynamic NFT Minted on Gnosis Chain</text>',
        '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">with TokenID # ', tokenId.toString(), '</text>',
        '</svg>'
    );
    return string(
        abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(svg)
        )
    );
}


    function getNFTID(uint256 tokenId) public pure returns (string memory) {
        return tokenId.toString();
    }

    function getTokenURI(uint256 tokenId) public pure returns (string memory){
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "DG-NFT #', tokenId.toString(), '",',
                '"description": "NFT minted on Gnosis Chain",',
                '"image": "', generateSVG(tokenId), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }


   function mint() public {
    uint256 tokenId = _tokenIdCounter;
    _tokenIdCounter += 1;
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, getTokenURI(tokenId));
   }

    function transferNFT(address recipient, uint256 tokenId) public {
    require(_exists(tokenId), "ERC721: token does not exist");
    require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
    require(ownerOf(tokenId) == msg.sender, "ERC721: transfer of token that is not own");
    require(recipient != address(0), "ERC721: transfer to the zero address");

    safeTransferFrom(msg.sender, recipient, tokenId);
    }

    function getOwnedNFTIndexes(address owner) public view returns (uint256[] memory) {
    uint256 numTokens = balanceOf(owner);
    uint256[] memory tokenIndexes = new uint256[](numTokens);
    for (uint256 i = 0; i < numTokens; i++) {
        tokenIndexes[i] = tokenOfOwnerByIndex(owner, i);
    }
    return tokenIndexes;
}






// The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
         return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}