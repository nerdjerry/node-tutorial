const { GraphQLServer } = require("graphql-yoga");

let list = [
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
    feed: () => list,
    link: (root,args) => {
        for( let link of list) {
            if(link.id == args.id){
                return link
            }
        }
    }
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
    },
    updateLink : (root,args) => {
        for(let link of list){
            if(link.id == args.id){
                link.description = args.description,
                link.url = args.url
                return link
            }
        }
    },
    deleteLink : (root, args) => {
        let deletedLink
        list = list.filter(((value) => {
            if(value.id != args.id){
                return value
            }else{
                deletedLink = value;
            }
        }));
        return deletedLink;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log("Server is running"));
