import React from 'react'
import * as S from './login.style'
import { Button } from 'assets/styles/utils'
import { Link, useHistory } from 'react-router-dom'
import InputText from 'components/InputText/InputText'
import InputPassword from 'components/InputPassword/InputPassword'
import { path } from 'constants/path'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../user.slice'
import { rules } from 'constants/rules'

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      await dispatch(login(body))
      history.push(path.home)
    } catch (error) {
      const { status, data } = error.payload
      if (status === 422) {
        for (const key in data) {
          setError(key, {
            type: 'server',
            message: data[key]
          })
        }
      }
    }
  }

  return (
    <S.StyledLogin>
      <S.Container className="container">
        <S.Banner></S.Banner>
        <S.FormWrapper>
          <S.FormTitle>Đăng Nhập</S.FormTitle>
          <S.Form onSubmit={handleSubmit(handleLogin)} noValidate>
            <S.FormControl>
              <Controller
                name="email"
                control={control}
                rules={rules.email}
                render={({ field }) => (
                  <InputText
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={value => {
                      field.onChange(value)
                    }}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="email" />
            </S.FormControl>
            <S.FormControl>
              <Controller
                name="password"
                control={control}
                rules={rules.password}
                render={({ field }) => (
                  <InputPassword
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={value => {
                      field.onChange(value)
                    }}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="password" />
            </S.FormControl>
            <S.FormButton>
              <Button type="submit">Đăng Nhập</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn mới biết đến Shopee?</span>
            <Link to={path.register} className="link">
              Đăng ký
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyledLogin>
  )
}
