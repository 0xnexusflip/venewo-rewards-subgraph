import { execute } from '../.graphclient';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
require('dotenv').config();

const userQuery = `
    query users {
        users(first: 6000, block: {number: ${process.argv[2]}}, where: {currentUserShares_gt: 0, unlockDate_gt: ${process.argv[3]}}, orderBy: unlockDate, orderDirection: asc) {
            id
            currentUserShares
            unlockDate
        }
    }
`;

const csvFilename = `${process.argv[2]}_${process.argv[3]}_${process.env.SUBGRAPH_NAME?.slice(7)}.csv`;
const csvFilePath = path.join(`${__dirname}/outputs`, csvFilename);

async function main() {
    const { data: { users } } = await execute(userQuery, {});

    console.log(users);
    console.log('user query length', users.length);

    const csvWriter = createObjectCsvWriter({
        path: csvFilePath,
        header: [
            { id: 'id', title: 'User Address' },
            { id: 'currentUserShares', title: 'veNEWO Balance' },
            { id: 'unlockDate', title: 'Unlock Timestamp' }
        ]
    });

    const records = users.map(user => ({
        id: user.id,
        currentUserShares: user.currentUserShares,
        unlockDate: user.unlockDate
    }));

    await csvWriter.writeRecords(records);

    console.log(`Data saved to ${csvFilename}`);
}

main().catch(console.error);