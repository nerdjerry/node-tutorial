const { Binding } = require("graphql-binding");
const { makeExecutableSchema } = require("graphql-tools");

const users = [
  {
    name: "Ujjain"
  },
  {
    name: "Ravan"
  }
];

const typeDefs = `
    type Query {
        findUser(name: String!): User
    }

    type User {
        name: String!
    }
`;

const resolvers = {
  Query: {
    findUser: (parent, { name }, context, info) =>
      users.find(u => u.name === name)
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const userBinding = new Binding({ schema });

userBinding.query.findUser({name : "Ravan"}).then(result => console.log(result));
