const {importSchema} = require('graphql-import');
const {GraphQLServer} = require('graphql-yoga');
const {HttpLink} = require('apollo-link-http');
const fetch = require('node-fetch');
const {makeRemoteExecutableSchema, delegateToSchema, makeExecutableSchema, introspectSchema}  = require('graphql-tools');
const fs = require('fs');

//Convinence class to create GitHub Link
class GitHubLink extends HttpLink{
    constructor(token){
        if(!token){
            throw new Error(
                'No token provided.Please provide a token'
            )
        }
        super({
            uri: "https://api.github.com/graphql",
            headers: {Authorization: `Bearer ${token}`},
            fetch
        });
    }
}

const link = new GitHubLink('076509b5b1b3118f2e73fc8f68fba21facaa2275');
//Make Github executable schema
async function gitSchema(){
    introspectedSchema = await introspectSchema(link);
    gitHubExecutableSchema = makeRemoteExecutableSchema({
        schema : introspectedSchema,
        link
    });
}
gitSchema();
const typeDefs = importSchema('./src/schemadelegation.graphql');
const resolvers = {
    Query : {
        info : () => "This is API that shows schema delegation",
        graphcool : (paremt, args, context, info) => {
            return delegateToSchema({
                schema: gitHubExecutableSchema,
                operation: "query",
                fieldName: "repositoryOwner",
                args: {login: "graphcool"},
                context,
                info
            });
        },
        graphcoolRepositories : (parent, {names} ,context,info) => {
            return Promise.all(
                names.map(name => 
                    delegateToSchema({
                        schema: gitHubExecutableSchema,
                        operation: "query",
                        fieldName: "repository",
                        args : {owner : 'graphcool', name},
                        context,
                        info
                    }
                ))
            )
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});
server.start(() => "Server is started");


