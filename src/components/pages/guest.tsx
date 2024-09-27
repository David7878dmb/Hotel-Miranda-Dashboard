import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThunk } from '../../features/contact/contactThunk';
// @ts-ignore
import { promiseStatus } from '../../utils/promises';
// @ts-ignore
import Container from "../container/container";
// @ts-ignore
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
// @ts-ignore
import NavBar from "../navBar/navBar";
// @ts-ignore
import Table from "../tables/table";
import { AppDispatch, RootState } from '../../app/store';

interface Contact {
    id: number;
    name: string;
    date: string;
    email: string;
    phone: string;
    value: number;
}

interface ContactState  {
    contacts: Contact[];
    contact: Contact | null;
    status: string;
    error: string | null;
}

const Title = styled.h1``;

const Contact: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Selecciona los datos desde el estado de Redux
  const { contacts, status, error } = useSelector((state: RootState) => state.contact);

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
  const tableData = contacts.map((contact: Contact) => ({ 
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
          <Title>AAAAAAAAAAAAaa</Title>
          <Table cols={columns} data={tableData} />
        </section>
      </div>
    </Container>
  );
};

export default Contact;
