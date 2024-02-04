import { Routes, Route } from 'react-router-dom'
import { Default } from './components'
import Login from './views/Login'
import Signup from './views/Signup'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route path='' element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
