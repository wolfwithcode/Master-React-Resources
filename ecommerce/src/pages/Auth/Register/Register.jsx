import React from 'react'
import * as S from '../Login/login.style'
import { Button } from 'assets/styles/utils'
import { Link, useHistory } from 'react-router-dom'
import InputText from 'components/InputText/InputText'
import InputPassword from 'components/InputPassword/InputPassword'
import { path } from 'constants/path'
import { useForm, Controller } from 'react-hook-form'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import { register } from '../user.slice'
import { useDispatch } from 'react-redux'
import { rules } from 'constants/rules'

export default function Register() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: ''
    }
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      await dispatch(register(body))
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
          <S.FormTitle>Đăng ký</S.FormTitle>
          <S.Form onSubmit={handleSubmit(handleRegister)} noValidate>
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
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={value => {
                      field.onChange(value)
                    }}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="password" />
            </S.FormControl>
            <S.FormControl>
              <Controller
                name="confirmedPassword"
                control={control}
                rules={{
                  ...rules.confirmedPassword,
                  validate: {
                    samePassword: v =>
                      v === getValues('password') || 'Mật khẩu không khớp'
                  }
                }}
                render={({ field }) => (
                  <InputPassword
                    placeholder="Nhập lại mật khẩu"
                    name="confirmedPassword"
                    onChange={value => {
                      field.onChange(value)
                    }}
                  />
                )}
              />
              <ErrorMessage errors={errors} name="confirmedPassword" />
            </S.FormControl>
            <S.FormButton>
              <Button type="submit">Đăng ký</Button>
            </S.FormButton>
          </S.Form>
          <S.FormFooter>
            <span>Bạn đã có tài khoản?</span>
            <Link to={path.login} className="link">
              Đăng nhập
            </Link>
          </S.FormFooter>
        </S.FormWrapper>
      </S.Container>
    </S.StyledLogin>
  )
}
