import { useState } from "react"

// components
import RateSection from "../RateSection"
import DogSection from "../DogSection"
import TodoSection from "../TodoSection"
import WsSection from "../WsSection"

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
      case "ws":
        return <WsSection />
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
      <button onClick={() => setPage("ws")}>Web(Subscription)</button>

      <RenderPage />
    </>
  )
}

export default ContainerSection
