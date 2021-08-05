import { useState } from 'react';
import { Container } from 'react-bootstrap';

const Header = ({fetchApiSearch, clearData}) => {
  const [value, setValue] = useState('');

  const keyPressHandler = event => {
    if (event.key === 'Enter' && value.trim()) {
      fetchApiSearch(value);
    }
  };

  const clearHandler = () => {
    setValue('');
    clearData();
  };

  return (
    <div className="head">
      <Container as="header" className="header">
        <div className='header__logo' onClick={clearHandler}>Movies App</div>
        <div className='header__search'>
          <input 
            className='header__search-input'
            value={value} 
            onChange={e => setValue(e.target.value)}
            onKeyPress={keyPressHandler}
            placeholder='Search...'
          />
          <button className={`header__search-btn ${value ? '' : 'header__search-btn--hide'}`} onClick={clearHandler}>
            Clear
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Header;
