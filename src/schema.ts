import { User } from 'nexus-prisma';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { makeSchema, mutationType, objectType, queryType } from 'nexus';
import { join } from 'path';
import { getStoredUser, storeUser } from './customUserResolvers';

export const schema = makeSchema({
    plugins: [
        nexusPrisma({
            shouldGenerateArtifacts: true,
            experimentalCRUD: true,
        }),
    ],
    outputs: {
        typegen: join(__dirname, './typegen-nexus.d.ts'),
        schema: join(__dirname, './schema.graphql'),
    },
    types: [
        User,
        getStoredUser,
        storeUser,
        objectType({
            name: User.$name,
            description: User.$description,
            definition(t) {
                t.field(User.id.name, { ...User.id, type: 'Int' });
                t.field(User.email.name, User.email);
            },
        }),
        queryType({
            definition(t) {
                t.crud.users();
            },
        }),
        mutationType({
            definition(t) {
                t.crud.createOneUser();
            },
        }),
    ],
});
