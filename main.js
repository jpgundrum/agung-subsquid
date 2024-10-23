"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evm_processor_1 = require("@subsquid/evm-processor");
const typeorm_store_1 = require("@subsquid/typeorm-store");
const model_1 = require("./model");
// ABI for decoding the event, manually derived from your ABI
const DataStoredEventTopic = '0x15819cc432b17495377e037fbf2644c6f4ee2730e4661c8cfedb6c219402ecab'; // Replace this with the actual Keccak-256 hash of the event signature 'DataStored(uint256)'
const CONTRACT_ADDRESS = '0xdbdac2ef52681230f996624a5fa2624b06972671';
const processor = new evm_processor_1.EvmBatchProcessor()
    .setRpcEndpoint({
    url: 'https://rpcpc1-qa.agung.peaq.network', // Update with your Agung network RPC
    rateLimit: 10,
})
    .setFinalityConfirmation(5) // Specify 75 confirmations for finality
    .setBlockRange({ from: 3564870 }) // Start from a specific block height
    .addLog({
    address: [CONTRACT_ADDRESS],
    topic0: [DataStoredEventTopic]
})
    .setFields({
    log: {
        transactionHash: true,
    },
});
const db = new typeorm_store_1.TypeormDatabase();
processor.run(db, async (ctx) => {
    const events = [];
    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            // Decode the event data manually, since it's a single uint256 parameter
            const data = BigInt(log.data);
            events.push(new model_1.DataStoredEvent({
                id: log.id,
                data: Number(data), // Convert BigInt to number if needed
                blockNumber: block.header.height, // Access block height
                transactionHash: log.transaction?.hash // Access transaction hash
            }));
        }
    }
    await ctx.store.insert(events);
});
