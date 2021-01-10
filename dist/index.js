"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrpyptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CrpyptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.vlidateStructure = (aBlock) => typeof aBlock.index === "number" && typeof aBlock.hash === "string" && typeof aBlock.previousHash == "string" && typeof aBlock.timestamp === "number" && typeof aBlock.data === "string";
const genesisBlock = new Block(0, "202020202020202", "", "Hello", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (condidateBlock, previousBlock) => {
    if (!Block.vlidateStructure(condidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== condidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== condidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(condidateBlock) !== condidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map