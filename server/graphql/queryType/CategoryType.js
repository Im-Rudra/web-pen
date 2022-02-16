const graphql = require('graphql');
const Blog = require('../../models/blog');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const CategoryType = new GraphQLObjectType({
  name: 'Categroy',
  fields: () => ({
    id: { type: GraphQLID },
    slug: { type: GraphQLString },
    categoryName: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    blogs: {
      type: new GraphQLList(BlogType),
      resolve(parent, args) {
        return Blog.find({ categoryId: parent.id });
      }
    }
  })
});

module.exports = CategoryType;

const BlogType = require('./BlogType');
