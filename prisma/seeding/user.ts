import faker from 'faker';
import { Range } from 'immutable';
import { pc } from '../../src/prisma-client';

export const userPromises = Range(1, 100).map((i) => {
    return pc.user.create({
        data: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        },
    });
});
