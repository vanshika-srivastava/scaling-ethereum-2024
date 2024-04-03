import { ethers } from "hardhat";


async function main() {
  const DynamicNFT = await ethers.getContractFactory("DynamicNFT");
  const nft = await DynamicNFT.deploy();

  await nft.deployed();

  console.log("NFT Contract deployed to:", nft.address,"for using biconomy sdk for this demo");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});