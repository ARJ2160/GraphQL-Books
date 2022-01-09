import React from 'react'
import { gql, useQuery } from "@apollo/client"

const BOOKS_QUERY = gql`
  {
      books{
          name
          id
      }
  }
`;

const BookLists = () => {

    const { loading, error, data } = useQuery(BOOKS_QUERY)
    console.log(data);
    if (error) {
        console.log(error);
    }
    
    const displayBooks = () => {
        if (loading) {
            return (
                <div>Loading Books...</div>
            )
        } else {
            return (
                data.books.map(book => {
                    return (
                        <li className="book-list" key={book.id}>{book.name}</li>
                    )
                })
            )
        }
    }
    
    return (
        <div className="book--list">
            <ul id="main">
                {displayBooks()}
            </ul>
        </div>
    )
}

export default BookLists