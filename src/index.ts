import { LogicalReplicationService, PgoutputPlugin, Wal2Json, Wal2JsonPlugin } from 'pg-logical-replication';

import * as dotenv from 'dotenv';

dotenv.config();

const slotName = process.env.SLOT_NAME || '';

const service = new LogicalReplicationService(
    /**
     * node-postgres Client options for connection
     * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pg/index.d.ts#L16
     */
    {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        user: process.env.POSTGRES_USER
        // ...
    },
    /**
     * Logical replication service config
     * https://github.com/kibae/pg-logical-replication/blob/main/src/logical-replication-service.ts#L9
     */
    {
        acknowledge: {
            auto: true,
            timeoutSeconds: 10
        }
    }
);
// `TestDecodingPlugin` for test_decoding and `ProtocolBuffersPlugin` for decoderbufs are also available.
const plugin = new Wal2JsonPlugin({
    /**
     * Plugin options for wal2json
     * https://github.com/kibae/pg-logical-replication/blob/main/src/output-plugins/wal2json/wal2json-plugin-options.type.ts
     */
    //...
});

/**
 * Wal2Json.Output
 * https://github.com/kibae/pg-logical-replication/blob/ts-main/src/output-plugins/wal2json/wal2json-plugin-output.type.ts
 */
service.on('data', (lsn: string, log: Wal2Json.Output) => {
    // Do something what you want.
    // log.change.filter((change) => change.kind === 'insert').length;
});

service.on('error', (err: Error) => {});

// Start subscribing to data change events.
const main = () => {
    service
        .subscribe(plugin, slotName)
        .catch((e) => {
            console.error(e);
        })
        .then(() => {
            setTimeout(main, 100);
        });
};

main();
