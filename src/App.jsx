import React from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}