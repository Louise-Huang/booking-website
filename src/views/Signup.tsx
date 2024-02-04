import { Row, Col } from 'react-bootstrap'
import { useImmer } from 'use-immer'
import { SignupStep1, SignupStep2 } from '../components'
import { registerImg, line, line3 } from '../images'

interface Step1Form {
  email: string,
  password: string
}

export default function Signup () {
  const [state, produce] = useImmer({
    signupStep: 'step2',
    signupForm: {}
  })

  const { signupStep, signupForm } = state

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
            <h1 className='header'>立即註冊</h1>
            {
              signupStep === 'step1' ? (
                <SignupStep1 propsproduce={produce} />
                ) : (
                <SignupStep2 signupForm={signupForm as Step1Form} />
              )
            }
          </div>
        </Col>
      </Row>
    </>
  )
}