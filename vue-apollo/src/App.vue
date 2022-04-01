<template>
  <div id="app">
    <BasicSectionPractice />
    <QuerySectionPractice />
    <MutationsSectionPractice />
    <SubscriptionSection />

    <hr />
    <ApolloQuerySection />
  </div>
</template>

<script>
// components
import BasicSectionPractice from "./components/BasicSectionPractice.vue"
import QuerySectionPractice from "./components/QuerySectionPractice.vue"
import MutationsSectionPractice from "./components/MutationsSectionPractice.vue"
import SubscriptionSection from "./components/SubscriptionSection.vue"
import ApolloQuerySection from "./components/ApolloComponents/ApolloQuerySection.vue"

export default {
  name: "app",
  components: {
    BasicSectionPractice,
    QuerySectionPractice,
    MutationsSectionPractice,
    SubscriptionSection,
    ApolloQuerySection,
  },
}
</script>

<style>
.green-text {
  color: #2ecc8f;
}

h1 {
  font-size: 28px;
}

h2 {
  font-size: 20px;
}
</style>
