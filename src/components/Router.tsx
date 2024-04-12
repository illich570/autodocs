import { About } from '@/pages/About'
import { Home } from '@/pages/Home'
import { Route, Switch } from 'wouter'

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/:rest*">
        {(params) => `404, Sorry the page ${params['rest*']} does not exist!`}
      </Route>
    </Switch>
  )
}

export { Router }
