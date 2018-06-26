const {GraphQLServer} = require('graphql-yoga');

const typeDefs = `
type Query{
    info: String!,
    feed : [Link!]!,
}
type Link {
    id: ID!,
    description: String!,
    url: String!
}
`;
const list = [{
    id : 3223,
    description : "This is a link",
    url : "google.com"
}]
const resolvers = {
    Query : {
        info : () => "This is test API",
        feed : () => list,
    },
    //Optional
    Link : {
        id : (root) => root.id,
        description : (root) => root.description,
        url: (root) => root.url,
    }
};

const server = new GraphQLServer({typeDefs, resolvers});
server.start(() => console.log("Server is running"));