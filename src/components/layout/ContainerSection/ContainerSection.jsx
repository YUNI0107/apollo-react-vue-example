import { useState } from "react"

// components
import RateSection from "../RateSection"
import DogSection from "../DogSection"
import TodoSection from "../TodoSection"

function ContainerSection() {
  const [page, setPage] = useState("rate")

  const RenderPage = () => {
    switch (page) {
      case "rate":
        return <RateSection />
      case "dog":
        return <DogSection />
      case "counter":
        return <TodoSection />
      default:
        return <RateSection />
    }
  }

  return (
    <>
      <h1>Get started with Apollo Client🚀🚀🚀</h1>

      <button onClick={() => setPage("rate")}>Rate Data(Get Started)</button>
      <button onClick={() => setPage("dog")}>Dogs(Query)</button>
      <button onClick={() => setPage("counter")}>Todo(Mutations)</button>

      <RenderPage />
    </>
  )
}

export default ContainerSection
