// @ts-ignore
import connectSqlite3 from 'connect-sqlite3';
import express from 'express';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import { pc } from './prisma-client';
import { schema } from './schema';
import dotenv from 'dotenv';

dotenv.config();

// I like to use redis for this: https://github.com/tj/connect-redis
const SQLiteStore = connectSqlite3(session);

const app = express();

app.use(
    session({
        store: new SQLiteStore({
            db: './prisma/db.db',
            concurrentDB: true,
        }),
        name: 'qid',
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
    })
);

const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
        req,
        res,
        pc,
    }),
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
});

async function startApolloServer(app: express.Application, apolloServer: ApolloServer) {
    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: true,
            credentials: true,
        },
    });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}/graphql`);
    });
}

startApolloServer(app, apolloServer);
