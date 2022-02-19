const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./graphql/schema/schema');
const app = express();
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ve3u0.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

mongoose.connect(url, () => {
  console.log('connented to MongoDB datebase');
});

app.listen(port, () => {
  console.log('Server is listening at port:', port);
});

app.get('/', (req, res) => {
  res.send(`<h2>Server is running at port: ${port}<h2/>`);
});
