import { EvmBatchProcessor } from '@subsquid/evm-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { DataStoredEvent } from './model';

// Replace this with the actual Keccak-256 hash of the event signature: my case is 'DataStored(uint256)'
// this helps determine which event has been found. You can find this my debugging the received logs
const DataStoredEventTopic = '0x9455957c3b77d1d4ed071e2b469dd77e37fc5dfd3b4d44dc8a997cc97c7b3d49';

// address for the contract that has been deployed
const CONTRACT_ADDRESS = '0xdbdac2ef52681230f996624a5fa2624b06972671';

const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
    url: 'https://rpcpc1-qa.agung.peaq.network', // RPC url for peaq's agung test net
  })
  .setFinalityConfirmation(5)
  .setBlockRange({ from: 3564900 })
  .addLog({
    address: [CONTRACT_ADDRESS]
  })
  .setFields({
    log: {
      transactionHash: true,
    },
  });

const db = new TypeormDatabase();

processor.run(db, async (ctx) => {
  const events: DataStoredEvent[] = [];
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      // uncomment for helpful debugging
      // console.log(block);
      if (log.topics[0] === DataStoredEventTopic) {  // Check for the correct event
        const data = BigInt(log.data);

        // used for debugging
        console.log("ID: ", log.id);
        console.log("DATA: ", data);
        console.log("BLOCK_NUMBER: ", block.header.height);
        console.log("TX_HASH: ", log.block.hash);

        // adds the new event from the chain to your database that you can query from
        events.push(new DataStoredEvent({
          id: log.id,
          data: Number(data),
          blockNumber: block.header.height,
          transactionHash: log.block.hash,
        }));
      }
    }
  }
  await ctx.store.insert(events);
});

