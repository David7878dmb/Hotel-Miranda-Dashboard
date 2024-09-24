import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThunk } from '../../features/contact/contactThunk';
import { promiseStatus } from '../../utils/promises';
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";
import Table from "../tables/table";

const Title = styled.h1``;

const Contact = () => { // Cambiado a 'Contact'
  const dispatch = useDispatch();

  // Selecciona los datos desde el estado de Redux
  const { contacts, status, error } = useSelector(state => state.contact);

  useEffect(() => {
    if (status === promiseStatus.IDLE) {
      dispatch(getAllThunk());
    }
  }, [dispatch, status]);

  // Mostrar loading mientras los datos se cargan
  if (status === promiseStatus.PENDING) {
    return <p>Loading...</p>;
  }

  // Mostrar un mensaje de error si la carga falla
  if (status === promiseStatus.REJECTED) {
    return <p>Error: {error}</p>;
  }

  // Definir columnas para la tabla
  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Comment', accessor: 'comment' },
    { header: 'Action', accessor: 'action' },
  ];

  // Mapea los contactos para generar los datos de la tabla
  const tableData = contacts.map(contact => ({ 
    ...contact,
    comment: <span>{`Hardcoded comment`}</span>,
    action: (
      <button onClick={() => console.log(`Contacto con ID ${contact.id} archivado`)}> 
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
          <Title>Guest</Title>
          <Table cols={columns} data={tableData} />
        </section>
      </div>
    </Container>
  );
};

export default Contact;
