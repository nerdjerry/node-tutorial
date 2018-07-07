const fetch = require('node-fetch');
const makeRemoteExecutableSchema = require('graphql-tools').makeRemoteExecutableSchema;
const introspection = require('graphql-tools').introspectSchema;
const httpLink = require('apollo-link-http').createHttpLink;
const GraphQLServer = require('graphql-yoga').GraphQLServer;

async function run(){
    const link = httpLink({uri: "https://api.graph.cool/simple/v1/cjas9350b0v6r0188tcubcduz",fetch});

    const databaseSchema = await introspection(link);

    const executableRemoteSchema = makeRemoteExecutableSchema({
        schema: databaseSchema,
        link: link
    });

    const server = new GraphQLServer({schema: executableRemoteSchema});
    server.start();
}
run();