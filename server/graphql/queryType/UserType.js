const graphql = require('graphql');
const Blog = require('../../models/blog');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } =
  graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    phone: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args) {
        return Blog.find({ authorId: parent.id });
      }
    }
  })
});

module.exports = UserType;

const BlogType = require('./BlogType');
