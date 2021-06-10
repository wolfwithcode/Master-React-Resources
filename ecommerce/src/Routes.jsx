import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CartLayout from './layouts/CartLayout/CartLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Register from './pages/Auth/Register/Register'
import Cart from './pages/Cart/Cart'
import User from './pages/User/User'
import { path } from './constants/path'
import AuthenticatedGuard from 'guards/AuthenticatedGuard'
import UnauthenticatedGuard from 'guards/UnauthenticatedGuard'

const Routes = () => {
  return (
    <Switch>
      <Route path={path.home} exact>
        <MainLayout>
          <Home></Home>
        </MainLayout>
      </Route>
      <Route path={path.productDetail}>
        <MainLayout>
          <ProductDetail></ProductDetail>
        </MainLayout>
      </Route>
      <Route path={path.login}>
        <UnauthenticatedGuard>
          <RegisterLayout title="Đăng nhập">
            <Login></Login>
          </RegisterLayout>
        </UnauthenticatedGuard>
      </Route>
      <Route path={path.register}>
        <UnauthenticatedGuard>
          <RegisterLayout title="Đăng ký">
            <Register></Register>
          </RegisterLayout>
        </UnauthenticatedGuard>
      </Route>
      <Route path={path.cart}>
        <AuthenticatedGuard>
          <CartLayout>
            <Cart />
          </CartLayout>
        </AuthenticatedGuard>
      </Route>
      <Route path={path.user}>
        <AuthenticatedGuard>
          <MainLayout>
            <User />
          </MainLayout>
        </AuthenticatedGuard>
      </Route>
      <Route path={path.notFound}>
        <MainLayout>
          <NotFound></NotFound>
        </MainLayout>
      </Route>
    </Switch>
  )
}
export default Routes
