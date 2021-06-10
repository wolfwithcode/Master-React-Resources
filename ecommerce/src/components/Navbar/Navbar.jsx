import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { path } from '../../constants/path'
import Popover from '../Popover/Popover'
import * as S from './navbar.style'
import { logout } from 'pages/Auth/user.slice'
import { useAuthenticated } from 'hooks/useAuthenticated'
import { usePopover } from 'hooks/usePopover'

export default function Navbar() {
  const { activePopover, showPopover, hidePopover } = usePopover()
  const authenticated = useAuthenticated()
  const profile = useSelector(state => state.user.profile)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <S.Navbar>
      <S.NavMenu>
        {authenticated && (
          <Fragment>
            <li>
              <S.User onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                <S.UserImage src="https://cf.shopee.vn/file/121fdee6ef0b3535084382fd0914185b_tn" />
                <S.UserName>{profile.name || profile.email}</S.UserName>
                <Popover active={activePopover}>
                  <S.UserLink to={path.user}>Tài khoản của tôi</S.UserLink>
                  <S.UserLink to={path.purchase}>Đơn mua</S.UserLink>
                  <S.UserButton onClick={handleLogout}>Đăng xuất</S.UserButton>
                </Popover>
              </S.User>
            </li>
          </Fragment>
        )}
        {!authenticated && (
          <Fragment>
            <li>
              <S.NavLink to={path.register}>Đăng ký</S.NavLink>
            </li>
            <li>
              <S.NavLink to={path.login}>Đăng nhập</S.NavLink>
            </li>
          </Fragment>
        )}
      </S.NavMenu>
    </S.Navbar>
  )
}
