import Routes from './Routes'
import { useHistory } from 'react-router-dom'
import 'normalize.css'
import './assets/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthenticated } from 'hooks/useAuthenticated'
import { useDispatch, useSelector } from 'react-redux'
import { getCartPurchases } from 'pages/Cart/cart.slice'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { LinearProgress } from '@material-ui/core'
import styled from 'styled-components'
import React from 'react'
import { path } from 'constants/path'
import { unauthorize } from 'pages/Auth/user.slice'

const StyledLoading = styled(LinearProgress)`
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
`

function Loading() {
  const authenticated = useAuthenticated()
  const dispatch = useDispatch()
  const app = useSelector(state => state.app)
  const history = useHistory()

  useEffect(() => {
    if (authenticated) {
      dispatch(getCartPurchases())
    }
  }, [dispatch, authenticated])

  useEffect(() => {
    if (app.status === 401) {
      dispatch(unauthorize())
      history.push(path.login)
    }
  }, [history, dispatch, app])

  if (app.loading > 0) {
    return <StyledLoading color="secondary" />
  }
  return null
}

function App() {
  return (
    <div className="App">
      <Loading />
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
