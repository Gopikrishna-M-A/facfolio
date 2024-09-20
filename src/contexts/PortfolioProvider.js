"use client"
import { createContext, useState, useContext, useEffect } from "react"

const PortfolioContext = createContext()

async function fetchPortfolioData(slug) {
  const response = await fetch(`/api/info?slug=${slug}`)
  if (!response.ok) {
    throw new Error("Failed to fetch portfolio data")
  }
  return response.json()
}

export function PortfolioProvider({ children, slug }) {
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        setLoading(true)
        const data = await fetchPortfolioData(slug)
        setPortfolioData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioData()
  }, [slug])

  return (
    <PortfolioContext.Provider value={{ data: portfolioData, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
