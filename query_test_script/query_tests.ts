import { execute } from '../.graphclient';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
require('dotenv').config();

const userQuery = `
    query users {
        users(first: 6000, block: {number: ${process.argv[2]}}, where: {currentUserShares_gt: 0, unlockDate_lte: ${process.argv[3]}}, orderBy: unlockDate, orderDirection: asc) {
            id
            currentUserShares
            unlockDate
        }
    }
`;

const contractQuery = `
    query factories {
        factories(first: 1, block: {number: ${process.argv[2]}}) {
            id
            currentSharesMinted
        }
    }
`;

const csvUsersFilename = `${process.argv[2]}_${process.argv[3]}_${process.env.SUBGRAPH_NAME?.slice(7)}_users.csv`;
const csvUsersFilePath = path.join(`${__dirname}/test_outputs`, csvUsersFilename);

const csvFactoryFilename = `${process.argv[2]}_${process.argv[3]}_${process.env.SUBGRAPH_NAME?.slice(7)}_factory.csv`;
const csvFactoryFilePath = path.join(`${__dirname}/test_outputs`, csvFactoryFilename);


async function main() {
    const { data: { factories } } = await execute(contractQuery, {});
    const { data: { users } } = await execute(userQuery, {});

    console.log(factories);
    console.log(users);
    console.log('user query length', users.length);

    const csvUserWriter = createObjectCsvWriter({
        path: csvUsersFilePath,
        header: [
            { id: 'id', title: 'User Address' },
            { id: 'currentUserShares', title: 'veNEWO Balance' },
            { id: 'unlockDate', title: 'Unlock Timestamp' }
        ]
    });

    const userRecords = users.map(user => ({
        id: user.id,
        currentUserShares: user.currentUserShares,
        unlockDate: user.unlockDate
    }));

    const csvFactoryWriter = createObjectCsvWriter({
        path: csvFactoryFilePath,
        header: [
            { id: 'id', title: 'Contract Address' },
            { id: 'currentSharesMinted', title: 'Total veNEWO Supply' }
        ]
    });

    const factoryRecords = factories.map(factory => ({
        id: factory.id,
        currentSharesMinted: factory.currentSharesMinted
    }));


    await csvUserWriter.writeRecords(userRecords);
    await csvFactoryWriter.writeRecords(factoryRecords);

    console.log(`Data saved to ${csvUsersFilename} and ${csvFactoryFilename}`);
}

main().catch(console.error);