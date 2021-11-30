const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    // /the below schema is in a string
    schema: buildSchema(`
    
        type RootQuery {
            events:[String!]!
        }

        type RootMutation{
            createEvent(name:String):String
        }
        schema {
            query   :   RootQuery
            mutation:   RootMutation
        }`),
    rootValue: {
        events: _=> ['Cooking Classes', 'Hiking'],
        createEvent: (args)=>{
            const eventName = args.name
            return eventName
        } 
    },
    graphiql: true
}))


app.listen(3000)
