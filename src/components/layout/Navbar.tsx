import { Navbar } from 'react-bootstrap'
import { logo } from '../../images'
export default function Nav () {
  return (
    <Navbar className='booking-navbar'>
      <Navbar.Brand>
        <img
          src={logo}
        />
      </Navbar.Brand>
    </Navbar>
  )
}