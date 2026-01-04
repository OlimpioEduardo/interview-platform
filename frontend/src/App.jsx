import {Navigate, Route, Routes} from "react-router"
import { useUser } from "@clerk/clerk-react"
import {Toaster} from "react-hot-toast"


import HomePage from "./pages/HomePage"
import ProblemsPage from "./pages/ProblemsPage"
function App() {

  const { isSignedIn } = useUser()
  return (
    <>
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/problems" element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"}/>}/>
   </Routes>

   <Toaster/>
   </>
  )
}

export default App
// todo: react-query aka tanstack query, axios
