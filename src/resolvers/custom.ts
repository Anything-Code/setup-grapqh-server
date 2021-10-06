import { mutationField, nonNull, nullable, queryField } from 'nexus';
import { pc } from '../prisma-client';

export const login = mutationField('login', {
    type: 'User',
    description: 'Logs a user in',
    resolve(_root, _args, { req }) {
        req.session.authenticated = true;

        console.log(req.session);

        return null;
    },
});

export const logout = mutationField('logout', {
    type: 'User',
    resolve(_root, _args, { req, res }) {
        res.clearCookie('qid');

        console.log(req.session);

        return null;
    },
});

export const check = mutationField('check', {
    type: 'User',
    resolve(_root, _args, { req }) {
        console.log(req.session);

        return null;
    },
});

export const getStoredUser = queryField('getUser', {
    type: nullable('User'),
    args: { id: nullable('Int'), email: nullable('String') },
    description: 'gets a user name',
    resolve: async (_, { id, email }) => {
        if (email) return pc.user.findFirst({ where: { email } });
        if (id) return pc.user.findFirst({ where: { id } });
        return null;
    },
});
