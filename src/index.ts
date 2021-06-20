import { ApolloServer } from 'apollo-server';
import { pc } from './prisma-client';
import { schema } from './schema';

const server = new ApolloServer({
    schema,
    context: () => {
        return {
            prisma: pc,
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
