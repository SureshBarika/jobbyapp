import {Route, Redirect, Switch} from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Jobs from './component/Jobs'
import JobsItemDetails from './component/JobItemDetails'
import NotFound from './component/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/jobs" component={Jobs} />
    <Route exact path="/jobs/:id" component={JobsItemDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
