## How to setup indexer for peaq's test chain agung

The following was done by following the 

1. Create a squid:
Follow the instructions for [creation](https://docs.sqd.dev/squid-cli/installation/). After doing so create a new squid with the name of your choice. This will be used later.

2. Indexer from scratch:
Follow steps 1-6 from the subsquid [tutorial](https://docs.sqd.dev/sdk/how-to-start/squid-from-scratch/)
- For step 4 make sure your construct schema for your database to contain the events you would like to query for
- For step 6 name the db the same name you created in the previous step one when creating the squid
- Can skip step 7.
- For step 8 please see how the /src/main.ts file is constructed in this repo

3. Compile and start processor process
```
npx tsc
node -r dotenv/config lib/main.js
```

4. Start the GraphQL server
In a separate terminal you can start the server using:
```
npx squid-graphql-server
```