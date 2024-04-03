import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Console.scss";
import { useEffect, useState } from "react";

export const Console = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      setMobile(window.matchMedia("(orientation: portrait)").matches);
    };

    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <Container fluid className="console-main-design">
      {mobile ? (
        <>
          <div className="rotate-message">
            <h1>Por favor, gira tu dispositivo</h1>
            <p>
              Para una mejor experiencia, gira tu teléfono en posición
              horizontal.
            </p>
          </div>
        </>
      ) : (
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
      )}
    </Container>
  );
};
