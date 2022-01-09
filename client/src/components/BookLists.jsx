import React from 'react'
import { useQuery } from "@apollo/client"
import { BOOKS_QUERY } from '../queries/queries';

const BookLists = () => {

    const { loading, data } = useQuery(BOOKS_QUERY)
    
    const displayBooks = () => {
        if (loading) {
            return (
                <div>Loading Books...</div>
            )
        } else {
            return (
                data.books.map(book => {
                    const { id, name } = book 
                    return (
                        <li className="book-list" key={id}>{name}</li>
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