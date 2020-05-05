import React, { useState } from "react"
import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "./queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState("")

  if (!props.show) {
    return null
  }
  if (props.genre && genre !== localStorage.getItem("library-genre")) {
    setGenre(localStorage.getItem("library-genre"))
  }

  if (result.loading) {
    return <div>Loading books...</div>
  }

  const allbooks = result.data.allBooks

  const genrelist = allbooks.map((b) => b.genres)
  const allgenres = [].concat.apply([], genrelist)
  const genres = [...new Set(allgenres)]

  const books = allbooks.filter((b) => genre === "" || b.genres.includes(genre))

  return (
    <div>
      {props.genre && <h2>recommendations</h2>}
      {!props.genre && <h2>books</h2>}
      {genre !== "" && (
        <p>
          In {props.genre && <span>your favorite </span>}genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
        <div>
          {genres.map((a) => (
            <button onClick={() => setGenre(a)}>{a}</button>
          ))}
          <button onClick={() => setGenre("")}>ALL</button>
        </div>
      </table>
    </div>
  )
}

export default Books
