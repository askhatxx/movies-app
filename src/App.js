import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import CardBox from './components/CardBox';
import PaginationBox from './components/PaginationBox';
import Loading from './components/Loading';
import ModalWindow from './components/ModalWindow';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dataFromSearch, setDataFromSearch] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const fetchApiShows = async (page) => {
    setLoading(true);
    const res = await fetch(`https://api.tvmaze.com/shows?page=${page - 1}`);
    const json = await res.json();
    setData(json);
    window.scrollTo({top: 0, behavior: 'smooth'});
    setDataFromSearch(false);
    setLoading(false);
  };

  const fetchApiSearch = async (query) => {
    setLoading(true);
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const json = await res.json();
    setData(json.map(item => item.show));
    window.scrollTo({top: 0, behavior: 'smooth'});
    setDataFromSearch(true);
    setLoading(false);
  };

  const clearData = () => {
    if (page === 1) {
      fetchApiShows(1);
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    fetchApiShows(page);
  }, [page]);

  return (
    <div>
      <Header {...{fetchApiSearch, clearData}}/>
      <Container className={`mt-4 mb-5 ${loading ? 'loading-opacity' : ''}`}>
        <Row>
          {
            data.length
              ? data.map(item => (
                  <Col className="mb-4" key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <CardBox cardInfo={item} handleShowModal={handleShowModal}/>
                  </Col>
                ))
              : !loading && <Col className="text-center fs-2">No data</Col>
          }
        </Row>
      </Container>
      {!dataFromSearch && <PaginationBox {...{page, setPage, lastPage: 220}}/>}
      {loading && <Loading/>}
      <ModalWindow {...{showModal, modalInfo, handleCloseModal}}/>
    </div>
  );
}

export default App;
