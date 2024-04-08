import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Primer Paso</h5>
        <p>
          Para encender la consola, haz clic en el botón de encendido ubicado en
          la parte superior.
        </p>
        <h5>Segundo Paso</h5>
        <p>
          Una vez en el menú, utiliza las flechas izquierda o derecha del
          teclado para navegar. Selecciona la opción deseada haciendo clic en el
          botón "A" o presionando Enter. También puedes seleccionar directamente
          en la pantalla.
        </p>
        <h5>Tercer Paso</h5>
        <p>
          En la primera opción, puedes hacer clic en cada personaje para acceder
          a sus datos. Para retroceder, simplemente haz clic en el botón "B".
        </p>
        <h5>Último Paso</h5>
        <p>
          Para apagar la consola, solo necesitas hacer clic en el mismo botón
          que usaste en el primer paso.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
