const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const typeDefs = `{
    type Query {
        user(id :ID!) : User
    }
    
    type User {
        id: ID!,
        name : String!
    }
}`;

const resolvers = {
    Query : {
        user : (root,args,context,info) => {
            return fetchUserById(args.id)
        }
    },
};

const Schema = makeExecutableSchema({
    typeDefs,
    resolvers
});