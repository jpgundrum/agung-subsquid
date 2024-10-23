import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, StringColumn as StringColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class DataStoredEvent {
    constructor(props?: Partial<DataStoredEvent>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    data!: number

    @IntColumn_({nullable: false})
    blockNumber!: number

    @StringColumn_({nullable: false})
    transactionHash!: string
}
