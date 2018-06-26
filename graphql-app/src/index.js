const { GraphQLServer } = require("graphql-yoga");

const list = [
  {
    id: 0,
    description: "This is a link",
    url: "google.com"
  }
];
let counter = list.length;
const resolvers = {
  Query: {
    info: () => "This is test API",
    feed: () => list
  },
  //Optional
  Link: {
    id: root => root.id,
    description: root => root.description,
    url: root => root.url
  },
  Mutation: {
    post: (root,args) => {
        var link = {
            id : counter++,
            description : args.description,
            url: args.url
        };
        list.push(link);
        return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log("Server is running"));
