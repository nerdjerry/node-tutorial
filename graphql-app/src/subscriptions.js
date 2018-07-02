const GraphQLServer = require('graphql-yoga').GraphQLServer;
const PubSub = require('graphql-yoga').PubSub;
const pubsub = new PubSub();

const typeDefs = `
    type Subscription { 
        somethingChanged : Result
    }

    type Query{
        result : String
    }

    type Result {
        id : String
    }
`;

const resolvers = {
    Query : {
        result : () => "Hello World"
    },
    Subscription : {
        somethingChanged : {
            subscribe : (root,args,{pubsub},info) => {
                var count = 0;
                setInterval(() => pubsub.publish(CHANNEL, {somethingChanged : {id: count++}}),2000);
                return pubsub.asyncIterator(CHANNEL);
        }
    }
}};

const CHANNEL = "some_channel";

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context : {pubsub}
});
server.start();