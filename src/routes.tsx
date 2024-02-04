import { Default } from './components'
import Login from './views/Login'
import Signup from './views/Signup'

const routes = [
  {
    path: '/',
    exact: true,
    layout: Default,
    component: Login,
    title: '會員登入｜享樂酒店'
  },
  {
    path: '/signup',
    exact: true,
    layout: Default,
    component: Signup,
    title: '會員註冊｜享樂酒店'
  }
]

export default routes
