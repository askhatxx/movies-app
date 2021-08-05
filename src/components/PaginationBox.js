import { Pagination } from 'react-bootstrap';

const PaginationBox = ({page, setPage, lastPage}) => {
  const list1 = [];
  const list2 = [];
  const list3 = [];

  if (lastPage <= 5) {
    for (let i = 1; i <= lastPage; i++) {
      list1.push(i);
    }
  } else {
    list1.push(1);

    if (page > 3) {
      list2.push('...');
    }

    for (let i = page - 2; i <= page + 2; i++) {
      if (1 < i && i < lastPage) {
        list2.push(i);
      }
    }

    if (page + 1 < lastPage - 1) {
      list2.push('...');
    }

    list3.push(lastPage);
  }
  
  return (
    <div className="pagination-box">
      <Pagination>
        {
          [...list1, ...list2, ...list3].map((item, idx) => (
            <Pagination.Item
              key={item + idx}
              active={item === page}
              disabled={item === '...'}
              onClick={item === '...' ? null : () => setPage(item)}
            >
              {item}
            </Pagination.Item>
          ))
        }
      </Pagination>
    </div>
  );
}

export default PaginationBox;
