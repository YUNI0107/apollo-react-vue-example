<template>
  <div>
    <h1 class="title">Subscription Section</h1>

    <div>
      <div v-for="message in messages" :key="message.id">
        <p>
          {{ message.text }} <span class="green-text">{{ message.id }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MessageAddedGQL from "../graphql/MessageAdded.gql"
import MessagesGQL from "../graphql/Messages.gql"

/**
 * Subscription Document: https://www.apollographql.com/docs/react/data/subscriptions/
 */
export default {
  apollo: {
    messages: {
      query: MessagesGQL,
      subscribeToMore: {
        document: MessageAddedGQL,
        updateQuery: (previousResult, { subscriptionData }) => {
          if (!subscriptionData.data) return previousResult
          const newItem = subscriptionData.data.messageAdded

          return Object.assign(
            {},
            {
              messages: [newItem, ...previousResult.messages],
            }
          )
        },
      },
    },
  },
}
</script>
