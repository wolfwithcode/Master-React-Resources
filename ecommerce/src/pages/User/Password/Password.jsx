import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import { rules } from 'constants/rules'
import { updateMe } from 'pages/Auth/user.slice'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import InputPassword from '../../../components/InputPassword/InputPassword'
import * as P from '../Profile/profile.style'
import * as S from './password.style'

export default function Password() {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirmed_new_password: ''
    }
  })
  const dispatch = useDispatch()
  const update = async data => {
    const body = {
      password: data.password,
      new_password: data.new_password
    }
    try {
      await dispatch(updateMe(body))
      reset()
      toast.success('Đổi mật khẩu thành công', {
        position: 'top-center',
        autoClose: 3000
      })
    } catch ({ payload }) {
      if ((payload.status = 422)) {
        for (const key in payload.data) {
          setError(key, {
            type: 'server',
            message: payload.data[key]
          })
        }
      } else {
        toast.error(payload.data.message, {
          position: 'top-center',
          autoClose: 3000
        })
      }
    }
  }

  return (
    <P.Profile>
      <P.ProfileHeader>
        <P.ProfieHeaderTitle>Đổi mật khẩu</P.ProfieHeaderTitle>
        <P.ProfileHeaderSubtitle>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </P.ProfileHeaderSubtitle>
      </P.ProfileHeader>
      <S.PasswordContent onSubmit={handleSubmit(update)}>
        <P.InputLabel>
          <P.InputLabelLabel>Mật khẩu cũ</P.InputLabelLabel>
          <P.InputLabelContent>
            <Controller
              name="password"
              control={control}
              rules={rules.password}
              render={({ field }) => (
                <InputPassword
                  name="password"
                  onChange={value => {
                    field.onChange(value)
                  }}
                  value={getValues('password')}
                />
              )}
            />
            <ErrorMessage errors={errors} name="password" />
          </P.InputLabelContent>
        </P.InputLabel>
        <P.InputLabel>
          <P.InputLabelLabel>Mật khẩu mới</P.InputLabelLabel>
          <P.InputLabelContent>
            <Controller
              name="new_password"
              control={control}
              rules={rules.password}
              render={({ field }) => (
                <InputPassword
                  name="new_password"
                  onChange={value => {
                    field.onChange(value)
                  }}
                  value={getValues('new_password')}
                />
              )}
            />
            <ErrorMessage errors={errors} name="new_password" />
          </P.InputLabelContent>
        </P.InputLabel>
        <P.InputLabel>
          <P.InputLabelLabel>Xác nhận mật khẩu</P.InputLabelLabel>
          <P.InputLabelContent>
            <Controller
              name="confirmed_new_password"
              control={control}
              rules={{
                ...rules.password,
                validate: {
                  samePassword: v =>
                    v === getValues('new_password') ||
                    'Mật khẩu nhập lại không khớp'
                }
              }}
              render={({ field }) => (
                <InputPassword
                  name="confirmed_new_password"
                  onChange={value => {
                    field.onChange(value)
                  }}
                  value={getValues('confirmed_new_password')}
                />
              )}
            />
            <ErrorMessage errors={errors} name="confirmed_new_password" />
          </P.InputLabelContent>
        </P.InputLabel>
        <P.Submit>
          <P.ButtonSubmit type="submit">Lưu</P.ButtonSubmit>
        </P.Submit>
      </S.PasswordContent>
    </P.Profile>
  )
}
