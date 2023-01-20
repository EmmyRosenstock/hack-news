import './style.css';
import classnames from 'classnames';
import { IPagination } from '../../api/pagination';
import { DOTS, usePagination } from '../../hooks';

export interface PaginationProps extends IPagination {
  className?: string;
}

export const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className = ''}: PaginationProps) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  }) || [];


  if (paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classnames('pagination', { [className]: className })}>
      <li
        className={classnames('pagination__item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <i className='bx bx-chevron-left bx-sm' />
      </li>
      {paginationRange.map( (pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li className="pagination__item dots" key={pageNumber + index}>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination__item', {
              selected: pageNumber === currentPage
            })}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination__item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <i className='bx bx-chevron-right bx-sm' />
      </li>
    </ul>
  );
};