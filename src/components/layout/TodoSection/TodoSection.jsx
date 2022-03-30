import { useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"

// components
import LoadingSection from "../LoadingSection"
import ErrorPage from "../ErrorPage"

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`

const GET_TODOS = gql`
  query getTodos {
    todos {
      id
      type
    }
  }
`

function TodoSection() {
  const [value, setValue] = useState("")
  const { data: listData } = useQuery(GET_TODOS, {
    context: { clientName: "todoEndpoint" },
  })
  const [addTodo, { data: addData, loading, error }] = useMutation(ADD_TODO, {
    context: { clientName: "todoEndpoint" },
    refetchQueries: [
      GET_TODOS, // DocumentNode object parsed with gql
      "getTodos", // Query name
    ],
  })

  // operations
  const todoSubmit = (e) => {
    e.preventDefault()
    addTodo({
      variables: { type: value },
      context: { clientName: "todoEndpoint" },
    })
  }

  if (loading) return <LoadingSection />
  if (error) return <ErrorPage />

  return (
    <div>
      <div>
        {listData?.todos.map(({ id, type }) => {
          return (
            <p key={id}>
              {id} : {type}
            </p>
          )
        })}
      </div>
      <hr />
      <form action="submit" onSubmit={todoSubmit}>
        <label htmlFor="todo"></label>
        <input
          type="text"
          name="todo"
          id="todo_input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Submit</button>
        {addData && <h1>Upload Completed</h1>}
      </form>
    </div>
  )
}

export default TodoSection
