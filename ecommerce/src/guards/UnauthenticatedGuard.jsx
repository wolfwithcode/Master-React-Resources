import { path } from 'constants/path'
import { useAuthenticated } from 'hooks/useAuthenticated'
import React, { Fragment } from 'react'
import { Redirect } from 'react-router'

export default function UnauthenticatedGuard({ children }) {
  const authenticated = useAuthenticated()
  if (authenticated) {
    return <Redirect to={path.home} />
  }
  return <Fragment>{children}</Fragment>
}
