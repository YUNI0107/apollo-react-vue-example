<template>
  <div>
    <ApolloQuery
      :query="require('../../graphql/HelloWorld.gql')"
      :variables="{
        name: 'ApolloQuery',
      }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data.hello }}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :((</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
/**
 * Document: https://apollo.vuejs.org/guide/components/query.html#query-gql-tag
 */
export default {}
</script>
