import React, { useState } from "react"

import { useMutation, useQuery } from "@apollo/client"
import { EDIT_AUTHOR, ALL_AUTHORS } from "./queries"
import Select from "react-select"

const BirthYear = props => {
  const result = useQuery(ALL_AUTHORS)

  const [born, setBorn] = useState("")
  const [name, setName] = useState("")
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (result.loading) {
    return null
  }

  const save = () => {
    console.log(name + " borned " + born)
    editAuthor({ variables: { name: name, born: parseInt(born) } })
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Set birthyear</h2>
      <Select
        value={{ value: name, label: name }}
        options={authors.map(a => {
          return { value: a.name, label: a.name }
        })}
        onChange={selected => {
          setName(selected.label)
          const author = authors.find(a => a.name === selected.label)
          setBorn(author === undefined ? "" : author.born)
        }}
      />
      <span>Born</span>
      <input value={born} onChange={e => setBorn(e.target.value)} />
      <button onClick={save}>Update author</button>
    </div>
  )
}

export default BirthYear
