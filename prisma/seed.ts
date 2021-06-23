import { exit } from 'process';
import { pc } from '../src/prisma-client';
import { userPromises } from './seeding/user';

async function main() {
    const users = await Promise.all(userPromises.toArray());

    console.log('\nSeeding was successfull!');
}

main()
    .catch((error) => {
        console.error(error);
        exit(1);
    })
    .finally(async () => {
        await pc.$disconnect();
    });
