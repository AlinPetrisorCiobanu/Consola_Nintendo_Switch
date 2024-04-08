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
import { getBaseDatos } from "../../services/apiCalls";

class CounterSelectMain {
  valor = 1;
  constructor() {
    this.valor = 1;
  }
  suma() {
    this.valor++;
  }
  resta() {
    this.valor--;
  }
  reset() {
    this.valor = 1;
  }
}

export const Console = () => {
  const [mobile, setMobile] = useState(false);
  const [onOff, setOnOff] = useState(false);
  const [switchedOn, setSwitchedOn] = useState(false);
  const [menu, setMenu] = useState(false);
  const [subMenus, setSubMenus] = useState(Array(10).fill(false));
  const [counterSelection] = useState(new CounterSelectMain());

  const [caracteres, setCaracteres] = useState([]);
  const [totalPage, setPages] = useState();
  const [page, setPage] = useState(1);

  const [dateCaracters, setDateCaracters] = useState({});

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
      const color_display = onOff ? "" : "aliceblue";
      document
        .querySelectorAll(".power-on")
        .forEach((element) => (element.style.color = color));
      setTimeout(() => {
        setSwitchedOn(!switchedOn);
        setMenu(!menu);
        document.querySelector(".display").style.backgroundColor =
          color_display;
      }, 1500);
    }, 300);
  };

  const decreaseFontSize = () => {
    switchedOn &&
      document.querySelectorAll(".menu-options").forEach((element) => {
        let current_size = parseFloat(
          window.getComputedStyle(element, null).getPropertyValue("font-size")
        );
        current_size > 8 && (element.style.fontSize = current_size - 1 + "px");
      });
  };

  const increaseFontSize = () => {
    switchedOn &&
      document.querySelectorAll(".menu-options").forEach((element) => {
        let currentSize = parseFloat(
          window.getComputedStyle(element, null).getPropertyValue("font-size")
        );
        element.style.fontSize = currentSize + 1 + "px";
      });
  };

  useEffect(() => {
    const handleKey = (event) => {
      switch (event.key) {
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowLeft":
          console.log("left");
          break;
        case "ArrowRight":
          console.log("right");
          break;
        case "Enter":
          submit(counterSelection.valor);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [counterSelection.value]);

  const moveUp = () => {
    if (counterSelection.valor > 1 && counterSelection.valor <= 10) {
      counterSelection.resta();
      modificado("up", counterSelection.valor);
    }
  };

  const moveDown = () => {
    if (counterSelection.valor >= 1 && counterSelection.valor < 10) {
      counterSelection.suma();
      modificado("down", counterSelection.valor);
      document
        .querySelector(".selected")
        .scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const modificado = (id, counter) => {
    const elementAdd = document.getElementById(`option_${counter}`);
    const elementRemove = document.getElementById(
      `option_${id === "up" ? counter + 1 : counter - 1}`
    );
    elementAdd.classList.add("selected");
    elementRemove.classList.remove("selected");
    document
      .querySelector(".selected")
      .scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const submit = (counter) => {
    if (counter === 0) {
      setMenu(!menu);
    } else if (counter >= 1 && counter <= 10) {
      setSubMenus((prevSubMenus) => {
        const updatedSubMenus = [...prevSubMenus];
        updatedSubMenus[counter - 1] = !updatedSubMenus[counter - 1];
        setMenu(false);
        return updatedSubMenus;
      });
    }
  };

  const home = () => {
    setMenu(true);
    counterSelection.reset();
    setSubMenus(subMenus.map(() => false));
    setDateCaracters({});
  };

  // RICK AND MORTY

  const dateBBD = (page) => {
    getBaseDatos(page)
      .then((res) => {
        setPages(res.data.results.length);
        const caracteres = res.data.results;
        setCaracteres(caracteres);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dateBBD(page);
  }, [page]);

  const transmitir = (ind) => {
    const caracter = caracteres.find((e) => e.id === ind);
    setDateCaracters(caracter);
  };

  const back_rick_and_morty = () => {
    setDateCaracters({});
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
                    <Col
                      xs={2}
                      className="botton-low"
                      onClick={() => decreaseFontSize()}
                    ></Col>
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
                          <div
                            onClick={() => moveUp()}
                            className="arrows arrow-up"
                          >
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
                          <div
                            onClick={() => moveDown()}
                            className="arrows arrow-down"
                          >
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
                          <Row>
                            <Col>
                              {menu ? (
                                <Row className="d-flex justify-content-center">
                                  <Col
                                    onClick={() => submit(1)}
                                    id="option_1"
                                    xs={11}
                                    md={10}
                                    className="cell-menu mt-4 selected"
                                  >
                                    <h1 className="text-start menu-options ">
                                      Rick and Morty
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(2)}
                                    id="option_2"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 2
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(3)}
                                    id="option_3"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 3
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(4)}
                                    id="option_4"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 4
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(5)}
                                    id="option_5"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 5
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(6)}
                                    id="option_6"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 6
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(7)}
                                    id="option_7"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 7
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(8)}
                                    id="option_8"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 8
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(9)}
                                    id="option_9"
                                    xs={11}
                                    md={10}
                                    className="cell-menu"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 9
                                    </h1>
                                  </Col>
                                  <Col
                                    onClick={() => submit(10)}
                                    id="option_10"
                                    xs={11}
                                    md={10}
                                    className="cell-menu mb-4"
                                  >
                                    <h1 className="text-start menu-options">
                                      Option 10
                                    </h1>
                                  </Col>
                                </Row>
                              ) : (
                                <Row className="text-dark options-menu-pages">
                                  {subMenus.map(
                                    (subMenu, index) =>
                                      subMenu && (
                                        <Col
                                          key={index}
                                          xs={12}
                                          md={12}
                                          lg={12}
                                        >
                                          {index === 0 ? (
                                            <Row>
                                              <Col
                                                className="mt-5"
                                                xs={12}
                                                md={12}
                                              >
                                                <h3>Rick and Morty</h3>
                                              </Col>
                                              <Col
                                                className="mt-5"
                                                xs={12}
                                                md={12}
                                              >
                                                {Object.keys(dateCaracters)
                                                  .length > 0 ? (
                                                  <>
                                                    <h6>
                                                      name :{" "}
                                                      {dateCaracters.name}
                                                    </h6>
                                                    <p>
                                                      id : {dateCaracters.id}
                                                    </p>
                                                    <p>
                                                      status :{" "}
                                                      {dateCaracters.status}
                                                    </p>
                                                    <p>
                                                      species :{" "}
                                                      {dateCaracters.species}
                                                    </p>
                                                    <p>
                                                      type :{" "}
                                                      {dateCaracters.type}
                                                    </p>
                                                    <h6>{dateCaracters.url}</h6>
                                                    <img
                                                      src={dateCaracters.image}
                                                    />
                                                  </>
                                                ) : (
                                                  <Row>
                                                    <Col
                                                      className="mt-4"
                                                      xs={12}
                                                      md={12}
                                                    >
                                                      <button
                                                        className="rick-and-morty-buttons"
                                                        onClick={() =>
                                                          setPage(page - 1)
                                                        }
                                                        disabled={page === 1}
                                                      >
                                                        prev
                                                      </button>
                                                      <span>
                                                        {page} of {totalPage}
                                                      </span>
                                                      <button
                                                        className="rick-and-morty-buttons"
                                                        onClick={() =>
                                                          setPage(page + 1)
                                                        }
                                                        disabled={
                                                          page === totalPage
                                                        }
                                                      >
                                                        next
                                                      </button>
                                                    </Col>
                                                    <Col
                                                      xs={12}
                                                      md={12}
                                                      className="mt-5 rick-and-morty"
                                                    >
                                                      {caracteres.length > 0 &&
                                                        caracteres.map(
                                                          (individuos) => {
                                                            return (
                                                              <>
                                                                <div
                                                                  className="rick-and-morty-style"
                                                                  key={
                                                                    individuos.id
                                                                  }
                                                                  onClick={() =>
                                                                    transmitir(
                                                                      individuos.id
                                                                    )
                                                                  }
                                                                >
                                                                  <h5>
                                                                    {
                                                                      individuos.name
                                                                    }
                                                                  </h5>
                                                                  <img
                                                                    src={
                                                                      individuos.image
                                                                    }
                                                                  />
                                                                </div>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                    </Col>
                                                  </Row>
                                                )}
                                              </Col>
                                            </Row>
                                          ) : index === 1 ? (
                                            <Row>
                                              <Col>
                                                <p>2</p>
                                              </Col>
                                              <Col>
                                                <Row className="container_img">
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(1)}
                                                  >
                                                    <img
                                                      src="https://static.wikia.nocookie.net/rickandmorty/images/3/3f/Young_Adult_Rick.png/revision/latest?cb=20230316221017"
                                                      alt="project"
                                                    />
                                                    <p>Rick Sanchez</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(2)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 2</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(3)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 3</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(4)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 4</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(5)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 5</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(6)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 6</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(7)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 7</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(8)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 8</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(9)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>Titulo del Proyecto 9</p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(10)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>
                                                      Titulo del Proyecto 10
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(11)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>
                                                      Titulo del Proyecto 11
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(12)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>
                                                      Titulo del Proyecto 12
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(13)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>
                                                      Titulo del Proyecto 13
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(14)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>
                                                      Titulo del Proyecto 14
                                                    </p>
                                                  </div>
                                                  <div
                                                    className="image-container"
                                                    onClick={() => project(15)}
                                                  >
                                                    <img
                                                      src="https://assets.asana.biz/transform/d2ffb5c8-a7c2-4e39-8447-f8e2501c5bdc/article-project-planning-project-design-2x"
                                                      alt="project"
                                                    />
                                                    <p>
                                                      Titulo del Proyecto 14
                                                    </p>
                                                  </div>
                                                </Row>
                                              </Col>
                                            </Row>
                                          ) : index === 2 ? (
                                            <Row>
                                              <Col>
                                                <p>3</p>
                                              </Col>
                                            </Row>
                                          ) : index === 3 ? (
                                            <Row>
                                              <Col>
                                                <p>4</p>
                                              </Col>
                                            </Row>
                                          ) : index === 4 ? (
                                            <Row>
                                              <Col>
                                                <p>5</p>
                                              </Col>
                                            </Row>
                                          ) : index === 5 ? (
                                            <Row>
                                              <Col>
                                                <p>6</p>
                                              </Col>
                                            </Row>
                                          ) : index === 6 ? (
                                            <Row>
                                              <Col>
                                                <p>7</p>
                                              </Col>
                                            </Row>
                                          ) : index === 7 ? (
                                            <Row>
                                              <Col>
                                                <p>8</p>
                                              </Col>
                                            </Row>
                                          ) : index === 8 ? (
                                            <Row>
                                              <Col>
                                                <p>9</p>
                                              </Col>
                                            </Row>
                                          ) : (
                                            <Row>
                                              <Col>
                                                <p>10</p>
                                              </Col>
                                            </Row>
                                          )}
                                        </Col>
                                      )
                                  )}
                                </Row>
                              )}
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
                      <Col className="display"></Col>
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
                      onClick={() => increaseFontSize()}
                    ></Col>
                    <Col
                      xs={1}
                      md={1}
                      className="botton-plus-hover botton-plus-bar-vertical"
                      onClick={() => increaseFontSize()}
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
                          <div
                            onClick={() => submit(counterSelection.valor)}
                            className="abxy button-a"
                          >
                            <p className="power-on">A</p>
                          </div>
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          className="d-flex justify-content-center"
                        >
                          <div
                            onClick={() =>
                              Object.keys(dateCaracters).length > 0
                                ? back_rick_and_morty()
                                : home()
                            }
                            className="abxy button-b"
                          >
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
                    <Col onClick={() => home()} className="right-button-home">
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
