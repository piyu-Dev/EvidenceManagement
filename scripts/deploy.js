const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.deployContract("ComplaintManagement");

  await Upload.waitForDeployment();

  console.log("Library deployed to:", Upload.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
