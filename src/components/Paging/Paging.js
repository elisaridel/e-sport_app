import React from 'react';

export default function Paging(props) {
  const paginationRender = (i) => {
    if (i === 1) {
      return (
        <>
          <li className="active" onClick={(e) => handlePagination(props.currentPage)}>{props.currentPage}</li>
          <li onClick={(e) => handlePagination(props.currentPage + 1)}>{props.currentPage + 1}</li>
          <li onClick={(e) => handlePagination(props.currentPage + 2)}>{props.currentPage + 2}</li>
        </>
      )
    } else {
      return (
        <>
          <li onClick={(e) => handlePagination(props.currentPage - 1)}>Précédent</li>
          <li onClick={(e) => handlePagination(props.currentPage - 1)}>{props.currentPage - 1}</li>
          <li className="active" onClick={(e) => handlePagination(props.currentPage)}>{props.currentPage}</li>
          <li onClick={(e) => handlePagination(props.currentPage + 1)}>{props.currentPage + 1}</li>
        </>
      )
    }
  }

  const handlePagination = (i) => {
    props.setCurrentPage(i);
  }

  return (
    <>
      <nav aria-label="pagination">
        <ul className="paging">
          {paginationRender(props.currentPage)}
          <li onClick={(e) => handlePagination(props.currentPage + 1)}>Suivant</li>
        </ul>
      </nav>
    </>
  )
}