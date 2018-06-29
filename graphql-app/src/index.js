const { GraphQLServer } = require("graphql-yoga");
const Prisma = require('prisma-binding').Prisma;

const resolvers = {
  Query: {
    info: () => "This is test API",
    feed: (root,args,context,info) => {
        return context.db.query.links({},info);
    }
    // link: (root,args) => {
    //     for( let link of list) {
    //         if(link.id == args.id){
    //             return link
    //         }
    //     }
    // }
  },
  //Optional
//   Link: {
//     id: root => root.id,
//     description: root => root.description,
//     url: root => root.url
//   },
  Mutation: {
    post: (root,args,context,info) => {
        return context.db.mutation.createLink({
            data: {
                description: args.description,
                url : args.url
            }
        },info);
    },
//     updateLink : (root,args) => {
//         for(let link of list){
//             if(link.id == args.id){
//                 link.description = args.description,
//                 link.url = args.url
//                 return link
//             }
//         }
//     },
//     deleteLink : (root, args) => {
//         let deletedLink
//         list = list.filter(((value) => {
//             if(value.id != args.id){
//                 return value
//             }else{
//                 deletedLink = value;
//             }
//         }));
//         return deletedLink;
//     } 
    }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
      ...req,
      db : new Prisma({
          typeDefs : 'src/generated/prisma.graphql',
          endpoint: 'https://us1.prisma.sh/public-yellowcentaur-956/hackernews-node/dev',
          secret: 'mysecret123',
          debug: true
      })
  })
});
server.start(() => console.log("Server is running"));
