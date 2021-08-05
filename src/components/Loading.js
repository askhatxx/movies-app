import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="loading-box">
      <Spinner animation="border" variant="dark" />
    </div>
  );
}

export default Loading;
