import { Container, Row , Col, Button, Modal } from 'react-bootstrap';

const ModalWindow = ({showModal, modalInfo, handleCloseModal}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg" fullscreen="lg-down" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalInfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col className="mb-4" xs={12} sm={4} md={4}>
              <img src={modalInfo.image?.medium} alt={modalInfo.name} width="100%"/>
            </Col>
            <Col xs={12} sm={8} md={8}>
              <div dangerouslySetInnerHTML={{__html: modalInfo.summary}}/>
              <div className="mt-2">
                <strong>Rating:</strong> {modalInfo.rating?.average}
              </div>
              <div className="mt-2">
                <strong>Studio:</strong> {modalInfo.network?.name}, {modalInfo.network?.country?.name}
              </div>
              <div className="mt-3">
                {
                  modalInfo.genres?.map(item => <span key={item} className="tag-box mb-2 me-2">{item}</span>)
                }
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;
