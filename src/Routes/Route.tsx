import React from 'react'
import {
  Route,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

// isPrivate / auth
// true / true   => OK
// false / false => OK
// true / false => Redirect to login
// false / true => Redirect to dashboard

const Router: React.FC<RouteProps> = ({
  path,
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth()
  return (
    <Route
      {...rest}
      path={path}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }}
          />
        )
      }}
    />
  )
}

export default Router
