import { Row, Col, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { registerImg, line, line3 } from '../images'
import axios from 'axios'

interface FormInput {
  email: string,
  password: string
}

export default function Login () {
  const { register, handleSubmit, getValues, formState: { isValid } } = useForm<FormInput>()
  const onSubmit = () => {
    console.log(getValues())
    const { email, password } = getValues()
    axios
      .post('https://freyja-29cg.onrender.com/api/v1/user/login', {
        email,
        password
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '登入成功',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message
        })
      })
  }
  return (
    <>
      <Row className='login-row'>
        <Col className='register-img'>
          <img src={registerImg} style={{ width: '100%' }}/>
        </Col>
        <Col style={{ position: 'relative' }}>
          <img src={line3} className='desktop-line' style={{ width: '100%', position: 'absolute', top: '72px' }}/>
          <img src={line} className='mobile-line' style={{ width: '100%', position: 'absolute', top: '32px' }}/>
          <div className="account-content">
            <p className='subheader'>享樂酒店，誠摯歡迎</p>
            <h1 className='header'>立即開始旅程</h1>
            <Form className='login-form' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>電子信箱</Form.Label>
                <Form.Control
                  type="email" className='input-control' placeholder="hello@example.com"
                  {...register("email", { required: true })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>密碼</Form.Label>
                <Form.Control
                  type="password" className='input-control' placeholder="請輸入密碼"
                  {...register("password", { required: true })}
                />
              </Form.Group>
              <div className='d-flex justify-content-between align-items-center'>
                <Form.Check
                  type='checkbox'
                  label='記住帳號'
                  id='default-checkbox'
                />
                <a>忘記密碼？</a>
              </div>
              <Button type="submit" disabled={!isValid} className='submit-btn w-100'>會員登入</Button>
              <span>沒有會員嗎？</span>
              <a href='/signup'>前往註冊</a>
              <div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  )
}