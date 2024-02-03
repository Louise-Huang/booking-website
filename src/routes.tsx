import { Default } from './components'
import Login from './views/Login'
import Signup from './views/Signup'

const routes = [
  {
    path: '/',
    exact: true,
    layout: Default,
    component: Login
  },
  {
    path: '/signup',
    exact: true,
    layout: Default,
    component: Signup
  }
]

export default routes
