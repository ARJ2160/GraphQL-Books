import { gql } from "@apollo/client";

export const AUTHOR_QUERY = gql`
  {
    authors{
        name
        id
    }
  }
`

export const BOOKS_QUERY = gql`
  {
    books{
        name
        id
    }
  }
`

export const ADD_BOOK_MUTATION = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(
            name: $name,
            genre: $genre,
            authorId: $authorId
        ){
            name
            id
        }
    }
`

export const GET_BOOK_QUERY = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id
                    name
                }
            }
        }
    } 
`

