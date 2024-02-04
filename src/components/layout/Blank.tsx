import { ReactNode } from 'react'
import { Container } from 'react-bootstrap'

const Blank = ({ children }: { children: ReactNode }) => <Container fluid>{children}</Container>

export default Blank
