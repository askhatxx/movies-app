import { useState, useEffect } from 'react';
import { Container, Row , Col, Button } from 'react-bootstrap';
import CardBox from './components/CardBox';
import ModalWindow from './components/ModalWindow';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handleShowModal = (item) => {
    setModalInfo(item);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setModalInfo({});
    setShowModal(false);
  };;

  const fetchApi = async (page) => {
    const res = await fetch(`https://api.tvmaze.com/shows?page=${page - 1}`);
    const json = await res.json();
    setData(json);
    console.log('data', json);
  };

  useEffect(() => {
    fetchApi(page);
  }, [page]);

  return (
    <div>
      <div className="head">
        <Container className="App">
          <Button variant="success" onClick={() => setPage(page + 1)}>setPage</Button>
        </Container>
      </div>
      <Container>
        <Row>
          {
            data.map(item => (
              <Col className="mb-4" key={item.id} xs={12} sm={6} md={4} lg={3}>
                <CardBox cardInfo={item} handleShowModal={handleShowModal}/>
              </Col>
            ))
          }
        </Row>
      </Container>
      <ModalWindow {...{showModal, modalInfo, handleCloseModal}}/>
    </div>
  );
}

export default App;
