const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');


const app = express();

app.use(express.json())

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0.cba8c.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //mmongo db pasw TBGRv5GAF4sDbMIW
        app.listen(4000, () => {
            console.log('server is listening on: 4000');
        });
    }).catch(err => {
        console.log(err);
    })

