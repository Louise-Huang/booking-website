import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <>
      <Router>
        <Switch>
        {
          routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={(props: any) => (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              )}
            />
          ))
        }
        </Switch>
      </Router>
    </>
  )
}

export default App
