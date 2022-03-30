import "./App.css"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
} from "@apollo/client"

// Article: https://stackoverflow.com/questions/69629051/using-multiple-endpoints-in-apollo-client
// components
import ContainerSection from "./components/layout/ContainerSection"

const rateEndpoint = new HttpLink({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
})

const dogEndpoint = new HttpLink({
  uri: "https://71z1g.sse.codesandbox.io/",
})

const todoEndpoint = new HttpLink({
  uri: "https://sxewr.sse.codesandbox.io/",
})

// apollo client
// TODO: may not be the best solution, it will make hell
// Article: https://stackoverflow.com/questions/69261972/apollo-with-multiple-graphql-endpoints
const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "rateEndpoint",
    rateEndpoint,
    ApolloLink.split(
      (operation) => operation.getContext().clientName === "dogEndpoint",
      dogEndpoint,
      todoEndpoint
    )
  ),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ContainerSection />
      </div>
    </ApolloProvider>
  )
}

export default App
