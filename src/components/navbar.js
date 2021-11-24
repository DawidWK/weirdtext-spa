import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const MyNavbar = () => {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">WeirdText App</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
