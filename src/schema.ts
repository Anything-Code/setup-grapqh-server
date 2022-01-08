import { nexusPrisma } from 'nexus-plugin-prisma';
import { makeSchema, mutationType, objectType, queryType } from 'nexus';
import { join } from 'path';
import { login, me, logout, updateMyself, deleteMyself, register } from './resolvers/custom';
import { allow, FieldShieldResolver, nexusShield } from 'nexus-shield';
import { ForbiddenError } from 'apollo-server-express';
import { isAuthenticated, isAuthenticatedType } from './rules';

export const schema = makeSchema({
    plugins: [
        nexusPrisma({
            experimentalCRUD: true,
        }),
        nexusShield({
            defaultError: new ForbiddenError('Not allowed!'),
            defaultRule: allow,
        }),
    ],
    outputs: {
        // typegen: join(process.cwd(), 'src', 'types', 'generated', 'nexus.d.ts'),
        // schema: join(process.cwd(), 'src', 'types', 'generated', 'schema.graphql'),
        typegen: join(process.cwd(), 'node_modules', '@types', 'typegen-nexus', 'index.d.ts'),
        schema: join(process.cwd(), 'generated', 'schema.graphql'),
    },
    types: [
        objectType({
            name: 'User',
            definition(t) {
                t.model.id();
                t.model.name();
                t.model.email();
                t.model.password();
            },
        }),
        queryType({
            definition(t) {
                t.crud.users(isAuthenticated as isAuthenticatedType<FieldShieldResolver<'Query', string>>);
                t.crud.user(isAuthenticated as isAuthenticatedType<FieldShieldResolver<'Query', string>>);
            },
        }),
        // mutationType({
        //     definition(t) {
        //         t.crud.createOneUser();
        //         t.crud.upsertOneUser();
        //         t.crud.updateOneUser();
        //         // t.crud.updateManyUser();
        //         t.crud.deleteOneUser();
        //         // t.crud.deleteManyUser();
        //     },
        // }),
        register,
        login,
        logout,
        me,
        updateMyself,
        deleteMyself,
    ],
});
