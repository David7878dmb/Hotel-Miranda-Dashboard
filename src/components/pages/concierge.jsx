import { useState } from 'react';
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";
import Table from "../tables/table"; // Si ya tienes el componente Table
import contactsData from "../json/MOCK_DATA.json"; // Importa los datos JSON

const Title = styled.h1`
  /* color: white; */
`;

const CommentText = styled.p`
  font-size: 14px;
  color: grey;
  margin-top: 0.5rem;
  white-space: pre-line;
`;


export const Concierge = () => {
    const [archivedContacts, setArchivedContacts] = useState([]);
  
    const handleArchive = (id) => {
      setArchivedContacts((prev) => [
        ...prev,
        contactsData.find(contact => contact.id === id)
      ]);
    };
  
    const columns = [
      { header: 'Date', accessor: 'date' },
      { header: 'ID', accessor: 'id' },
      { header: 'Customer', accessor: 'name' },
      { header: 'Email', accessor: 'email' },
      { header: 'Phone', accessor: 'phone' },
      { header: 'Comment', accessor: 'comment' },
      { header: 'Action', accessor: 'action' },
    ];
  
    const allContacts = contactsData.filter(
      contact => !archivedContacts.some(archived => archived.id === contact.id)
    );
  
    const tableData = allContacts.map(contact => ({
      ...contact,
      comment: <CommentText>{`Comentario predeterminado: patata patata...`}</CommentText>, // Añade comentario dinámico
      action: (
        <button onClick={() => handleArchive(contact.id)}>
          Archive
        </button>
      ),
    }));
  
    return (
      <Container>
        <LateralMenu />
        <div>
          <NavBar />
          <section>
            <Title>Concierge</Title>
            <Table cols={columns} data={tableData} />
          </section>
        </div>
      </Container>
    );
  };