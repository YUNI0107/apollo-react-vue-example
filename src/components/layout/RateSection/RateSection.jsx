import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

// components
import LoadingSection from "../LoadingSection"
import ErrorPage from "../ErrorPage"

// graphql
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

function RateSection() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    context: { clientName: "rateEndpoint" },
  })

  if (loading) return <LoadingSection />
  if (error) return <ErrorPage />

  return (
    <div>
      {data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ))}
    </div>
  )
}

export default RateSection
