import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import "./Console.scss";

export const Console = () => {
  const [mobile, setMobile] = useState(false);
  const [onOff, setOnOff] = useState(false);

  // Control de orientación de la pantalla .
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

  //la función del boton on/off
  const start = () => {
    setTimeout(() => {
      setOnOff(!onOff);
    }, 300);
  };

  return (
    <div className="console-main-design">
      {mobile ? (
        <>
          <div className="rotate-message">
            <h1>Por favor, gira tu dispositivo</h1>
            <FontAwesomeIcon className="rotate-arrows" icon={faArrowsRotate} />
          </div>
        </>
      ) : (
        <Col>
          <Row>
            <Col className="d-flex justify-content-center" xs={12} md={12}>
              <Row className=" console-design">
                <Col xs={12} md={12} className="top-bar">
                  <Row>
                    <Col xs={3} md={3}></Col>
                    <Col
                      xs={1}
                      md={1}
                      onClick={() => start()}
                      className="d-flex justify-content-center button-start"
                    >
                      <p>on/off</p>
                    </Col>
                  </Row>
                </Col>
                <Col className="left-controller" xs={2} md={2}>
                  <Row>
                    <Col xs={8} md={8}></Col>
                    <Col xs={2} md={2}>
                      <Row>
                        <Col className="botton-low"></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col className="left-joystick">
                      <Row>
                        <Col className="center-left-joystick"></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="buttons-arrows">
                    <Col>
                      <Row>
                        <Col className="d-flex justify-content-center"><p>1</p></Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-center"><p>2</p></Col>
                        <Col className="d-flex justify-content-center"><p>3</p></Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-center"><p>4</p></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8} md={8}></Col>
                    <Col xs={2} md={2}>
                      <Row>
                        <Col className="botton-cube">
                          <Row className="d-flex justify-content-center">
                            <Col className="circle-cube"></Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col className=" menu-design" xs={8} md={8}>
                  <Row>
                    {onOff ? (
                      <Col className="d-flex justify-content-center align-items-center display">
                        <h1 className="logo-nintendo">Nintendoº</h1>
                      </Col>
                    ) : (
                      <Col className="display"></Col>
                    )}
                  </Row>
                </Col>
                <Col className="right-controller" xs={2} md={2}></Col>
              </Row>
            </Col>
          </Row>
        </Col>
      )}
    </div>
  );
};
