"use client"
import { createContext, useState, useContext } from "react"

const CurrentPageContext = createContext()

export function CurrentPageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("Theme")

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  )
}

export function useCurrentPage() {
  const context = useContext(CurrentPageContext)
  if (!context) {
    throw new Error("useCurrentPage must be used within a CurrentPageProvider")
  }
  return context
}
