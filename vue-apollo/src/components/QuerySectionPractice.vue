<template>
  <div>
    <h1 class="title">Query Section</h1>

    <div>
      <h1>Name matching</h1>
      <div v-if="$apollo.loading.world">Loading matching...</div>
      <p>query 'name' rename to 'world'</p>
      <p>rename: {{ world }}</p>
    </div>

    <div>
      <h1>Reactive parameters</h1>
      <div v-if="$apollo.loading.hello">Loading Reactive...</div>
      <h2>
        Reactive when you typing ( World is default ) <br />
        {{ hello }}
      </h2>
      <input type="text" v-model="reactiveInputValue" />
    </div>
  </div>
</template>

<script>
/**
 * Document
 * https://apollo.vuejs.org/guide/apollo/queries.html#name-matching
 */

import gql from "graphql-tag"

import HelloWorldGQL from "../graphql/HelloWorld.gql"

export default {
  data() {
    return {
      // Initialize your apollo data
      world: "Initialize",
      reactiveInputValue: "",
    }
  },
  apollo: {
    hello: {
      query: HelloWorldGQL,
      variables() {
        return {
          name: this.reactiveInputValue,
        }
      },
    },
    world: {
      query: gql`
        query HelloWorld($name: String) {
          world: hello(name: $name)
        }
      `,
      variables: {
        name: "world",
      },
    },
  },
}
</script>
