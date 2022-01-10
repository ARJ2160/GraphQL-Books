import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client"
import { GET_BOOK_QUERY } from "../queries/queries"

const BookDetails = ({ selectedId }) => {
    
    const [bookId, setBookId] = useState('')
    
    const { loading, error, data, refetch } = useQuery(GET_BOOK_QUERY, {
        variables: { id: bookId },
        enabled: false
    })

    useEffect(() => {
        setBookId(selectedId)
        refetch()
    }, [bookId, selectedId, refetch])
    
    if (loading) {
        return (
            <div id="book-details">
                <h1>Loading Details</h1>
            </div>
        )
    } else if (error) {
        throw new Error(error.message || error)
    }
    else if (data.book !== null && data.book.author !== null) {
        const { name, genre, author } = data.book
        return (
            <div id="book-details">
                <h2>Name: {name}</h2>
                <p>Genre: {genre}</p>
                <p>Author: {author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    { author.books.map(item => {
                        return <li key={item.id}>{ item.name }</li>
                    })}
                </ul>
            </div>
        )}
        else {
        return (
            <div>
                <h1>Click on a Book</h1>
            </div>
            )
        }
    }

export default BookDetails