import { useSelector } from 'react-redux'

export function useAuthenticated() {
  return useSelector(state => Boolean(state.user.profile._id))
}
