import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useImmer } from 'use-immer'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Progressbar } from '.'
import AreaData from '../utils/cityCountyData.json'

interface FormInput {
  name: string,
  phone: string,
  birthday: {
    year: string,
    month: string,
    day: string
  },
  address: {
    cityName: string,
    areaName: string,
    detail: string
  },
  agree: boolean
}

interface Step1Form {
  email: string,
  password: string
}

interface SignupObj {
  name: string,
  email: string,
  password: string,
  phone: string,
  birthday: string,
  address: {
    zipcode: number,
    detail: string
  }
}

export default function SignupStep2 (props: { signupForm: Step1Form }) {
  const { signupForm } = props
  const [state] = useImmer({
    yearsArray: Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index),
    monthsArray: Array.from({ length: 12 }, (_, index) => index + 1),
    daysArray: Array.from({ length: 31 }, (_, index) => index + 1),
    cityArray: AreaData.map(area => area.CityName),
    areaArray: AreaData[0].AreaList.map(area => area.AreaName)
  })
  const { yearsArray, monthsArray, daysArray, cityArray, areaArray } = state
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormInput>()

  const validatePhone = (value: string) => {
    const reg = /^(09)[0-9]{8}$/;
    return reg.test(value) ? true : '手機號碼格式不正確'
  }

  const onSubmit = () => {
    const { name, phone, birthday, address } = getValues()
    const postObj: SignupObj = {
      name: name,
      email: signupForm.email,
      password: signupForm.password,
      phone: phone,
      birthday: Object.values(birthday).join('/'),
      address: {
        zipcode: Number(AreaData.find(city => city.CityName === address.cityName)?.AreaList.find(area => area.AreaName === address.areaName)?.ZipCode),
        detail: address.detail
      }
    }
    axios
      .post('https://freyja-29cg.onrender.com/api/v1/user/signup', postObj, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '註冊成功',
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
      <Progressbar nowStep='step2'/>
      <Form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>姓名</Form.Label>
          <Form.Control
            type="text" className='input-control' placeholder="請輸入姓名"
            {...register("name", { 
              required: '此欄位必填'
            })}
            isInvalid={!!errors.name}
          />
          {
            errors.name ? (
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            ) : ''
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>手機號碼</Form.Label>
          <Form.Control
            type="text" className='input-control' placeholder="請輸入手機號碼"
            {...register("phone", { 
              required: '此欄位必填',
              validate: (value) => validatePhone(value)
            })}
            isInvalid={!!errors.phone}
          />
          {
            errors.phone ? (
              <Form.Text className="text-danger">
                {errors.phone?.message}
              </Form.Text>
            ) : ''
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>生日</Form.Label>
          <div className='d-flex' style={{ gap: '8px' }}>
            <Form.Select
              className='form-control'
              defaultValue=''
              {...register("birthday.year")}
            >
              {
                yearsArray.map(year => <option key={year} value={year}>{year}年</option>)
              }
            </Form.Select>
            <Form.Select
              className='form-control'
              defaultValue=''
              {...register("birthday.month")}
            >
              {
                monthsArray.map(month => <option key={month} value={month}>{month}月</option>)
              }
            </Form.Select>
            <Form.Select
              className='form-control'
              defaultValue=''
              {...register("birthday.day")}
            >
              {
                daysArray.map(day => <option key={day} value={day}>{day}日</option>)
              }
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Label>地址</Form.Label>
          <div className='d-flex' style={{ gap: '8px', marginBottom: '16px' }}>
            <Form.Select
              className='form-control'
              defaultValue=''
              {...register("address.cityName")}
            >
              {
                cityArray.map(city => <option key={city} value={city}>{city}</option>)
              }
            </Form.Select>
            <Form.Select
              className='form-control'
              defaultValue=''
              {...register("address.areaName")}
            >
              {
                areaArray.map(area => <option key={area} value={area}>{area}</option>)
              }
            </Form.Select>
          </div>
          <Form.Control
            type="text" className='input-control' placeholder="請輸入詳細地址"
            {...register("address.detail", { 
              required: '此欄位必填'
            })}
            isInvalid={!!errors.address?.detail}
          />
          {
            errors.address?.detail ? (
              <Form.Text className="text-danger">
                {errors.address?.detail?.message}
              </Form.Text>
            ) : ''
          }
          <Form.Check
            type='checkbox'
            label='我已閱讀並同意本網站個資使用規範'
            id='default-checkbox'
            style={{ marginTop: '16px'}}
            {...register("agree", { 
              required: '此欄位必填'
            })}
          />
          {
            errors.agree ? (
              <Form.Text className="text-danger">
                {errors.agree?.message}
              </Form.Text>
            ) : ''
          }
        </Form.Group>
        <Button type="submit" className='submit-btn w-100'>完成註冊</Button>
        <span>已經有會員了嗎？</span>
        <a href='https://louise-huang.github.io/booking-website/'>立即登入</a>
        <div>
        </div>
      </Form>
    </>
  )
}