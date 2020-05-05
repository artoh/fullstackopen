import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { LOGIN, USER_ME } from "./queries"

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  const meResult = useQuery(USER_ME)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
    if (meResult.data && meResult.data.me)
      localStorage.setItem("library-genre", meResult.data.me.favoriteGenre)
  })
  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage("authors")
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password{" "}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
