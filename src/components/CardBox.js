import { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

const CardBox = ({cardInfo, handleShowModal}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const showModal = () => handleShowModal(cardInfo);
  
  return (
    <Card className="card-box">
      <div className={loadingImage ? 'bg-secondary ratio-box' : ''}>
        {
          loadingImage &&
            <div className="card-box__spinner">
              <Spinner animation="border" variant="dark" />
            </div>
        }
        <Card.Img
          className="card-box__poster"
          variant="top"
          src={cardInfo.image?.medium}
          alt={cardInfo.name}
          onClick={showModal}
          onLoad={() => setLoadingImage(false)}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          {cardInfo.name}
        </Card.Title>
        <div className="flex-grow-1 mb-3">
          {
            cardInfo.rating?.average && `Rating: ${cardInfo.rating.average}`
          }
          <div className="mt-2">
            {
              cardInfo.genres.map(item => <span key={item} className="tag-box mb-2 me-2">{item}</span>)
            }
          </div>
        </div>
        <div>
          <Button variant="primary" onClick={showModal}>
            Read more
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardBox;
