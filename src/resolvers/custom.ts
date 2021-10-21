import { AuthenticationError } from 'apollo-server-errors';
import { mutationField, nonNull, nullable, queryField } from 'nexus';
import { isAuthenticatedRuleType } from '../rules';
import { pc } from '../prisma-client';

export const register = mutationField('register', {
    type: 'User',
    args: { name: nonNull('String'), email: nonNull('String'), password: nonNull('String') },
    description: 'Registers a new user.',
    async resolve(_root, { name, email, password }, { req }) {
        const user = await pc.user.create({ data: { name, email, password } });

        req.session.authenticated = true;
        req.session.user = user;

        console.log(req.session);

        return user;
    },
});

export const login = mutationField('login', {
    type: 'User',
    args: { email: nonNull('String'), password: nonNull('String') },
    description: 'Logs a user in',
    async resolve(_root, { email, password }, { req }) {
        const user = await pc.user.findFirst({ where: { email } });
        if (user == null) {
            throw AuthenticationError;
        }
        const correctPassword = user.password === password;
        if (!correctPassword) {
            throw AuthenticationError;
        }

        req.session.authenticated = true;
        req.session.user = user;

        return user;
    },
});

export const logout = mutationField('logout', {
    type: 'Boolean',
    shield: isAuthenticatedRuleType,
    resolve(_root, _args, { req, res }) {
        res.clearCookie('qid');

        return true;
    },
});

export const me = mutationField('me', {
    type: 'User',
    shield: isAuthenticatedRuleType,
    resolve(_root, _args, { req }): any {
        return req.session.user;
    },
});

export const updateMyself = mutationField('updateMyself', {
    type: 'User',
    args: { name: nullable('String'), email: nullable('String'), password: nullable('String') },
    shield: isAuthenticatedRuleType,
    async resolve(_root, { name, email, password }, { req }) {
        const user = await pc.user.findFirst({ where: { id: req.session.user.id } });
        const updatedUser = await pc.user.update({
            where: {
                id: req.session.user.id,
            },
            data: {
                name: name ?? user!.name,
                email: email ?? user!.email,
                password: password ?? user!.password,
            },
        });

        return updatedUser;
    },
});

export const deleteMyself = mutationField('deleteMyself', {
    type: 'Boolean',
    args: { confirm: nonNull('Boolean') },
    shield: isAuthenticatedRuleType,
    async resolve(_root, { confirm }, { req, res }) {
        const deletedUser = await pc.user.delete({
            where: {
                id: req.session.user.id,
            },
        });

        res.clearCookie('qid');

        return true;
    },
});
