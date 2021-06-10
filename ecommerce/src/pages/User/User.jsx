import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { path } from '../../constants/path'
import Password from './Password/Password'
import Profile from './Profile/Profile'
import Purchase from './Purchase/Purchase'
import * as S from './user.style'

export default function User() {
  return (
    <div>
      <S.Container className="container">
        <S.Sidebar>
          <S.Brief>
            <S.BriefAvatar to={path.profile}>
              <img
                src="https://cf.shopee.vn/file/121fdee6ef0b3535084382fd0914185b_tn"
                alt=""
              />
            </S.BriefAvatar>
            <S.BriefRight>
              <S.BriefUsername>duoc081196</S.BriefUsername>
              <S.BriefEdit to={path.profile}>
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 4 }}
                >
                  <path
                    d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                  />
                </svg>
                Sửa hồ sơ
              </S.BriefEdit>
            </S.BriefRight>
          </S.Brief>
          <S.SidebarMenu>
            <S.SidebarMenuEntry to={path.profile}>
              <S.SidebarMenuEntryIcon
                style={{
                  backgroundColor: 'rgb(255, 193, 7)'
                }}
              >
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                >
                  <g>
                    <circle
                      cx="7.5"
                      cy="4.5"
                      fill="none"
                      r="3.8"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                    />
                  </g>
                </svg>
              </S.SidebarMenuEntryIcon>
              Tài khoản của tôi
            </S.SidebarMenuEntry>
            <S.SidebarMenuEntry to={path.password}>
              <S.SidebarMenuEntryIcon
                style={{
                  backgroundColor: 'rgb(255, 193, 7)'
                }}
              >
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                >
                  <g>
                    <circle
                      cx="7.5"
                      cy="4.5"
                      fill="none"
                      r="3.8"
                      strokeMiterlimit={10}
                    />
                    <path
                      d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                      fill="none"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                    />
                  </g>
                </svg>
              </S.SidebarMenuEntryIcon>
              Thêm mật khẩu
            </S.SidebarMenuEntry>
            <S.SidebarMenuEntry to={path.purchase}>
              <S.SidebarMenuEntryIcon
                style={{
                  backgroundColor: 'rgb(68, 181, 255)'
                }}
              >
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="shopee-svg-icon user-page-sidebar-icon "
                  style={{ fill: 'rgb(255, 255, 255)' }}
                >
                  <g>
                    <rect
                      fill="none"
                      height={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      width={8}
                      x="4.5"
                      y="1.5"
                    />
                    <polyline
                      fill="none"
                      points="2.5 1.5 2.5 13.5 12.5 13.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                    />
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      x1="6.5"
                      x2="10.5"
                      y1={4}
                      y2={4}
                    />
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      x1="6.5"
                      x2="10.5"
                      y1="6.5"
                      y2="6.5"
                    />
                    <line
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      x1="6.5"
                      x2="10.5"
                      y1={9}
                      y2={9}
                    />
                  </g>
                </svg>
              </S.SidebarMenuEntryIcon>
              Đơn mua
            </S.SidebarMenuEntry>
          </S.SidebarMenu>
        </S.Sidebar>
        <S.Main>
          <Switch>
            <Route exact path={path.user}>
              <Redirect to={path.profile} />
            </Route>
            <Route path={path.profile} exact>
              <Profile></Profile>
            </Route>
            <Route path={path.password}>
              <Password></Password>
            </Route>
            <Route path={path.purchase}>
              <Purchase></Purchase>
            </Route>
          </Switch>
        </S.Main>
      </S.Container>
    </div>
  )
}
