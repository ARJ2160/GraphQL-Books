import React from 'react'
import { gql, useQuery } from "@apollo/client"

const AUTHOR_QUERY = gql`
  {
      authors{
          name
          id
      }
  }
`;

const AddBook = () => {

    const { loading, error, data } = useQuery(AUTHOR_QUERY)
        console.log(data);
        if (error) {
            console.log(error);
    }
    
    const displayAuthors = () => {
        if (loading) {
            return (
                <option disabled>Loading Authors...</option>
            )
        } else {
            return (
                data.authors.map(author => {
                    return (
                        <option className="book-list" key={author.id}>{author.name}</option>
                    )
                })
            )
        }
    }

    return (
        <form id="add-book">
        
            <div className="field">
                <label htmlFor="Book Name:">Book Name:</label>
                <input type="text" />
            </div>
        
            <div className="field">
                <label htmlFor="Book Name:">Book Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label htmlFor="Book Name:">Book Author:</label>
                <select>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}

export default AddBook