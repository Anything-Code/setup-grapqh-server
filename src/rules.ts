import { ruleType } from 'nexus-shield';

export const isAuthenticatedRuleType = ruleType({
    resolve(_root, _args, { req }) {
        return req.session.authenticated ? true : false;
    },
});

export const isAuthenticated = {
    shield: isAuthenticatedRuleType,
};

export interface isAuthenticatedType<T> {
    shield: T;
}
