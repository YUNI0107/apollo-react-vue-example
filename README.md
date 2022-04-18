# Apollo-react-vue-example

The main goal of the project is to create the example of how to set Apollo in React or Vue Project on client side. Then, show how to use GraphQL to ask for what you want. :sunny:

> Node version is in the .nvmrc file in each example folder.

## Apollo-client for React project

> The GraphQL API used in the project come from Apollo official tutorial document.

[Apollo-client - Document](hhttps://www.apollographql.com/docs/react/)

- Apollo provide apollo client for React. It have lots of methods let you can get what you what easily. Recommend to read the above document.

- You can follow the tutorial and compare to the "Queries Mutations Refetching" section in components folder.

- Because the "Subscription" did not provide API, this part is undone.

### How to Start?

```javascript =
// cd to the example folder
cd react-apollo-client
// launch client
yarn start
```

---

## Vue-apollo for Vue Project

> In the project we create the example server to provide GraphQL API in local. Remember to launch the server before you want to start the example.

- Recommend to use vue-apollo when you are on the Vue project, because official apollo-client does not support Vue project.

- Use [Vue CLI Apollo plugin](https://vue-cli-plugin-apollo.netlify.app/) to create the whole example of combine vue-apollo on client and the node.js server code example.

- If you are on the Nuxt project, you can consider to use [Nuxt-apollo](https://github.com/nuxt-community/apollo-module). There is a point need to be notice is the library did not update for little bit long time.

### How to Start?

```javascript =
// cd to the example folder
cd vue-apollo
// launch server
yarn apollo
// launch client
yarn start
```

### Resource

#### Vue CLI Apollo plugin

> The server side code is break on vue-apollo/apollo-server/utils/upload.js file.

:warning: Fix Upload function bug from example file

```javascript =
return new Promise((resolve, reject) => {
  // Fix the deprecated in this function
  const stream = createWriteStream(path)

  // The 'finish' event is emitted after the stream.end() method
  // Node official article: https://nodejs.org/api/stream.html#writable-streams
  stream.end("END")
  stream.on("finish", () => resolve({ id, path: urlPath }))
  stream.on("error", (error) => reject(error))
})
```

[vue-cli-plugin-apollo - Document](https://vue-cli-plugin-apollo.netlify.app/)

#### Nuxt Apollo Module

> Latest release is on 2019.11.27

[apollo-module - Github](https://github.com/nuxt-community/apollo-module)
