<template>
  <div>
    <h1 class="green-text">Mutations Section</h1>

    <div>
      <h1></h1>
      <p>Use 'uploadFile' mutation to practice</p>
      <input @change="uploadFile" type="file" />

      <p>Use 'addMessage' mutation to practice</p>
      <input v-model="mutationInputValue" type="text" />
      <button @click="addMessage">addMessage</button>
    </div>
  </div>
</template>

<script>
import UploadFileGQL from "../graphql/UploadFile.gql"
import AddMessageGQL from "../graphql/AddMessage.gql"

export default {
  data() {
    return {
      mutationInputValue: "",
    }
  },
  apollo: {},
  methods: {
    uploadFile(e) {
      if (!e.target.validity.valid) return
      const file = e.target.files[0]

      this.$apollo
        .mutate({
          mutation: UploadFileGQL,
          variables: {
            file,
          },
        })
        .then((data) => {
          // TODO: Stuck!!
          // Result
          console.log("Completed", data)
        })
    },
    addMessage() {
      this.$apollo
        .mutate({
          mutation: AddMessageGQL,
          variables: {
            input: {
              text: this.mutationInputValue,
            },
          },
        })
        .then((data) => {
          console.log("Completed", data)
        })

      this.mutationInputValue = ""
    },
  },
}
</script>
