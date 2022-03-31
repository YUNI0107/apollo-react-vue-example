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
  const [isCompletedShow, setIsCompletedShow] = useState(false)
  const { data: listData } = useQuery(GET_TODOS, {
    context: { clientName: "todoEndpoint" },
  })
  const [addTodo, { loading, error }] = useMutation(ADD_TODO, {
    context: { clientName: "todoEndpoint" },
    // Refetch the data, get response from server
    // refetchQueries: [
    //   GET_TODOS, // DocumentNode object parsed with gql
    //   "getTodos", // Query name
    // ],
    update(cache, { data: { addTodo } }) {
      // Change the cache data, It on;y rerender when the data is different from the response of server
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `,
            })
            return [...existingTodos, newTodoRef]
          },
        },
      })
    },
    onCompleted: (addData) => completeAddTodo(addData),
  })

  // operations
  const todoSubmit = (e) => {
    e.preventDefault()
    addTodo({
      variables: { type: value },
    })
  }

  const changeInputValue = (e) => {
    if (isCompletedShow) setIsCompletedShow(false)
    setValue(e.target.value)
  }

  const completeAddTodo = (addData) => {
    console.log(addData, "completeAddTodo!!")
    setIsCompletedShow(true)
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
          onChange={changeInputValue}
        />
        <button type="submit">Submit</button>
        {isCompletedShow && <h1>Upload Completed</h1>}
      </form>
    </div>
  )
}

export default TodoSection
