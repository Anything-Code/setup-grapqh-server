import { User } from 'nexus-prisma';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { makeSchema, mutationType, objectType, queryType } from 'nexus';
import { join } from 'path';
// import { getStoredUser, storeUser } from './customUserResolvers';

export const schema = makeSchema({
    plugins: [
        nexusPrisma({
            experimentalCRUD: true,
        }),
    ],
    outputs: {
        typegen: join(process.cwd(), 'src', 'types', 'generated', 'nexus.d.ts'),
        schema: join(process.cwd(), 'src', 'types', 'generated', 'schema.graphql'),
    },
    types: [
        objectType({
            name: User.$name,
            description: User.$description,
            definition(t) {
                t.field(User.id.name, User.id);
                t.field(User.name.name, User.name);
                t.field(User.email.name, User.email);
                t.field(User.password.name, User.password);
            },
        }),
        queryType({
            definition(t) {
                t.crud.users();
                t.crud.user();
            },
        }),
        mutationType({
            definition(t) {
                t.crud.createOneUser();
                t.crud.upsertOneUser();
                t.crud.updateOneUser();
                t.crud.deleteOneUser();
            },
        }),
    ],
});
