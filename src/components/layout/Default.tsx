import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from './Navbar'

const Default = () => {
  return (
    <>
      <Navbar />
      <Container fluid>
        <Row className='content'>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Default
