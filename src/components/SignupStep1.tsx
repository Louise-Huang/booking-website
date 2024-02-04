import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Progressbar } from '.'

interface FormInput {
  email: string,
  password: string,
  checkPassword: string
}

export default function SignupStep1 (props: { propsproduce: Function }) {
  const { propsproduce } = props
  const { register, handleSubmit, getValues, watch, formState: { errors } } = useForm<FormInput>()

  const onSubmit = () => {
    console.log(getValues())
    const { email, password } = getValues()
    propsproduce((draft: any) => {
      draft.signupForm = {
        email,
        password
      }
      draft.signupStep = 'step2'
    })
  }

  const watchPassword = watch('password')

  const validateEmail = (value: string) => {
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return value.search(emailRule) !== -1 ? true : '信箱格式不正確'
  }

  const validatePassword = (value: string) => {
    return value.length >= 8 ? true : '密碼至少需要8位數'
  }

  const validateCheckPassword = (value: string) => {
    return watchPassword === value ? true : '密碼不正確，請再輸入一次'
  }

  return (
    <>
      <Progressbar nowStep='step1'/>
      <Form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>電子信箱</Form.Label>
          <Form.Control
            type="email" className='input-control' placeholder="hello@example.com"
            {...register("email", { 
              required: '請輸入電子信箱',
              validate: (value) => validateEmail(value)
            })}
            isInvalid={!!errors.email}
          />
          {
            errors.email ? (
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            ) : ''
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>密碼</Form.Label>
          <Form.Control
            type="password" className='input-control' placeholder="請輸入密碼"
            {...register("password", { 
              required: '請輸入密碼',
              validate: (value) => validatePassword(value)
            })}
            isInvalid={!!errors.password}
          />
          {
            errors.password ? (
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            ) : ''
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>確認密碼</Form.Label>
          <Form.Control
            type="password" className='input-control' placeholder="請再輸入一次密碼"
            {...register("checkPassword", { 
              required: '請再輸入一次密碼',
              validate: (value) => validateCheckPassword(value)
            })}
            isInvalid={!!errors.checkPassword}
          />
          {
            errors.checkPassword ? (
              <Form.Text className="text-danger">
                {errors.checkPassword?.message}
              </Form.Text>
            ) : ''
          }
        </Form.Group>
        <Button type="submit" className='submit-btn w-100'>下一步</Button>
        <span>已經有會員了嗎？</span>
        <a href='/'>立即登入</a>
        <div>
        </div>
      </Form>
    </>
  )
}