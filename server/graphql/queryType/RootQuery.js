const graphql = require('graphql');
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Category = require('../../models/category');
const UserType = require('./UserType');
const CategoryType = require('./CategoryType');
const BlogType = require('./BlogType');

const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
      },
      resolve(parent, { id, email }) {
        const queryDoc = {
          $or: [{ _id: id }, { email }]
        };
        return User.find(queryDoc);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      }
    },
    blog: {
      type: BlogType,
      args: {
        id: { type: GraphQLID },
        slug: { type: GraphQLString }
      },
      resolve(parent, { id, slug }) {
        const queryDoc = {
          $or: [{ _id: id }, { slug }]
        };
        return Blog.find(queryDoc);
      }
    },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args) {
        return Blog.find({});
      }
    },
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Category.find({ _id: args.id });
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      }
    }
  }
});

module.exports = RootQuery;
