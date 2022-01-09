import React, { useState } from 'react'
import { useMutation, useQuery } from "@apollo/client"
import { AUTHOR_QUERY, ADD_BOOK_MUTATION, BOOKS_QUERY } from '../queries/queries';

const AddBook = () => {

    const initialState = {
        name: '',
        genre: '',
        authorId: ''
    }
    const [name, setName] = useState(initialState.name)
    const [genre, setGenre] = useState(initialState.genre)
    const [authorId, setAuthorId] = useState(initialState.authorId)
    const { loading, data } = useQuery(AUTHOR_QUERY)
    const [onSubmitHandler] = useMutation(ADD_BOOK_MUTATION)

    const displayAuthors = () => {
        if (loading) {
            return (
                <option disabled>Loading Authors...</option>
            )
        } else {
            return (
                data.authors.map(author => {
                    const { id, name } = author
                    return (
                        <option
                            className="book-list"
                            key={id}
                            value={id}
                        >
                            {name}
                        </option>
                    )
                })
            )
        }
    }


    // Parse Form Data to MongoDB
    const useHandleSubmit = async (e) => {
        e.preventDefault()
        setName('')
        setGenre('')
        setAuthorId('')
    }
    
    return (
        <form id="add-book" onSubmit={useHandleSubmit}>
        
            <div className="field">
                <label htmlFor="Book Name:">Book Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} 
                />
            </div>
        
            <div className="field">
                <label htmlFor="Book Name:">Book Genre:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                />
            </div>

            <div className="field">
                <label htmlFor="Book Name:">Book Author:</label>
                <select
                    onChange={e => setAuthorId(e.target.value)}
                >
                    {displayAuthors()}
                </select>
            </div>

            <button
                type="submit"
                onClick={() => onSubmitHandler({ variables: { name, genre, authorId }, refetchQueries: [BOOKS_QUERY]})}
            >+</button>

        </form>
    )
}

export default AddBook