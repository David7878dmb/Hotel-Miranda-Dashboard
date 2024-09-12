    import React, { useState } from 'react';
    import styled from 'styled-components';

    const TableWrapper = styled.div`
      width:auto;
    margin-bottom: 20px;
  
    table {
      width:auto;
      border-collapse: collapse;
      font-size: 0.9rem;
    }
  
    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
      white-space: nowrap;
    }
  
    th {
      background-color: #f4f4f4;
      font-weight: bold;
    }
  
    tbody tr:nth-child(odd) {
      background-color: #f9f9f9;
    }
  
    tbody tr:hover {
      background-color: #f1f1f1;
    }
  
    td button {
      background-color: #007bff;
      border: none;
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 3px;
      cursor: pointer;
    }
  
    td button:hover {
      background-color: #0056b3;
    }
  `;
  
  const Pagination = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem 0;
  
    button {
      background-color: #007bff;
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      border-radius: 3px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;
  
  const Tabs = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  
    button {
      background-color: #f4f4f4;
      border: 1px solid #ddd;
      padding: 0.5rem 1rem;
      cursor: pointer;
      margin-right: 10px;
    }
  
    button:hover {
      background-color: #e0e0e0;
    }
  `;
  const Tabla = ({ cols, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [archivedData, setArchivedData] = useState([]);
  
    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
   /*const handleArchive = (id) => {
      const archiveRecord = data.find((record) => record.id === id);
      setArchivedData([...archivedData, archiveRecord]);
    };*/
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);
  
      if (currentPage > 3) {
        pageNumbers.push(1);
        if (currentPage > 4) {
          pageNumbers.push('...');
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
  
      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
  
      return pageNumbers;
    };
  
    return (
      <>
        <Tabs>
          <button>All Contacts</button>
          <button>Archived</button>
        </Tabs>
  
        <TableWrapper>
          <table>
            <thead>
              <tr>
                {cols.map((col, index) => (
                  <th key={index}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((row) => (
                <tr key={row.id}>
                  {cols.map((col, colIndex) => (
                    <td key={colIndex}>{row[col.accessor]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
  
        <Pagination>
          <div className="pagination-controls">
            <button 
              onClick={() => paginate(1)} 
              disabled={currentPage === 1}
            >
              &laquo; First
            </button>
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              &lsaquo; Prev
            </button>
            {renderPageNumbers().map((number, index) =>
              number === '...' ? (
                <span key={index} style={{ margin: '0 0.5rem' }}>...</span>
              ) : (
                <button 
                  key={index} 
                  onClick={() => paginate(number)} 
                  disabled={number === currentPage}
                >
                  {number}
                </button>
              )
            )}
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next &rsaquo;
            </button>
            <button 
              onClick={() => paginate(totalPages)} 
              disabled={currentPage === totalPages}
            >
              Last &raquo;
            </button>
          </div>
        </Pagination>
      </>
    );
  };
  
  export default Tabla;