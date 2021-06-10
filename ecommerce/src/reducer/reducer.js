import appReducer from 'app.reducer'
import userReducer from 'pages/Auth/user.slice'
import cartReducer from 'pages/Cart/cart.slice'

const rootReducer = {
  app: appReducer,
  user: userReducer,
  cart: cartReducer
}

export default rootReducer
