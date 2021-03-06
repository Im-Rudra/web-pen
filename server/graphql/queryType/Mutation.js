const graphql = require('graphql');
const User = require('../../models/user');
const Blog = require('../../models/blog');
const Category = require('../../models/category');
const UserType = require('./UserType');
const BlogType = require('./BlogType');
const CategoryType = require('./CategoryType');
const slugMaker = require('../../libs/slugMaker');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        phone: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const user = new User(args);
        return user.save();
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        phone: { type: GraphQLString }
      },
      resolve(parent, { id, email, ...rest }) {
        const filter = {
          $or: [{ _id: id }, { email }]
        };
        return User.updateOne(filter, rest);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
      },
      resolve(parent, { id, email }) {
        const filter = {
          $or: [{ _id: id }, { email }]
        };
        return User.deleteOne(filter);
      }
    },
    addBlog: {
      type: BlogType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        categoryId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const slug = slugMaker(args.title);
        const blog = new Blog({ slug, ...args });
        return blog.save();
      }
    },
    editBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        categoryId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const { id, slug, ...rest } = args;
        const filter = {
          $or: [{ _id: id }, { slug }]
        };
        return Blog.updateOne(filter, rest);
      }
    },
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLID },
        slug: { type: GraphQLString }
      },
      resolve(parent, { id, slug }) {
        const filter = {
          $or: [{ _id: id }, { slug }]
        };
        return Blog.deleteOne(filter);
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        categoryName: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const slug = slugMaker(args.categoryName);
        const category = new Category({ slug, ...args });
        return category.save();
      }
    },
    editCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parent, { id, slug, ...rest }) {
        const filter = {
          $or: [{ _id: id }, { slug }]
        };
        return Category.updateOne(filter, rest);
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: GraphQLID },
        slug: { type: GraphQLString }
      },
      resolve(parent, { id, slug }) {
        const filter = {
          $or: [{ _id: id }, { slug }]
        };
        return Category.deleteOne(filter);
      }
    }
  }
});

module.exports = Mutation;
