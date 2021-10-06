import { ruleType } from 'nexus-shield';

export const isAuthenticated = {
    shield: ruleType({
        resolve(_root, _args, { req }) {
            return req.session.authenticated ? true : false;
        },
    }),
};
