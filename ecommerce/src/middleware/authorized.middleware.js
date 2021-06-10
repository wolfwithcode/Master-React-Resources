const authorizedMiddleware = store => next => action => {
  // console.log(action)
  next(action)
}
export default authorizedMiddleware
