import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <>
      <Router path='/'>
        <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props: any) => {
                document.title = route.title
                return (
                  <route.layout {...props}>
                    <route.component {...props} />
                  </route.layout>
                )
              }}
            />
          ))
        }
        </Switch>
      </Router>
    </>
  )
}

export default App
