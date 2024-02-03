import { Container, Row, Col } from 'react-bootstrap'
import Navbar from './Navbar'

const Default = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container fluid>
        <Row className='content'>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Default
