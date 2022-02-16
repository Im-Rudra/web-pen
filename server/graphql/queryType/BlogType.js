const graphql = require('graphql');
const User = require('../../models/user');
const Category = require('../../models/category');

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLID },
    categoryId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.authorId);
      }
    },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryId);
      }
    }
  })
});

module.exports = BlogType;

const UserType = require('../queryType/UserType');
const CategoryType = require('../queryType/CategoryType');
