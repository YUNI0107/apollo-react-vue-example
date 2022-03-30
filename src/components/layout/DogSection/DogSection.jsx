import { useState } from "react"
import { gql, useQuery } from "@apollo/client"

// components
import LoadingSection from "../LoadingSection"
import ErrorPage from "../ErrorPage"
import DogPhoto from "./components/DogPhoto"

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`

function DogSection() {
  // states
  const [dog, setDog] = useState("default")

  const { loading, error, data } = useQuery(GET_DOGS, {
    context: { clientName: "dogEndpoint" },
  })
  const {
    loading: imageLoading,
    error: imageError,
    data: dogImageData,
    refetch: imageRefetch,
  } = useQuery(GET_DOG_PHOTO, {
    variables: { breed: dog },
    context: { clientName: "dogEndpoint" },
  })

  // operations
  const onDogSelected = (e) => {
    setDog(e.target.value)
  }

  const refetchDog = () => {
    setDog("dalmatian")
    imageRefetch({ breed: "dalmatian" })
  }

  if (loading || imageLoading) return <LoadingSection />
  if (error || imageError) return <ErrorPage />

  return (
    <div>
      <h1>{dog === "default" ? "Choose A Dog!!" : `Dog Breed: ${dog}`}</h1>
      {dog !== "default" && <DogPhoto image={dogImageData.dog.displayImage} />}
      <select name="dog" onChange={onDogSelected} value={dog}>
        <option disabled value={"default"}>
          Default
        </option>
        {data.dogs.map((dog) => (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ))}
      </select>

      <hr />

      <button>Get Dog Photo!!</button>
      <button onClick={refetchDog}>Refetch</button>
    </div>
  )
}

export default DogSection
