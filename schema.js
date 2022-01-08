const graphql = require('graphql')
const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLSchema
} = graphql


let books = [
    { name: "The Hard Thing About Hard Things",genre: "Fantasy", id: "1", authorID: "1" },
    { name: "The 10X Rule",genre: "Action", id: "2", authorID: "2"  },
    { name: "The Lean Startup",genre: "Mystery", id: "3", authorID: "3"  },
    { name: "Think Like a Monk",genre: "Mystery", id: "3", authorID: "3"  },
    { name: "Atomic Habits",genre: "Mystery", id: "3", authorID: "3"  },
    { name: "Tools of Titans",genre: "Mystery", id: "3", authorID: "3"  },
]

let authors = [
    { name: "Tom Freslin",age: 44 , id: "1" },
    { name: "Grant Cardone",age: 33 , id: "2" },
    { name: "James Clear",age: 23 , id: "3" },
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return _.find(authors, {id: parent.authorID})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                // Code to get data from DB
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return _.find(authors, { id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery
})