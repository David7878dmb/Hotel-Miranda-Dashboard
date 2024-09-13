import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThunk } from '../../features/bookings/bookingThunk';
import { promiseStatus } from '../../utils/promises';
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";
import Table from "../tables/table";

const Title = styled.h1``;
const CommentText = styled.p`
  font-size: 14px;
  color: grey;
  margin-top: 0.5rem;
  white-space: pre-line;
`;

const Booking = () => {
  const dispatch = useDispatch();

  // Selecciona los datos desde el estado de Redux
  const { bookings, status, error } = useSelector(state => state.booking);

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
    { header: 'Customer', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Comment', accessor: 'comment' },
    { header: 'Action', accessor: 'action' },
  ];

  // Mapea las bookings para generar los datos de la tabla
  const tableData = bookings.map(booking => ({
    ...booking,
    comment: <span>{`Hardcoded comment`}</span>,
    action: (
      <button onClick={() => console.log(`Booking con ID ${booking.id} archivada`)}>
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

export default Booking;