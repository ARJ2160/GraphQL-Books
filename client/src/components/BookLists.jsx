import React, { useState } from 'react'
import { useQuery } from "@apollo/client"
import { BOOKS_QUERY } from '../queries/queries';
import BookDetails from "./BookDetails"

const BookLists = () => {

    const { loading, data } = useQuery(BOOKS_QUERY)
    const [selectedId, setSelectedId] = useState(null)

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
                        <li
                            onClick={() => setSelectedId(id)}
                            key={id}
                            value={name}
                        >{name}</li>
                    )
                })
            )
        }
    }

    if (data !== null) {
        return (
            <div className="books">
                <ul id="book-list">
                    {displayBooks()}
                </ul>
                <BookDetails selectedId={selectedId} />
            </div>
        )
    }
}

export default BookLists

// To append values of a state array
// () => setSelectedId(oldIdValue => [...oldIdValue, id])