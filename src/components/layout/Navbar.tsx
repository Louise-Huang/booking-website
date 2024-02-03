import { Navbar } from 'react-bootstrap'
import { logo } from '../../images'
export default function Nav () {
  return (
    <Navbar className='booking-navbar'>
      <Navbar.Brand href="#home">
        <img
          src={logo}
        />
      </Navbar.Brand>
    </Navbar>
  )
}