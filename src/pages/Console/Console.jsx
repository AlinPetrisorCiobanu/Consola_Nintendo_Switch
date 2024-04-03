import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Console.scss";

export const Console = () => {
  return (
    <Container
      fluid
      className="console-main-design"
    >
      <Col>
        <Row>
          <Col className="d-flex justify-content-center" xs={12} md={12}>
            <Row className=" console-design">
              <Col className="left-controller" xs={2} md={2}></Col>
              <Col className=" menu-design" xs={8} md={8}>
                <Row>
                  <Col className="display">
                    <h1>Menu</h1>
                  </Col>
                </Row>
              </Col>
              <Col className="right-controller" xs={2} md={2}></Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
