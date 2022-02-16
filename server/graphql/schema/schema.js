const graphql = require('graphql');
const Mutation = require('../queryType/Mutation');
const RootQuery = require('../queryType/RootQuery');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
