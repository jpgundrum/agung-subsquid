module.exports = class Data1729718216380 {
    name = 'Data1729718216380'

    async up(db) {
        await db.query(`CREATE TABLE "data_stored_event" ("id" character varying NOT NULL, "data" integer NOT NULL, "block_number" integer NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_d655d10b55d6364be5dc6040d3b" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "data_stored_event"`)
    }
}
