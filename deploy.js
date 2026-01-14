import { ethers } from 'ethers';
import fs from 'fs-extra';

async function main(){
//http://127.0.0.1:7545
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new ethers.Wallet(
    "0x42ee8d37aede62887a74d64a85f1842d24d2d336800abf68d6f20e60d50cfcfd",
    provider
);
const abi = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.abi",
    "utf8"
);
const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
);
const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
console.log("Deploying please wait");
const contract = await contractFactory.deploy();
const transactionReceipt = await contract.deployTransaction.wait(1);
console.log(transactionReceipt);

}

main()
.then(() => process.exit(0))
.catch((error)=> {
    console.error(error);
    process.exit(1);
})