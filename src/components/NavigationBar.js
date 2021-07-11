import { Navbar, Nav, Button } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <>
            <Navbar className="mb-5 py-3" bg="light">
                <Navbar.Brand className="ml-4" href="#home">SPEAKINGOFF</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="#home">ABOUT</Nav.Link>
                    <Nav.Link href="#problem">PROBLEM</Nav.Link>
                    <Nav.Link href="#solution">SOLUTION</Nav.Link>
                    <Nav.Link href="#contact">CONTACT</Nav.Link>
                </Nav>
                <Button className="ml-4 mr-2" variant="success">LOG IN</Button>
                <Button className="mr-4" variant="outline-success">SIGN UP</Button>
            </Navbar>
        </>
    );
};


export default NavigationBar;
