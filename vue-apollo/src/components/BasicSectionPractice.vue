<template>
  <div>
    <h1 class="title">Basic Section</h1>
    <div>
      <h1>Query</h1>
      <h2>Local {{ name }}</h2>
      <h2>Variables {{ hello }}</h2>
    </div>

    <div>
      <h1>Mutation</h1>
      <input v-model="mutationInputValue" type="text" />
      <button @click="addMessage">addMessage</button>
    </div>
  </div>
</template>

<script>
/**
 * Document
 * https://apollo.vuejs.org/guide/apollo/#apollo-options
 */

import HelloWorldGQL from "../graphql/HelloWorld.gql"
import AddMessageGQL from "../graphql/AddMessage.gql"

export default {
  data() {
    return {
      name: "Local Name",
      mutationInputValue: "",
    }
  },
  apollo: {
    // Vue-Apollo options here
    hello: {
      query: HelloWorldGQL,
      variables: {
        name: "From Query",
      },
    },
  },
  methods: {
    async addMessage() {
      const result = await this.$apollo.mutate({
        mutation: AddMessageGQL,
        variables: {
          input: {
            text: this.mutationInputValue,
          },
        },
      })

      this.mutationInputValue = ""
      console.log("addMessage", result)
    },
  },
}
</script>
