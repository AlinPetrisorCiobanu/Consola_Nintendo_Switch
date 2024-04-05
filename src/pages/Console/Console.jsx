import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faCaretUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import "./Console.scss";

export const Console = () => {
  const [mobile, setMobile] = useState(false);
  const [onOff, setOnOff] = useState(false);
  const [switchedOn, setSwitchedOn] = useState(false);
  const [menu, setMenu] = useState(false);
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  const [menu4, setMenu4] = useState(false);
  const [menu5, setMenu5] = useState(false);
  const [menu6, setMenu6] = useState(false);
  const [menu7, setMenu7] = useState(false);
  const [menu8, setMenu8] = useState(false);
  const [menu9, setMenu9] = useState(false);
  const [menu10, setMenu10] = useState(false);

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

  // la función del botón on/off
  const start = () => {
    setTimeout(() => {
      setOnOff(!onOff);
      const color = onOff ? "" : "aliceblue";
      document
        .querySelectorAll(".power-on")
        .forEach((element) => (element.style.color = color));
      setTimeout(() => {
        setSwitchedOn(!switchedOn);
        document.querySelector(".display").style.backgroundColor = color;
      }, 1500);
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
                  <Row className="d-flex justify-content-end">
                    <Col xs={2} className="botton-low"></Col>
                    <Col xs={0} md={1}></Col>
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
                        <Col
                          xs={12}
                          md={12}
                          className="d-flex justify-content-center"
                        >
                          <div className="arrows arrow-up">
                            <p>
                              <FontAwesomeIcon
                                icon={faCaretUp}
                                className="power-on"
                              />
                            </p>
                          </div>
                        </Col>
                        <Col
                          xs={6}
                          md={6}
                          className="d-flex justify-content-center"
                        >
                          <div className="arrows arrow-left">
                            <p>
                              <FontAwesomeIcon
                                icon={faCaretLeft}
                                className="power-on"
                              />
                            </p>
                          </div>
                        </Col>
                        <Col
                          xs={6}
                          md={6}
                          className="d-flex justify-content-center"
                        >
                          <div className="arrows arrow-right">
                            <p>
                              <FontAwesomeIcon
                                icon={faCaretRight}
                                className="power-on"
                              />
                            </p>
                          </div>
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          className="d-flex justify-content-center"
                        >
                          <div className="arrows arrow-down">
                            <p>
                              <FontAwesomeIcon
                                icon={faCaretDown}
                                className="power-on"
                              />
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-end">
                    <Col xs={1} md={1} className="botton-cube">
                      <div className="circle-cube"></div>
                    </Col>
                    <Col xs={0} md={1}></Col>
                  </Row>
                </Col>
                <Col className=" menu-design" xs={8} md={8}>
                  <Row>
                    {onOff ? (
                      <Col className="display">
                          {switchedOn ? (
                            <Row className="d-flex justify-content-center">
                              <Col xs={11} md={10} className="cell-menu mt-4">
                                <h1 className="text-start menu-options">Option 1</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 2</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 3</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 4</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 5</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 6</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 7</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 8</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu">
                                <h1 className="text-start menu-options">Option 9</h1>
                              </Col>
                              <Col xs={11} md={10} className="cell-menu mb-4">
                                <h1 className="text-start menu-options">Option 10</h1>
                              </Col>
                            </Row>
                          ) : (
                            <Row>
                              <Col className="d-flex justify-content-center align-items-center">
                                <h1 className="logo-nintendo">Nintendoº</h1>
                              </Col>
                            </Row>
                          )}
                      </Col>
                    ) : (
                      <Col className="display">
                        
                      </Col>
                    )}
                  </Row>
                </Col>
                <Col className="right-controller" xs={2} md={2}>
                  <Row className="d-flex justify-content-start botton-plus">
                    <Col xs={0} md={1}></Col>
                    <Col
                      xs={2}
                      md={1}
                      className="botton-plus-hover botton-plus-bar-horizontal"
                    ></Col>
                    <Col
                      xs={1}
                      md={1}
                      className="botton-plus-hover botton-plus-bar-vertical"
                    ></Col>
                  </Row>

                  <Row className="buttons-ABXY">
                    <Col>
                      <Row>
                        <Col
                          xs={12}
                          md={12}
                          className="d-flex justify-content-center"
                        >
                          <div className="abxy button-x">
                            <p className="power-on">X</p>
                          </div>
                        </Col>
                        <Col
                          xs={6}
                          md={6}
                          className="d-flex justify-content-center"
                        >
                          <div className="abxy button-y">
                            <p className="power-on">Y</p>
                          </div>
                        </Col>
                        <Col
                          xs={6}
                          md={6}
                          className="d-flex justify-content-center"
                        >
                          <div className="abxy button-a">
                            <p className="power-on">A</p>
                          </div>
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          className="d-flex justify-content-center"
                        >
                          <div className="abxy button-b">
                            <p className="power-on">B</p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center">
                    <Col className="right-joystick">
                      <Row>
                        <Col className="center-right-joystick"></Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-start">
                    <Col className="right-button-home">
                      <Row>
                        <Col className="right-home">
                          <FontAwesomeIcon
                            className="home power-on"
                            icon={faHouse}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      )}
    </div>
  );
};
